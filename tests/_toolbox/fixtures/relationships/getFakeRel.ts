import {faker} from "@faker-js/faker"
import type {Rel} from "../../../../src/models/relationships/types/Rel"
import type {RelType} from "../../../../src/models/relationships/types/RelType"
import {getFakeModelNodeType} from "../nodes/getFakeModelNode"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"

export function getFakeRel(relType: RelType): Rel {
    return {
        id: faker.number.int({min: 12_000_000, max: 20_000_000}),
        type: relType,
        origin: getFakeModelNodeType(ModelNodeType.TrackLayout),
        destination: getFakeModelNodeType(ModelNodeType.RacingEvent),
        created_at: faker.date.past().toISOString(),
        updated_at: faker.date.past().toISOString(),
    } satisfies Rel
}
