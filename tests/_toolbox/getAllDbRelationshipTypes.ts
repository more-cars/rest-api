import {RelationshipType} from "../../src/db/types/RelationshipType"
import {RelationshipDirection} from "../../src/db/types/RelationshipDirection"
import {getRelationshipTypeSpecification} from "../../src/specification/getRelationshipTypeSpecification"
import {mapDbRelationshipTypeToRelationshipType} from "../../src/specification/mapDbRelationshipTypeToRelationshipType"

export function getAllDbRelationshipTypes(direction: RelationshipDirection) {
    const allRelationshipTypes = Array.from(new Set(Object.values(RelationshipType) as string[])) as RelationshipType[]

    if (direction === RelationshipDirection.FORWARD) {
        const filteredRelationshipTypes: RelationshipType[] = []

        allRelationshipTypes.forEach(relationshipType => {
            const spec = getRelationshipTypeSpecification(mapDbRelationshipTypeToRelationshipType(relationshipType))
            if (!spec.isReverseRelationship) {
                filteredRelationshipTypes.push(relationshipType)
            }
        })

        return filteredRelationshipTypes
    }

    if (direction === RelationshipDirection.REVERSE) {
        const filteredRelationshipTypes: RelationshipType[] = []

        allRelationshipTypes.forEach(relationshipType => {
            const spec = getRelationshipTypeSpecification(mapDbRelationshipTypeToRelationshipType(relationshipType))
            if (spec.isReverseRelationship) {
                filteredRelationshipTypes.push(relationshipType)
            }
        })

        return filteredRelationshipTypes
    }

    return allRelationshipTypes
}
