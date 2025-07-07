import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {DbRelationship} from "../types/DbRelationship"

export function deleteRelationshipByNodeAndNameQuery(nodeId: number, relationshipName: DbRelationship) {
    return getCypherQueryTemplate('relationships/_cypher/deleteRelationshipByNodeAndType.cypher')
        .trim()
        .replace('$nodeId', nodeId.toString())
        .replace('relationshipName', relationshipName)
}
