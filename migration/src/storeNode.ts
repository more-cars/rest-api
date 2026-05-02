import type {Node} from "neo4j-driver"
import {DbNodeType} from "../../src/db/types/DbNodeType"
import {createNeo4jNode} from "../../src/db/nodes/createNeo4jNode"
import {addMoreCarsIdToNode} from "../../src/db/nodes/addMoreCarsIdToNode"
import type {InputNodeTypeCreate} from "../../src/db/types/InputNodeTypeCreate"

export async function storeNode(data: InputNodeTypeCreate, newNodeType: DbNodeType, oldNode: Node) {
    try {
        const createdNode = await createNeo4jNode(newNodeType, data)

        return await addMoreCarsIdToNode(
            parseInt(oldNode.elementId) + 10_000_000,
            '',
            createdNode.properties.id,
        )
    } catch (e) {
        console.error(e)
        console.error(oldNode)
    }
}
