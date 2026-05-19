import {faker} from "@faker-js/faker"
import type {DbInputData} from "../../../../src/db/types/DbInputData"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {TrackLayoutNode} from "../../../../src/models/node-types/track-layouts/types/TrackLayoutNode"

export const FakeTrackLayout = {
    dbInput: function () {
        return {
            name: faker.word.words(3),
            year_from: faker.number.int({min: 1000, max: 3000}),
            year_to: faker.number.int({min: 1000, max: 3000}),
            length: faker.number.int({min: 1000, max: 3000}),
            length_unit: faker.helpers.arrayElement(['km', 'miles']),
            direction: faker.helpers.arrayElement(['clockwise', 'counterclockwise']),
            elevation_change: faker.number.int({min: 1000, max: 3000}),
            elevation_change_unit: faker.helpers.arrayElement(['m', 'km']),
            surface: faker.helpers.arrayElement(['asphalt', 'mixed']),
        } satisfies DbInputData
    },

    dbInputMinimal: function () {
        return {
            name: faker.word.words(3),
        } as DbInputData
    },

    modelOutput: function () {
        return {
            node_type: ModelNodeType.TrackLayout,
            attributes: {
                id: faker.number.int({min: 12_000_000, max: 20_000_000}),
                name: faker.word.words(3),
                year_from: faker.number.int({min: 1000, max: 3000}),
                year_to: faker.number.int({min: 1000, max: 3000}),
                length: faker.number.int({min: 1000, max: 3000}),
                length_unit: faker.helpers.arrayElement(['km', 'miles']),
                direction: faker.helpers.arrayElement(['clockwise', 'counterclockwise']),
                elevation_change: faker.number.int({min: 1000, max: 3000}),
                elevation_change_unit: faker.helpers.arrayElement(['m', 'km']),
                surface: faker.helpers.arrayElement(['asphalt', 'mixed']),
                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.past().toISOString(),
            },
        } satisfies TrackLayoutNode
    },
}
