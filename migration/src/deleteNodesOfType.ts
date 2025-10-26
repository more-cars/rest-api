import type {NodeTypeLabel} from "../../src/db/NodeTypeLabel"
import {titleize} from "inflection"
import {deleteAllNodesOfType} from "../../tests/_toolbox/dbSeeding/deleteAllNodesOfType"
import type {NodeTypeEnum} from "../../src/controllers/nodes/types/NodeTypeEnum"

export async function deleteNodesOfType(nodeType: NodeTypeLabel) {
    const nodeTypeConverted = titleize(nodeType).toLowerCase() as NodeTypeEnum
    console.log('deleting all nodes of type "' + nodeTypeConverted + '"...')
    await deleteAllNodesOfType(nodeTypeConverted)
    console.log('all nodes of type "' + nodeTypeConverted + '" deleted')
}
