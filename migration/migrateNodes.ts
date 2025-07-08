import {getMc1Driver} from "../src/db/driver-mc1.ts"
import {Node} from "neo4j-driver"
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
    const session = driver.session()

    let finished = false
    const progress = new cliProgress.SingleBar({
        format: `{bar} | ${oldNodeTypeLabel} | ETA: {eta}s | {value}/{total}`
    }, cliProgress.Presets.shades_classic)
    progress.start(300, 0)

    session
        .run(getNodeQuery(oldNodeTypeLabel))
        .subscribe({
            onNext: async record => {
                waitSync(25)
                const nodeOld: Node = record.get('node')
                const data = mapFunc(nodeOld)
                progress.increment()
                const nodeNew: Node = await createDbNode(newNodeTypeLabel, queryFunc(data))
                await addMoreCarsIdToNode(nodeNew.elementId, parseInt(nodeOld.elementId), newNodeTypeLabel)
            },
            onCompleted: () => {
                session.close()
                driver.close()
                progress.stop()
                finished = true
            },
            onError: error => {
                console.log(error)
            }
        })

    while (!finished) {
        await asyncWait(500)
    }

    return
}

function getNodeQuery(nodeType: string) {
    return `MATCH (node:${nodeType}) RETURN node ORDER BY id(node) LIMIT 300`
}

function waitSync(ms: number) {
    const start = Date.now()
    let now = start
    while (now - start < ms) {
        now = Date.now()
    }
}

async function asyncWait(ms: number) {
    await new Promise(resolve => setTimeout(resolve, ms))
}
