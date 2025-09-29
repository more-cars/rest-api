import {marshalHasBrandRelationship} from "./marshalHasBrandRelationship"
import {CompanyHasBrandRelationship} from "../../../models/companies/types/CompanyHasBrandRelationship"

export function marshalHasBrandRelationships(relationships: Array<CompanyHasBrandRelationship>) {
    const responseObjects: Array<CompanyHasBrandRelationship> = []

    relationships.forEach((relationship) => {
        responseObjects.push(marshalHasBrandRelationship(relationship))
    })

    return responseObjects
}
