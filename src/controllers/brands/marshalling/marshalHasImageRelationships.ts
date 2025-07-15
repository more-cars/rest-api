import {BrandHasImageRelationship} from "../../../models/brands/types/BrandHasImageRelationship"
import {BrandHasImageResponse} from "../types/BrandHasImageResponse"
import {marshalHasImageRelationship} from "./marshalHasImageRelationship"

export function marshalHasImageRelationships(relationships: Array<BrandHasImageRelationship>): Array<BrandHasImageResponse> {
    const responseObjects: Array<BrandHasImageResponse> = []

    relationships.forEach((relationship) => {
        responseObjects.push(marshalHasImageRelationship(relationship))
    })

    return responseObjects
}
