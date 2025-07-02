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

(async function migrate() {
    await deleteAllBrands()
    await deleteAllCarModels()
    await deleteAllImages()

    await migrateNodes('brand', mapBrand, createBrandNode)
    await migrateNodes('carmodel', mapCarModel, createCarModelNode)
    await migrateNodes('image', mapImage, createImageNode)
})()

async function migrateNodes(nodeType: string, mapFunc: any, createFunc: any) {
    const mc1driver = getDriver()
    const session = mc1driver.session()
    let counter = 0

    session
        .run(getNodeQuery(nodeType))
        .subscribe({
            onNext: record => {
                const node: Node = record.get('node')
                const data = mapFunc(node)
                createFunc(data)
                counter++
            },
            onCompleted: () => {
                console.log(`${counter} ${nodeType}s migrated`)
                session.close()
                mc1driver.close()
            },
            onError: error => {
                console.log(error)
            }
        })
}

function getNodeQuery(nodeType: string) {
    return `MATCH (node:${nodeType}) RETURN node ORDER BY id(node) LIMIT 300`
}
