import {marshalHasImageRelationship} from "./marshalHasImageRelationship"
import {CompanyHasImageRelationship} from "../../../models/companies/types/CompanyHasImageRelationship"

export function marshalHasImageRelationships(relationships: Array<CompanyHasImageRelationship>) {
    const responseObjects: Array<CompanyHasImageRelationship> = []

    relationships.forEach((relationship) => {
        responseObjects.push(marshalHasImageRelationship(relationship))
    })

    return responseObjects
}
