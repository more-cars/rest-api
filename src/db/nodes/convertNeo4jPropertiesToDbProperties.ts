import type {Node} from "neo4j-driver"
import {getNodeTypeSpecification} from "../../specification/getNodeTypeSpecification"
import {NodeType} from "../../specification/NodeType"

export function convertNeo4jPropertiesToDbProperties(neo4jNode: Node, nodeType: NodeType) {
    const properties = getNodeTypeSpecification(nodeType).properties

    const convertedProps: Record<string, string | number | boolean | null> = {
        id: neo4jNode.properties.mc_id,
        created_at: neo4jNode.properties.created_at,
        updated_at: neo4jNode.properties.updated_at,
    }

    properties.forEach(property => {
        if (neo4jNode.properties[property.name] === null || neo4jNode.properties[property.name] === undefined) {
            convertedProps[property.name] = null
        } else {
            convertedProps[property.name] = neo4jNode.properties[property.name]
        }
    })

    return convertedProps
}
