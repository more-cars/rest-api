import type {
    ImageBelongsToNodeTypeRelationships
} from "../../../models/images/types/ImageBelongsToNodeTypeRelationships"
import type {ImageBelongsToNodeTypeResponse} from "../types/ImageBelongsToNodeTypeResponse"
import {marshalRelation} from "../../relationships/marshalRelation"
import {NodeTypeEnum} from "../../nodes/types/NodeTypeEnum"

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
        marshalledData.data.companies.data.push(marshalRelation(relationship, NodeTypeEnum.COMPANY))
    })

    relationships.brands.forEach((relationship) => {
        marshalledData.data.brands.data.push(marshalRelation(relationship, NodeTypeEnum.BRAND))
    })

    relationships.car_models.forEach((relationship) => {
        marshalledData.data.car_models.data.push(marshalRelation(relationship, NodeTypeEnum.CAR_MODEL))
    })

    return marshalledData
}
