import {faker} from "@faker-js/faker"
import type {RelType} from "../../../../src/models/relationships/types/RelType"
import type {Rel} from "../../../../src/models/relationships/types/Rel"
import {getRelationshipTypeSpecification} from "../../../../src/specification/getRelationshipTypeSpecification"
import {mapModelRelationshipTypeToRelationshipType} from "../../../../src/specification/mapModelRelationshipTypeToRelationshipType"
import {getFakeNode} from "../nodes/getFakeNode"

export function getFakeRel(relType: RelType): Rel {
    const relationshipTypeSpecification = getRelationshipTypeSpecification(mapModelRelationshipTypeToRelationshipType(relType))

    return {
        id: faker.number.int({min: 12_000_000, max: 20_000_000}),
        type: relType,
        origin: getFakeNode(relationshipTypeSpecification.startNodeType).modelOutput,
        destination: getFakeNode(relationshipTypeSpecification.endNodeType).modelOutput,
        created_at: faker.date.past().toISOString(),
        updated_at: faker.date.past().toISOString(),
    } satisfies Rel
}
