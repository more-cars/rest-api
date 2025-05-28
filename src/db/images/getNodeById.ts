import {Driver, Node, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../driver"
import {ImageNode} from "../../types/images/ImageNode"

export async function getNodeById(id: number): Promise<false | ImageNode> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const foundNode = await getNode(id, driver)

    await session.close()
    await closeDriver(driver)

    return foundNode
}

async function getNode(id: number, driver: Driver): Promise<false | ImageNode> {
    const {records} = await driver.executeQuery(`
            MATCH (node:Image {mc_id: ${id}}) 
            RETURN node
            LIMIT 1`,
    )

    if (records.length === 0) {
        return false
    }

    const foundDbNode: Node = records[0].get('node')

    const node: ImageNode = {
        // system data
        id: foundDbNode.properties.mc_id,
        created_at: foundDbNode.properties.created_at,
        updated_at: foundDbNode.properties.updated_at,

        // user data
        external_id: foundDbNode.properties.external_id,
        image_provider: foundDbNode.properties.image_provider,

        // generated data
        name: foundDbNode.properties.name,
        description: foundDbNode.properties.description,
        creator: foundDbNode.properties.creator,
        license: foundDbNode.properties.license,
        tags: foundDbNode.properties.tags,
        source: foundDbNode.properties.source,
        image_url_original: foundDbNode.properties.image_url_original,
        image_url_xxl: foundDbNode.properties.image_url_xxl,
        image_url_xl: foundDbNode.properties.image_url_xl,
        image_url_l: foundDbNode.properties.image_url_l,
        image_url_m: foundDbNode.properties.image_url_m,
        image_url_s: foundDbNode.properties.image_url_s,
        image_url_xs: foundDbNode.properties.image_url_xs,
    }

    return node
}
