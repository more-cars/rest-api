import {NodeTypeLabel} from "../NodeTypeLabel"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export function getAllNodesOfTypeQuery(nodeLabel: NodeTypeLabel) {
    return getCypherQueryTemplate('nodes/_cypher/getAllNodesOfType.cypher')
        .trim()
        .replace(':nodeLabel', `:${nodeLabel}`)
}
