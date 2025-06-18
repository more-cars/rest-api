import fs from 'node:fs'
import {NodeTypeLabel} from "../NodeTypeLabel"

export function getAllNodesOfTypeQuery(nodeLabel: NodeTypeLabel) {
    const queryTemplate = fs.readFileSync(__dirname + '/getAllNodesOfType.cypher', 'utf8')

    return queryTemplate
        .trim()
        .replace(':nodeLabel', `:${nodeLabel}`)
}
