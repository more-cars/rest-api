import {BrandHasCarModelRelationship} from "../../models/brands/types/BrandHasCarModelRelationship"
import {marshalRelationship} from "./marshalRelationship"
import {BrandHasCarModelResponse} from "./types/BrandHasCarModelResponse"

export function marshalRelationships(relationships: Array<BrandHasCarModelRelationship>): Array<BrandHasCarModelResponse> {
    const responseObjects: any[] = []

    relationships.forEach((relationship) => {
        responseObjects.push(marshalRelationship(relationship))
    })

    return responseObjects
}
