import {Driver, Node, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../../driver"
import {ImageNode} from "./types/ImageNode"
import {InputImageCreate} from "./types/InputImageCreate"
import {addMoreCarsIdToNode} from "../addMoreCarsIdToNode"
import {addTimestampsToNode} from "../addTimestampsToNode"
import {mapDbNodeToModelNode} from "./mapDbNodeToModelNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {getCypherQueryTemplate} from "../../getCypherQueryTemplate"

export async function createNode(data: InputImageCreate): Promise<ImageNode> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const node = await createImage(data, driver)

    await session.close()
    await closeDriver(driver)

    return mapDbNodeToModelNode(node)
}

async function createImage(data: InputImageCreate, driver: Driver): Promise<Node> {
    // 1. Creating the node in the database
    const {records} = await driver.executeQuery(createNodeQuery(data))
    const createdDbNode: Node = records[0].get('node')

    // 2. Adding a custom More Cars ID for that node
    // Note: This seems pointless at first glance, because the More Cars ID is exactly the same as the Neo4j ID.
    //       The benefit: we can modify the More Cars ID anytime, while the Neo4j ID is always read-only.
    //       This will become relevant when migrating nodes from the old database.
    //       In that scenario we need to be able to carry over the existing IDs.
    const elementId = createdDbNode.elementId
    const elementIdSplit: Array<string> = elementId.split(':')
    const moreCarsId: number = parseInt(elementIdSplit[2])
    await addMoreCarsIdToNode(elementId, moreCarsId, NodeTypeLabel.Image, driver)

    // 3. Adding timestamps
    const timestamp = new Date().toISOString()
    return await addTimestampsToNode(elementId, timestamp, driver)
}

export function createNodeQuery(data: InputImageCreate) {
    let template = getCypherQueryTemplate('nodes/images/_cypher/createNode.cypher')
        .trim()

    template = template
        .replace('$image_provider', `'${data.image_provider}'`)
        .replace('$external_id', `'${data.external_id}'`)
        .replace('$name', `'${data.name}'`)
        .replace('$description', data.description ? `'${data.description}'` : 'null') // TODO escape single quotes
        .replace('$creator', `'${data.creator}'`)
        .replace('$license', `'${data.license}'`)
        .replace('$tags', data.tags ? `'${data.tags}'` : 'null')
        .replace('$source', `'${data.source}'`)
        .replace('$image_url_original', `'${data.image_url_original}'`)
        .replace('$image_url_xxl', data.image_url_xxl ? `'${data.image_url_xxl}'` : 'null')
        .replace('$image_url_xl', data.image_url_xl ? `'${data.image_url_xl}'` : 'null')
        .replace('$image_url_l', data.image_url_l ? `'${data.image_url_l}'` : 'null')
        .replace('$image_url_m', data.image_url_m ? `'${data.image_url_m}'` : 'null')
        .replace('$image_url_s', data.image_url_s ? `'${data.image_url_s}'` : 'null')
        .replace('$image_url_xs', data.image_url_xs ? `'${data.image_url_xs}'` : 'null')

    return template
}
