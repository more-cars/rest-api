import type {
    ImageBelongsToNodeTypeRelationships
} from "../../../models/images/types/ImageBelongsToNodeTypeRelationships"
import type {ImageBelongsToNodeTypeResponse} from "../types/ImageBelongsToNodeTypeResponse"
import {marshalRelationship} from "../../relationships/marshalRelationship"

export function marshalBelongsToNodeTypeRelationships(relationships: ImageBelongsToNodeTypeRelationships) {
    // TODO this solution is not scalable
    const marshalledData: ImageBelongsToNodeTypeResponse = {
        companies: {data: []},
        brands: {data: []},
        car_models: {data: []},
    }

    relationships.companies.forEach((relationship) => {
        marshalledData.companies.data.push(marshalRelationship(relationship, {
            id: 0,
            created_at: "",
            updated_at: ""
        }, 'brand')) // TODO provide correct partnernodetype)
    })

    relationships.brands.forEach((relationship) => {
        marshalledData.brands.data.push(marshalRelationship(relationship, {
            id: 0,
            created_at: "",
            updated_at: ""
        }, 'brand')) // TODO provide correct partnernodetype)
    })

    relationships.car_models.forEach((relationship) => {
        marshalledData.car_models.data.push(marshalRelationship(relationship, {
            id: 0,
            created_at: "",
            updated_at: ""
        }, 'brand')) // TODO provide correct partnernodetype)
    })

    return marshalledData
}
