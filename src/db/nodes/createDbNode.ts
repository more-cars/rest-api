import {Driver, Node, Session} from "neo4j-driver"
import {NodeTypeLabel} from "../NodeTypeLabel.ts"
import {addMoreCarsIdToNode} from "./addMoreCarsIdToNode.ts"
import {addTimestampsToNode} from "./addTimestampsToNode.ts"
import {closeDriver, getDriver} from "../driver.ts"

export async function createDbNode(nodeType: NodeTypeLabel, query: string): Promise<Node> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    // 1. Creating the node in the database
    const {records} = await driver.executeQuery(query)
    let dbNode: Node = records[0].get('node')

    // 2. Adding a custom More Cars ID for that node
    // Note: This seems pointless at first glance, because the More Cars ID is exactly the same as the Neo4j ID.
    //       The benefit: we can modify the More Cars ID anytime, while the Neo4j ID is always read-only.
    //       This will become relevant when migrating nodes from the old database.
    //       In that scenario we need to be able to carry over the existing IDs.
    const elementId = dbNode.elementId
    const elementIdSplit: Array<string> = elementId.split(':')
    const moreCarsId: number = parseInt(elementIdSplit[2])
    dbNode = await addMoreCarsIdToNode(elementId, moreCarsId, nodeType, driver)

    // 3. Adding timestamps
    const timestamp = new Date().toISOString()
    dbNode = await addTimestampsToNode(elementId, timestamp, driver)

    await session.close()
    await closeDriver(driver)

    return dbNode
}
