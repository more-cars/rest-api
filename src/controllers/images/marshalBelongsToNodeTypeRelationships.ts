import type {ImageBelongsToNodeTypeRelationships} from "../../models/images/types/ImageBelongsToNodeTypeRelationships"
import type {ImageBelongsToNodeTypeResponse} from "./types/ImageBelongsToNodeTypeResponse"
import {marshalRelationship} from "./marshalRelationship"

export function marshalBelongsToNodeTypeRelationships(relationships: ImageBelongsToNodeTypeRelationships): ImageBelongsToNodeTypeResponse {
    const marshalledData: ImageBelongsToNodeTypeResponse = {
        brands: [],
        car_models: []
    }

    relationships.brands.forEach((relationship) => {
        marshalledData.brands.push(marshalRelationship(relationship))
    })

    relationships.car_models.forEach((relationship) => {
        marshalledData.car_models.push(marshalRelationship(relationship))
    })

    return marshalledData
}
