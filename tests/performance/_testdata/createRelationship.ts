import http from "k6/http"
import type {ControllerNodeType} from "../../../src/controllers/nodes/types/ControllerNodeType.ts"
import {getBasePathFragmentForNodeType} from "../../_toolbox/dbSeeding/getBasePathFragmentForNodeType.ts"
import {dasherize} from "inflection"

export function createRelationship(
    startNodeType: ControllerNodeType,
    startNodeId: number,
    endNodeId: number,
    relationshipName: string
) {
    const url = `${__ENV.API_URL}/${getBasePathFragmentForNodeType(startNodeType)}/${startNodeId}/${dasherize(relationshipName)}/${endNodeId}`
    const response = http.post(url)

    // @ts-expect-error TS2531
    return response.json().data.relationship_id
}
