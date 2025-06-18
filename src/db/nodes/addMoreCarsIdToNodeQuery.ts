import fs from 'node:fs'
import {NodeTypeLabel} from "../NodeTypeLabel"

export function addMoreCarsIdToNodeQuery(nodeLabel: NodeTypeLabel, elementId: string, moreCarsId: number) {
    const queryTemplate = fs.readFileSync(__dirname + '/addMoreCarsIdToNode.cypher', 'utf8')

    return queryTemplate
        .trim()
        .replace(':nodeLabel', `:${nodeLabel}`)
        .replace('$elementId', elementId)
        .replace('$moreCarsId', moreCarsId.toString())
}
