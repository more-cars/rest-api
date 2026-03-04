import {pascalCase} from "change-case"
import {singularize} from "inflection"
import {RelationshipType} from "../../../src/specification/RelationshipType"

export function convertStringToRelationshipType(rawRelationshipType: string, rawStartNodeType: string) {
    let startNodeType = pascalCase(singularize(rawStartNodeType))
    if (startNodeType === 'RacingSery') {
        startNodeType = 'RacingSeries'
    }

    const relationshipType = (startNodeType + pascalCase(rawRelationshipType)) as keyof typeof RelationshipType

    return RelationshipType[relationshipType] as RelationshipType
}
