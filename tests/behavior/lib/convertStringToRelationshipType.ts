import {pascalCase} from "change-case"
import {RelationshipType} from "../../../src/specification/RelationshipType"

export function convertStringToRelationshipType(rawRelationshipType: string, rawStartNodeType: string) {
    return RelationshipType[pascalCase(rawStartNodeType) + pascalCase(rawRelationshipType) as keyof typeof RelationshipType] as RelationshipType
}
