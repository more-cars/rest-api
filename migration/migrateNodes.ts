import {getDriver} from "../src/db/driver-mc1.ts"
import {Driver, Node, Session} from "neo4j-driver"
import {deleteAllBrands} from "../tests/dbSeeding/brands/nodes/deleteAllBrands.ts"
import {deleteAllCarModels} from "../tests/dbSeeding/car-models/nodes/deleteAllCarModels.ts"
import {deleteAllImages} from "../tests/dbSeeding/images/nodes/deleteAllImages.ts"
import {createNode as createBrandNode} from "../src/db/nodes/brands/createNode.ts"
import {createNode as createCarModelNode} from "../src/db/nodes/car-models/createNode.ts"
import {createNode as createImageNode} from "../src/db/nodes/images/createNode.ts"
import {InputBrandCreate} from "../src/db/nodes/brands/types/InputBrandCreate.ts"
import {InputCarModelCreate} from "../src/db/nodes/car-models/types/InputCarModelCreate.ts"
import {InputImageCreate} from "../src/db/nodes/images/types/InputImageCreate.ts"
import cliProgress from "cli-progress"

(async function migrate() {
    console.log('Brands')
    await deleteAllBrands()
    await migrateBrands()

    console.log('Car Models')
    await deleteAllCarModels()
    await migrateCarModels()

    console.log('Images')
    await deleteAllImages()
    await migrateImages()
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

async function migrateImages() {
    const progress = new cliProgress.SingleBar({}, cliProgress.Presets.rect)

    const mc1driver: Driver = getDriver()
    const session: Session = mc1driver.session()

    const {records} = await mc1driver.executeQuery(getNodeQuery('image'))
    progress.start(records.length, 0)
    records.forEach(record => {
        const node: Node = record.get('node')
        const data = convertImage(node)
        createImageNode(data)
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

function convertImage(node: Node): InputImageCreate {
    return {
        image_provider: node.properties.image_platform ? node.properties.image_platform : 'MISSING',
        external_id: node.properties.image_id ? node.properties.image_id : 'MISSING',
        name: node.properties.name ? node.properties.name : 'MISSING',
        description: node.properties.description,
        creator: node.properties.author ? node.properties.author : 'MISSING',
        license: node.properties.license ? node.properties.license : 'MISSING',
        tags: node.properties.tags,
        source: node.properties.origin ? node.properties.origin : 'MISSING',
        image_url_original: node.properties.source ? node.properties.source : 'MISSING',
        image_url_xxl: node.properties.size_xxl,
        image_url_xl: node.properties.size_xl,
        image_url_l: node.properties.size_l,
        image_url_m: node.properties.size_m,
        image_url_s: node.properties.size_s,
        image_url_xs: node.properties.size_xs,
    }
}

function getNodeQuery(nodeType: string) {
    return `MATCH (node:${nodeType}) RETURN node ORDER BY id(node) LIMIT 300`
}
