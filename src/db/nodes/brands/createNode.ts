import {Driver, Node, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../../driver"
import {BrandNode} from "./types/BrandNode"
import {InputBrandCreate} from "./types/InputBrandCreate"
import {addMoreCarsIdToNode} from "../addMoreCarsIdToNode"
import {addTimestampsToNode} from "../addTimestampsToNode"
import {mapDbNodeToModelNode} from "./mapDbNodeToModelNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {getCypherQueryTemplate} from "../../getCypherQueryTemplate"

export async function createNode(data: InputBrandCreate): Promise<BrandNode> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const node = await createBrand(data, driver)

    await session.close()
    await closeDriver(driver)

    return mapDbNodeToModelNode(node)
}

async function createBrand(data: InputBrandCreate, driver: Driver): Promise<Node> {
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
    await addMoreCarsIdToNode(elementId, moreCarsId, NodeTypeLabel.Brand, driver)

    // 3. Adding timestamps
    const timestamp = new Date().toISOString()
    return await addTimestampsToNode(elementId, timestamp, driver)
}

export function createNodeQuery(data: InputBrandCreate) {
    let template = getCypherQueryTemplate('nodes/brands/_cypher/createNode.cypher')
        .trim()

    template = template
        .replace('$name', `'${data.name}'`)
        .replace('$full_name', data.full_name ? `'${data.full_name}'` : 'null')
        .replace('$founded', data.founded ? `${data.founded}` : 'null')
        .replace('$defunct', data.defunct ? `${data.defunct}` : 'null')
        .replace('$wmi', data.wmi ? `'${data.wmi}'` : 'null')
        .replace('$hsn', data.hsn ? `'${data.hsn}'` : 'null')

    return template
}
