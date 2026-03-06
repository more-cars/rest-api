import {faker} from "@faker-js/faker"
import type {InputRatingCreate} from "../../../../src/db/node-types/ratings/types/InputRatingCreate"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {RatingNode} from "../../../../src/models/node-types/ratings/types/RatingNode"

export const FakeRating = {
    dbInput: {
        rating_value: faker.number.int({min: 1000, max: 3000}),
        scale_minimum: faker.number.int({min: 1000, max: 3000}),
        scale_maximum: faker.number.int({min: 1000, max: 3000}),
        scale_direction: faker.word.noun(),
    } as InputRatingCreate,

    dbInputMinimal: {
        rating_value: faker.number.int({min: 1000, max: 3000}),
        scale_minimum: faker.number.int({min: 1000, max: 3000}),
        scale_maximum: faker.number.int({min: 1000, max: 3000}),
        scale_direction: faker.word.noun(),
    } as InputRatingCreate,

    modelOutput: {
        node_type: ModelNodeType.Rating,
        attributes: {
            id: faker.number.int({min: 12_000_000, max: 20_000_000}),
            rating_value: faker.number.int({min: 1000, max: 3000}),
            scale_minimum: faker.number.int({min: 1000, max: 3000}),
            scale_maximum: faker.number.int({min: 1000, max: 3000}),
            scale_direction: faker.word.noun(),
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString(),
        },
    } satisfies RatingNode
}
