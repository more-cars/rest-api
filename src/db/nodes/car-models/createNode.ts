import {Driver, Node, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../../driver"
import {CarModelNode} from "./types/CarModelNode"
import {InputCarModelCreate} from "./types/InputCarModelCreate"
import {addMoreCarsIdToNode} from "../addMoreCarsIdToNode"
import {addTimestampsToNode} from "../addTimestampsToNode"
import {mapDbNodeToModelNode} from "./mapDbNodeToModelNode"
import {NodeTypeLabel} from "../../NodeTypeLabel"
import {getCypherQueryTemplate} from "../../getCypherQueryTemplate"
import {escapeSingleQuotes} from "../escapeSingleQuotes"

export async function createNode(data: InputCarModelCreate): Promise<CarModelNode> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const node = await createCarModel(data, driver)

    await session.close()
    await closeDriver(driver)

    return mapDbNodeToModelNode(node)
}

async function createCarModel(data: InputCarModelCreate, driver: Driver): Promise<Node> {
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
    await addMoreCarsIdToNode(elementId, moreCarsId, NodeTypeLabel.CarModel, driver)

    // 3. Adding timestamps
    const timestamp = new Date().toISOString()
    return await addTimestampsToNode(elementId, timestamp, driver)
}

export function createNodeQuery(data: InputCarModelCreate) {
    let template = getCypherQueryTemplate('nodes/car-models/_cypher/createNode.cypher')
        .trim()

    template = template
        .replace('$name', `'${escapeSingleQuotes(data.name)}'`)
        .replace('$built_from', data.built_from ? `${data.built_from}` : 'null')
        .replace('$built_to', data.built_to ? `${data.built_to}` : 'null')
        .replace('$generation', data.generation ? `${data.generation}` : 'null')
        .replace('$internal_code', data.internal_code ? `'${escapeSingleQuotes(data.internal_code)}'` : 'null')
        .replace('$total_production', data.total_production ? `${data.total_production}` : 'null')

    return template
}
