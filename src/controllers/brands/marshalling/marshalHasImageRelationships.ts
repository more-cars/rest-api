import {BrandHasImageRelationship} from "../../../models/brands/types/BrandHasImageRelationship.ts"
import {BrandHasImageResponse} from "../types/BrandHasImageResponse.ts"
import {marshalHasImageRelationship} from "./marshalHasImageRelationship.ts"

export function marshalHasImageRelationships(relationships: Array<BrandHasImageRelationship>): Array<BrandHasImageResponse> {
    const responseObjects: Array<BrandHasImageResponse> = []

    relationships.forEach((relationship) => {
        responseObjects.push(marshalHasImageRelationship(relationship))
    })

    return responseObjects
}
