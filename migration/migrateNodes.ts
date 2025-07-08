import {getMc1Driver} from "../src/db/driver-mc1.ts"
import neo4j, {Node} from "neo4j-driver"
import {deleteAllBrands} from "../tests/dbSeeding/brands/nodes/deleteAllBrands.ts"
import {deleteAllCarModels} from "../tests/dbSeeding/car-models/nodes/deleteAllCarModels.ts"
import {deleteAllImages} from "../tests/dbSeeding/images/nodes/deleteAllImages.ts"
import {mapBrand} from "./nodes/mapBrand.ts"
import {mapCarModel} from "./nodes/mapCarModel.ts"
import {mapImage} from "./nodes/mapImage.ts"
import {createNodeQuery as createBrandQuery} from "../src/db/nodes/brands/createNode.ts"
import {createNodeQuery as createCarModelQuery} from "../src/db/nodes/car-models/createNode.ts"
import {createNodeQuery as createImageQuery} from "../src/db/nodes/images/createNode.ts"
import cliProgress from "cli-progress"
import {createDbNode} from "../src/db/nodes/createDbNode.ts"
import {NodeTypeLabel} from "../src/db/NodeTypeLabel.ts"
import {addMoreCarsIdToNode} from "../src/db/nodes/addMoreCarsIdToNode.ts"
import {addTimestampsToNode} from "../src/db/nodes/addTimestampsToNode.ts"

(async function migrate() {
    await deleteAllBrands()
    await deleteAllCarModels()
    await deleteAllImages()

    await migrateNodes('brand', mapBrand, NodeTypeLabel.Brand, createBrandQuery)
    await migrateNodes('carmodel', mapCarModel, NodeTypeLabel.CarModel, createCarModelQuery)
    await migrateNodes('image', mapImage, NodeTypeLabel.Image, createImageQuery)
})()

async function migrateNodes(oldNodeTypeLabel: string, mapFunc: any, newNodeTypeLabel: any, queryFunc: any) {
    const driver = getMc1Driver()
    const session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    const records = await session.executeWrite(async txc => {
        const result = await txc.run(getNodeQuery(oldNodeTypeLabel))
        return result.records
    })

    const progress = new cliProgress.SingleBar({
        format: `{bar} | ${oldNodeTypeLabel} | ETA: {eta}s | {value}/{total}`
    }, cliProgress.Presets.shades_classic)
    progress.start(records.length, 0)

    for (const record of records) {
        const nodeOld = record.get('node')
        const data = mapFunc(nodeOld)

        try {
            const nodeNew: Node = await createDbNode(newNodeTypeLabel, queryFunc(data))
            await addMoreCarsIdToNode(nodeNew.elementId, parseInt(nodeOld.elementId), newNodeTypeLabel)
            await addTimestampsToNode(
                nodeNew.elementId,
                new Date(nodeOld.properties.created_at).toISOString(),
                new Date(nodeOld.properties.updated_at).toISOString(),
            )
        } catch (e) {
            console.error(e)
            console.error(nodeOld)
        }

        progress.increment()
    }

    progress.stop()
    await session.close()
    await driver.close()

    return
}

function getNodeQuery(nodeType: string) {
    return `MATCH (node:${nodeType}) RETURN node ORDER BY id(node)`
}
