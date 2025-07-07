import neo4j, {Driver, Node, Session} from "neo4j-driver"
import {NodeTypeLabel} from "../NodeTypeLabel.ts"
import {addMoreCarsIdToNode} from "./addMoreCarsIdToNode.ts"
import {addTimestampsToNode} from "./addTimestampsToNode.ts"
import {getDriver} from "../driver.ts"
import {generateMoreCarsId} from "../generateMoreCarsId.ts"
import {extractBaseIdFromElementId} from "../extractBaseIdFromElementId.ts"

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
    dbNode = await addMoreCarsIdToNode(elementId, moreCarsId, nodeType)

    // 3. Adding timestamps
    const timestamp = new Date().toISOString()
    dbNode = await addTimestampsToNode(elementId, timestamp)

    await session.close()
    await driver.close()

    return dbNode
}
