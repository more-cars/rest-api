import {marshalRelationship} from "./marshalRelationship"
import {ImageBelongsToNodeRelationship} from "../../models/images/types/ImageBelongsToNodeRelationship"
import {ImageBelongsToNodeResponse} from "./types/ImageBelongsToNodeResponse"

export function marshalRelationships(relationships: Array<ImageBelongsToNodeRelationship>): Array<ImageBelongsToNodeResponse> {
    const responseObjects: any[] = []

    relationships.forEach((relationship) => {
        responseObjects.push(marshalRelationship(relationship))
    })

    return responseObjects
}
