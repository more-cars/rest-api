import {BrandHasCarModelRelationship} from "../../types/brands/BrandHasCarModelRelationship"
import {marshalRelationship} from "./marshalRelationship"

export function marshalRelationships(relationships: Array<BrandHasCarModelRelationship>) {
    const responseObjects: any[] = []

    relationships.forEach((relationship) => {
        responseObjects.push(marshalRelationship(relationship))
    })

    return responseObjects
}
