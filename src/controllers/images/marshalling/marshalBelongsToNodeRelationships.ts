import {marshalBelongsToNodeRelationship} from "./marshalBelongsToNodeRelationship"
import {ImageBelongsToNodeRelationship} from "../../../models/images/types/ImageBelongsToNodeRelationship"
import {ImageBelongsToNodeResponse} from "../types/ImageBelongsToNodeResponse"

export function marshalBelongsToNodeRelationships(relationships: Array<ImageBelongsToNodeRelationship>) {
    const responseObjects: Array<ImageBelongsToNodeResponse> = []

    relationships.forEach((relationship) => {
        responseObjects.push(marshalBelongsToNodeRelationship(relationship))
    })

    return responseObjects
}
