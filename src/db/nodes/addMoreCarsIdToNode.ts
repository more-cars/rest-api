import {Driver, Node} from "neo4j-driver"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {NodeTypeLabel} from "../NodeTypeLabel"

export async function addMoreCarsIdToNode(
    elementId: string,
    moreCarsId: number,
    nodeType: NodeTypeLabel,
    driver: Driver
): Promise<Node> {
    const {records} = await driver.executeQuery(addMoreCarsIdToNodeQuery(nodeType, elementId, moreCarsId))

    return records[0].get('node')
}

export function addMoreCarsIdToNodeQuery(nodeLabel: NodeTypeLabel, elementId: string, moreCarsId: number) {
    return getCypherQueryTemplate('nodes/_cypher/addMoreCarsIdToNode.cypher')
        .trim()
        .replace(':nodeLabel', `:${nodeLabel}`)
        .replace('$elementId', elementId)
        .replace('$moreCarsId', moreCarsId.toString())
}
