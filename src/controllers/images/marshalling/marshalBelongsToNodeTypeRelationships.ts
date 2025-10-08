import type {
    ImageBelongsToNodeTypeRelationships
} from "../../../models/images/types/ImageBelongsToNodeTypeRelationships"
import type {ImageBelongsToNodeTypeResponse} from "../types/ImageBelongsToNodeTypeResponse"
import {marshalBelongsToNodeRelationship} from "./marshalBelongsToNodeRelationship"

export function marshalBelongsToNodeTypeRelationships(relationships: ImageBelongsToNodeTypeRelationships) {
    // TODO this solution is not scalable
    const marshalledData: ImageBelongsToNodeTypeResponse = {
        brands: [],
        car_models: [],
        companies: [],
    }

    relationships.companies.forEach((relationship) => {
        marshalledData.companies.push(marshalBelongsToNodeRelationship(relationship))
    })

    relationships.brands.forEach((relationship) => {
        marshalledData.brands.push(marshalBelongsToNodeRelationship(relationship))
    })

    relationships.car_models.forEach((relationship) => {
        marshalledData.car_models.push(marshalBelongsToNodeRelationship(relationship))
    })

    return marshalledData
}
