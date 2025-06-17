import fs from 'node:fs'
import {NodeTypeLabel} from "./NodeTypeLabel"

export function getNodeByIdQuery(id: number, nodeLabel: false | NodeTypeLabel = false) {
    const queryTemplate = fs.readFileSync(__dirname + '/getNodeById.cypher', 'utf8')

    let query = queryTemplate
        .trim()
        .replace('$id', id.toString())

    if (nodeLabel) {
        query = query.replace(':nodeLabel', `:${nodeLabel}`)
    } else {
        query = query.replace(':nodeLabel', '')
    }

    return query
}
