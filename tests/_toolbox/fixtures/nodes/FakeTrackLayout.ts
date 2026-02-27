import {faker} from "@faker-js/faker"
import type {InputTrackLayoutCreate} from "../../../../src/db/node-types/track-layouts/types/InputTrackLayoutCreate"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {TrackLayoutNode} from "../../../../src/models/node-types/track-layouts/types/TrackLayoutNode"

export const FakeTrackLayout = {
    dbInput: {
        name: faker.word.words(3),
        year_from: faker.number.int({min: 1000, max: 3000}),
        year_to: faker.number.int({min: 1000, max: 3000}),
        length: faker.number.int({min: 1000, max: 3000}),
        length_unit: faker.science.unit().name,
        direction: faker.word.noun(),
        elevation_change: faker.number.int({min: 1000, max: 3000}),
        elevation_change_unit: faker.science.unit().name,
        surface: faker.word.noun(),
    } as InputTrackLayoutCreate,

    dbInputMinimal: {
        name: faker.word.words(3),
    } as InputTrackLayoutCreate,

    modelOutput: {
        node_type: ModelNodeType.TrackLayout,
        attributes: {
            id: faker.number.int({min: 12_000_000, max: 20_000_000}),
            name: faker.word.words(3),
            year_from: faker.number.int({min: 1000, max: 3000}),
            year_to: faker.number.int({min: 1000, max: 3000}),
            length: faker.number.int({min: 1000, max: 3000}),
            length_unit: faker.science.unit().name,
            direction: faker.word.noun(),
            elevation_change: faker.number.int({min: 1000, max: 3000}),
            elevation_change_unit: faker.science.unit().name,
            surface: faker.word.noun(),
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString(),
        },
    } satisfies TrackLayoutNode,
}
