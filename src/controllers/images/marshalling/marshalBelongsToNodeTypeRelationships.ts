import type {
    ImageBelongsToNodeTypeRelationships
} from "../../../models/images/types/ImageBelongsToNodeTypeRelationships"
import type {ImageBelongsToNodeTypeResponse} from "../types/ImageBelongsToNodeTypeResponse"
import {marshalRelationship} from "../../relationships/marshalRelationship"
import type {BaseRelationship} from "../../relationships/types/BaseRelationship"

export function marshalBelongsToNodeTypeRelationships(relationships: ImageBelongsToNodeTypeRelationships) {
    // TODO this solution is not scalable
    const marshalledData: ImageBelongsToNodeTypeResponse = {
        data: {
            companies: {data: []},
            brands: {data: []},
            car_models: {data: []},
        }
    }

    relationships.companies.forEach((relationship) => {
        // TODO avoid fallback, provide correct partner node type
        marshalledData.data.companies.data.push(marshalRelationship(relationship as BaseRelationship, relationship.relationship_partner || {
            id: 0,
            created_at: "",
            updated_at: ""
        }, 'brand'))
    })

    relationships.brands.forEach((relationship) => {
        marshalledData.data.brands.data.push(marshalRelationship(relationship as BaseRelationship, relationship.relationship_partner || {
            id: 0,
            created_at: "",
            updated_at: ""
        }, 'brand'))
    })

    relationships.car_models.forEach((relationship) => {
        marshalledData.data.car_models.data.push(marshalRelationship(relationship as BaseRelationship, relationship.relationship_partner || {
            id: 0,
            created_at: "",
            updated_at: ""
        }, 'brand'))
    })

    return marshalledData
}
