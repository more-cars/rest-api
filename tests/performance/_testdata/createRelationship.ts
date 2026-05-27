import http from "k6/http"
import {dasherize, pluralize} from "inflection"
import type {ControllerNodeType} from "../../../src/controllers/types/ControllerNodeType.ts"

export function createRelationship(
    startNodeType: ControllerNodeType,
    startNodeId: number,
    endNodeId: number,
    relationshipName: string,
) {
    const url = `${__ENV.API_URL}/${dasherize(pluralize(startNodeType.toLowerCase()))}/${startNodeId}/${dasherize(relationshipName)}/${endNodeId}`
    http.post(url)
}
