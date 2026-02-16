import neo4j, {Driver, Node, Session} from "neo4j-driver"
import {NodeTypeLabel} from "../NodeTypeLabel"
import {addMoreCarsIdToNode} from "./addMoreCarsIdToNode"
import {addTimestampsToNode} from "./addTimestampsToNode"
import {getDriver} from "../driver"
import {generateMoreCarsId} from "../generateMoreCarsId"
import {extractBaseIdFromElementId} from "../extractBaseIdFromElementId"

export async function createDbNode(nodeType: NodeTypeLabel, query: string): Promise<Node> {
    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    // 1. Creating the node in the database
    let dbNode: Node = await session.executeWrite(async txc => {
        const result = await txc.run(query)
        return result.records[0].get('node')
    })

    // 2. Adding a custom More Cars ID for that node
    const elementId = dbNode.elementId
    const moreCarsId = generateMoreCarsId(extractBaseIdFromElementId(elementId))
    dbNode = await addMoreCarsIdToNode(elementId, moreCarsId)

    // 3. Adding timestamps
    const timestamp = new Date().toISOString()
    dbNode = await addTimestampsToNode(elementId, timestamp, timestamp)

    await session.close()

    return dbNode
}
