import {NodeTypeLabel} from "../NodeTypeLabel"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export function addMoreCarsIdToNodeQuery(nodeLabel: NodeTypeLabel, elementId: string, moreCarsId: number) {
    return getCypherQueryTemplate('nodes/_cypher/addMoreCarsIdToNode.cypher')
        .trim()
        .replace(':nodeLabel', `:${nodeLabel}`)
        .replace('$elementId', elementId)
        .replace('$moreCarsId', moreCarsId.toString())
}
