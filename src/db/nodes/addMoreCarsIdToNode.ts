import neo4j, {Driver, Node, Session} from "neo4j-driver"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {NodeTypeLabel} from "../NodeTypeLabel"
import {getDriver} from "../driver"

export async function addMoreCarsIdToNode(
    elementId: string,
    moreCarsId: number,
    nodeType: NodeTypeLabel,
): Promise<Node> {
    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    const dbNode: Node = await session.executeWrite(async txc => {
        const result = await txc.run(addMoreCarsIdToNodeQuery(nodeType, elementId, moreCarsId))
        return result.records[0].get('node')
    })

    await session.close()
    await driver.close()

    return dbNode
}

export function addMoreCarsIdToNodeQuery(nodeLabel: NodeTypeLabel, elementId: string, moreCarsId: number) {
    return getCypherQueryTemplate('nodes/_cypher/addMoreCarsIdToNode.cypher')
        .trim()
        .replace(':nodeLabel', `:${nodeLabel}`)
        .replace('$elementId', elementId)
        .replace('$moreCarsId', moreCarsId.toString())
}
