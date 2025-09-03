import http from "k6/http"
import type {NodeType} from "../../_toolbox/NodeType"
import {getBasePathFragmentForNodeType} from "../../_toolbox/dbSeeding/getBasePathFragmentForNodeType"
import {dasherize} from "inflection"

export function createRelationship(
    startNodeType: NodeType,
    startNodeId: number,
    endNodeId: number,
    relationshipName: string
) {
    const url = `${__ENV.API_URL}/${getBasePathFragmentForNodeType(startNodeType)}/${startNodeId}/${dasherize(relationshipName)}/${endNodeId}`
    http.post(url)
}
