import {getDriver} from "../src/db/driver-mc1.ts"
import {Driver, Node, Session} from "neo4j-driver"
import {deleteAllBrands} from "../tests/dbSeeding/brands/nodes/deleteAllBrands.ts"
import {deleteAllCarModels} from "../tests/dbSeeding/car-models/nodes/deleteAllCarModels.ts"
import {createNode as createBrandNode} from "../src/db/nodes/brands/createNode.ts"
import {createNode as createCarModelNode} from "../src/db/nodes/car-models/createNode.ts"
import {InputBrandCreate} from "../src/db/nodes/brands/types/InputBrandCreate.ts"
import {InputCarModelCreate} from "../src/db/nodes/car-models/types/InputCarModelCreate.ts"
import cliProgress from "cli-progress"

(async function migrate() {
    console.log('Brands')
    await deleteAllBrands()
    await migrateBrands()

    console.log('Car Models')
    await deleteAllCarModels()
    await migrateCarModels()
})()

async function migrateBrands() {
    const progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)

    const mc1driver: Driver = getDriver()
    const session: Session = mc1driver.session()

    const {records} = await mc1driver.executeQuery(getNodeQuery('brand'))
    progress.start(records.length, 0)
    records.forEach(record => {
        const node: Node = record.get('node')
        const data = convertBrand(node)
        createBrandNode(data)
        progress.increment()
    })
    progress.stop()

    await session.close()
    await mc1driver.close()
}

async function migrateCarModels() {
    const progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)

    const mc1driver: Driver = getDriver()
    const session: Session = mc1driver.session()

    const {records} = await mc1driver.executeQuery(getNodeQuery('carmodel'))
    progress.start(records.length, 0)
    records.forEach(record => {
        const node: Node = record.get('node')
        const data = convertCarModel(node)
        createCarModelNode(data)
        progress.increment()
    })
    progress.stop()

    await session.close()
    await mc1driver.close()
}

function convertBrand(node: Node): InputBrandCreate {
    return {
        name: node.properties.name,
        full_name: node.properties.full_name,
        founded: node.properties.founded?.low,
        defunct: node.properties.defunct?.low,
        wmi: node.properties.wmi,
        hsn: node.properties.hsn,
    }
}

function convertCarModel(node: Node): InputCarModelCreate {
    return {
        name: node.properties.name,
        built_from: node.properties.built_from,
        built_to: node.properties.built_to,
        generation: node.properties.generation_number,
        internal_code: node.properties.generation,
        total_production: node.properties.total_production,
    }
}

function getNodeQuery(nodeType: string) {
    return `MATCH (node:${nodeType}) RETURN node`
}
