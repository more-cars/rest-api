import {faker} from "@faker-js/faker"
import type {DbInputData} from "../../../../src/db/types/DbInputData"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {SessionResultNode} from "../../../../src/models/node-types/session-results/types/SessionResultNode"

export const FakeSessionResult = {
    dbInput: function () {
        return {
            position: faker.number.int({min: 1, max: 99}),
            race_number: faker.number.int({min: 1, max: 99}).toString(),
            driver_name: faker.person.fullName(),
            team_name: faker.company.name(),
            race_time: faker.number.int().toString(),
            laps: faker.number.int({min: 1, max: 99}),
            status: faker.word.noun(),
            points: faker.number.int({min: 1, max: 99}),
        } satisfies DbInputData
    },

    dbInputMinimal: function () {
        return {
            position: faker.number.int({min: 1, max: 99}),
            driver_name: faker.person.fullName(),
        } as DbInputData
    },

    modelOutput: function () {
        return {
            node_type: ModelNodeType.SessionResult,
            attributes: {
                id: faker.number.int({min: 12_000_000, max: 20_000_000}),
                position: faker.number.int({min: 1, max: 99}),
                race_number: faker.number.int({min: 1, max: 99}).toString(),
                driver_name: faker.person.fullName(),
                team_name: faker.company.name(),
                race_time: faker.number.int().toString(),
                laps: faker.number.int({min: 1, max: 99}),
                status: faker.word.noun(),
                points: faker.number.int({min: 1, max: 99}),
                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.past().toISOString(),
            },
        } satisfies SessionResultNode
    },
}
