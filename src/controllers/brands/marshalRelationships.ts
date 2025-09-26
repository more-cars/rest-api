import {BrandHasCarModelRelationship} from "../../models/brands/types/BrandHasCarModelRelationship"
import {marshalHasCarModelRelationship} from "./marshalling/marshalHasCarModelRelationship"
import {BrandHasCarModelResponse} from "./types/BrandHasCarModelResponse"

export function marshalRelationships(relationships: Array<BrandHasCarModelRelationship>): Array<BrandHasCarModelResponse> {
    const responseObjects: Array<BrandHasCarModelResponse> = []

    relationships.forEach((relationship) => {
        responseObjects.push(marshalHasCarModelRelationship(relationship))
    })

    return responseObjects
}
