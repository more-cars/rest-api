import type {Neo4jNodeType} from "../../src/db/types/Neo4jNodeType"
import {titleize} from "inflection"
import {deleteAllNodesOfType} from "../../tests/_toolbox/dbSeeding/deleteAllNodesOfType"
import type {ControllerNodeType} from "../../src/controllers/nodes/types/ControllerNodeType"

export async function deleteNodesOfType(nodeType: Neo4jNodeType) {
    const nodeTypeConverted = titleize(nodeType).toLowerCase() as ControllerNodeType
    console.log('deleting all nodes of type "' + nodeTypeConverted + '"...')
    await deleteAllNodesOfType(nodeTypeConverted)
    console.log('all nodes of type "' + nodeTypeConverted + '" deleted')
}
