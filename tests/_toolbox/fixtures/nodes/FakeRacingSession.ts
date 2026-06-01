import {faker} from "@faker-js/faker"
import type {DbInputData} from "../../../../src/db/types/DbInputData"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {RacingSessionNode} from "../../../../src/models/node-types/racing-sessions/types/RacingSessionNode"

export const FakeRacingSession = {
    dbInput: function () {
        return {
            name: faker.word.noun(),
            start_date: faker.date.past().toISOString().substring(0, 10),
            start_time: faker.number.int().toString(),
            duration: "PT120M",
            distance: faker.number.int({min: 1000, max: 3000}),
            distance_unit: faker.helpers.arrayElement(['km', 'miles']),
        } satisfies DbInputData
    },

    dbInputMinimal: function () {
        return {
            name: faker.word.noun(),
        } as DbInputData
    },

    modelOutput: function () {
        return {
            node_type: ModelNodeType.RacingSession,
            attributes: {
                id: faker.number.int({min: 12_000_000, max: 20_000_000}),
                name: faker.word.noun(),
                start_date: faker.date.past().toISOString().substring(0, 10),
                start_time: faker.number.int().toString(),
                duration: "PT120M",
                distance: faker.number.int({min: 1000, max: 3000}),
                distance_unit: faker.helpers.arrayElement(['km', 'miles']),
                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.past().toISOString(),
            },
        } satisfies RacingSessionNode
    },
}
