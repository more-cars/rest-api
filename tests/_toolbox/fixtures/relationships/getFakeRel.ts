import {faker} from "@faker-js/faker"
import type {RelType} from "../../../../src/models/relationships/types/RelType"
import type {Rel} from "../../../../src/models/relationships/types/Rel"
import {getFakeNode} from "../nodes/getFakeNode"
import {mapModelNodeTypeToNodeType} from "../../../../src/specification/mapModelNodeTypeToNodeType"
import {getRelComposition} from "../../../../src/models/relationships/getRelComposition"

export function getFakeRel(relType: RelType): Rel {
    return {
        id: faker.number.int({min: 12_000_000, max: 20_000_000}),
        type: relType,
        origin: getFakeNode(mapModelNodeTypeToNodeType(getRelComposition(relType).startNodeType)).modelOutput,
        destination: getFakeNode(mapModelNodeTypeToNodeType(getRelComposition(relType).endNodeType)).modelOutput,
        created_at: faker.date.past().toISOString(),
        updated_at: faker.date.past().toISOString(),
    } satisfies Rel
}
