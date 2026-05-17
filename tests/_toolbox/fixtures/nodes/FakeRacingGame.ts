import {faker} from "@faker-js/faker"
import type {DbInputData} from "../../../../src/db/types/DbInputData"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {RacingGameNode} from "../../../../src/models/node-types/racing-games/types/RacingGameNode"

export const FakeRacingGame = {
    dbInput: function () {
        return {
            name: faker.commerce.productName(),
            release_year: faker.number.int({min: 1000, max: 3000}),
            developer: faker.company.name(),
            publisher: faker.company.name(),
        } satisfies DbInputData
    },

    dbInputMinimal: function () {
        return {
            name: faker.commerce.productName(),
        } as DbInputData
    },

    modelOutput: function () {
        return {
            node_type: ModelNodeType.RacingGame,
            attributes: {
                id: faker.number.int({min: 12_000_000, max: 20_000_000}),
                name: faker.commerce.productName(),
                release_year: faker.number.int({min: 1000, max: 3000}),
                developer: faker.company.name(),
                publisher: faker.company.name(),
                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.past().toISOString(),
            },
        } satisfies RacingGameNode
    },
}
