import {getDriver} from "../src/db/driver-mc1.ts"
import {Node} from "neo4j-driver"
import {deleteAllBrands} from "../tests/dbSeeding/brands/nodes/deleteAllBrands.ts"
import {deleteAllCarModels} from "../tests/dbSeeding/car-models/nodes/deleteAllCarModels.ts"
import {deleteAllImages} from "../tests/dbSeeding/images/nodes/deleteAllImages.ts"
import {mapBrand} from "./nodes/mapBrand.ts"
import {mapCarModel} from "./nodes/mapCarModel.ts"
import {mapImage} from "./nodes/mapImage.ts"
import {createNode as createBrandNode} from "../src/db/nodes/brands/createNode.ts"
import {createNode as createCarModelNode} from "../src/db/nodes/car-models/createNode.ts"
import {createNode as createImageNode} from "../src/db/nodes/images/createNode.ts"
import cliProgress from "cli-progress"

(async function migrate() {
    await deleteAllBrands()
    await deleteAllCarModels()
    await deleteAllImages()

    await migrateNodes('brand', mapBrand, createBrandNode)
    await migrateNodes('carmodel', mapCarModel, createCarModelNode)
    await migrateNodes('image', mapImage, createImageNode)
})()

async function migrateNodes(nodeType: string, mapFunc: any, createFunc: any) {
    const driver = getDriver()
    const session = driver.session()

    let finished = false
    const progress = new cliProgress.SingleBar({
        format: `${nodeType} {bar} {percentage}% | ETA: {eta}s | {value}/{total}`
    }, cliProgress.Presets.shades_classic)
    progress.start(300, 0)

    session
        .run(getNodeQuery(nodeType))
        .subscribe({
            onNext: record => {
                waitSync(25)
                const node: Node = record.get('node')
                const data = mapFunc(node)
                progress.increment()
                createFunc(data)
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
