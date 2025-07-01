import {getDriver} from "../src/db/driver-mc1.ts"
import {Driver, Node, Session} from "neo4j-driver"
import {deleteAllBrands} from "../tests/dbSeeding/brands/nodes/deleteAllBrands.ts"
import {createNode} from "../src/db/nodes/brands/createNode.ts"
import {InputBrandCreate} from "../src/db/nodes/brands/types/InputBrandCreate.ts"

(async function migrate() {
    console.log('Brands')
    await deleteAllBrands()
    await migrateBrands()
})()

async function migrateBrands() {
    const cliProgress = require('cli-progress')
    const progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)

    const mc1driver: Driver = getDriver()
    const session: Session = mc1driver.session()

    const {records} = await mc1driver.executeQuery(getNodeQuery('brand'))
    progress.start(records.length, 0)
    records.forEach(record => {
        const node: Node = record.get('node')
        const data: InputBrandCreate = convertBrand(node)
        createNode(data)
        progress.increment()
    })
    progress.stop()

    await session.close()
    await mc1driver.close()
}

function convertBrand(node: Node) {
    return {
        name: node.properties.name,
        full_name: node.properties.full_name,
        founded: node.properties.founded?.low,
        defunct: node.properties.defunct?.low,
        wmi: node.properties.wmi,
        hsn: node.properties.hsn,
    }
}

function getNodeQuery(nodeType: string) {
    return `MATCH (node:${nodeType}) RETURN node`
}
