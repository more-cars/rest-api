import {BrandHasCarModelRelationship} from "../../../models/brands/types/BrandHasCarModelRelationship"
import {marshalHasCarModelRelationship} from "./marshalHasCarModelRelationship"
import {BrandHasCarModelResponse} from "../types/BrandHasCarModelResponse"

export function marshalHasCarModelRelationships(relationships: Array<BrandHasCarModelRelationship>) {
    const responseObjects: Array<BrandHasCarModelResponse> = []

    relationships.forEach((relationship) => {
        responseObjects.push(marshalHasCarModelRelationship(relationship))
    })

    return responseObjects
}
