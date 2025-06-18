import {NodeTypeLabel} from "../NodeTypeLabel"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export function getNodeByIdQuery(id: number, nodeLabel: false | NodeTypeLabel = false) {
    let query = getCypherQueryTemplate('nodes/_cypher/getNodeById.cypher')
        .trim()
        .replace('$id', id.toString())

    if (nodeLabel) {
        query = query.replace(':nodeLabel', `:${nodeLabel}`)
    } else {
        query = query.replace(':nodeLabel', '')
    }

    return query
}
