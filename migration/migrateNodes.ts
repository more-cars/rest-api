import {getMc1Driver} from "../src/db/driver-mc1"
import neo4j, {Node} from "neo4j-driver"
import {deleteAllBrands} from "../tests/_toolbox/dbSeeding/brands/nodes/deleteAllBrands"
import {deleteAllCarModels} from "../tests/_toolbox/dbSeeding/car-models/nodes/deleteAllCarModels"
import {deleteAllImages} from "../tests/_toolbox/dbSeeding/images/nodes/deleteAllImages"
import {mapBrand} from "./nodes/mapBrand"
import {mapCarModel} from "./nodes/mapCarModel"
import {mapImage} from "./nodes/mapImage"
import {createNodeQuery as createBrandQuery} from "../src/db/nodes/brands/createNode"
import {createNodeQuery as createCarModelQuery} from "../src/db/nodes/car-models/createNode"
import {createNodeQuery as createImageQuery} from "../src/db/nodes/images/createNode"
import cliProgress from "cli-progress"
import {createDbNode} from "../src/db/nodes/createDbNode"
import {NodeTypeLabel} from "../src/db/NodeTypeLabel"
import {addMoreCarsIdToNode} from "../src/db/nodes/addMoreCarsIdToNode"
import {addTimestampsToNode} from "../src/db/nodes/addTimestampsToNode"

export async function migrateNodes() {
    await deleteAllBrands()
    await deleteAllCarModels()
    await deleteAllImages()

    await migrate('brand', mapBrand, NodeTypeLabel.Brand, createBrandQuery)
    await migrate('carmodel', mapCarModel, NodeTypeLabel.CarModel, createCarModelQuery)
    await migrate('image', mapImage, NodeTypeLabel.Image, createImageQuery)
}

async function migrate(oldNodeTypeLabel: string, mapFunc: any, newNodeTypeLabel: any, queryFunc: any) {
    const driver = getMc1Driver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(getNodeQuery(oldNodeTypeLabel))
        return result.records
    })

    const progress = new cliProgress.SingleBar({
        format: `{bar} | ${oldNodeTypeLabel} | ETA: {eta}s | {value}/{total} | {speed} ms/node`
    }, cliProgress.Presets.shades_classic)
    progress.start(records.length, 0, {
        speed: "N/A"
    })

    for (const record of records) {
        const dateBefore = new Date()
        const nodeOld = record.get('node')
        const data = mapFunc(nodeOld)

        try {
            const nodeNew: Node = await createDbNode(newNodeTypeLabel, queryFunc(data))
            await addMoreCarsIdToNode(nodeNew.elementId, parseInt(nodeOld.elementId) + 10000000, newNodeTypeLabel)
            await addTimestampsToNode(
                nodeNew.elementId,
                new Date(nodeOld.properties.created_at).toISOString(),
                new Date(nodeOld.properties.updated_at).toISOString(),
            )
        } catch (e) {
            console.error(e)
            console.error(nodeOld)
        }

        const dateAfter = new Date()
        const duration = dateAfter.getMilliseconds() - dateBefore.getMilliseconds()
        progress.increment(1, {speed: duration})
    }

    progress.stop()
    await session.close()
    await driver.close()

    return
}

function getNodeQuery(nodeType: string) {
    return `MATCH (node:${nodeType}) RETURN node ORDER BY id(node)`
}
