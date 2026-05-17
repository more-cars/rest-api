import {faker} from "@faker-js/faker"
import type {DbInputData} from "../../../../src/db/types/DbInputData"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {GamingPlatformNode} from "../../../../src/models/node-types/gaming-platforms/types/GamingPlatformNode"

export const FakeGamingPlatform = {
    dbInput: function () {
        return {
            name: faker.commerce.product(),
            release_year: faker.number.int({min: 1000, max: 3000}),
            manufacturer: faker.company.name(),
        } satisfies DbInputData
    },

    dbInputMinimal: function () {
        return {
            name: faker.commerce.product(),
        } as DbInputData
    },

    modelOutput: function () {
        return {
            node_type: ModelNodeType.GamingPlatform,
            attributes: {
                id: faker.number.int({min: 12_000_000, max: 20_000_000}),
                name: faker.commerce.product(),
                release_year: faker.number.int({min: 1000, max: 3000}),
                manufacturer: faker.company.name(),
                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.past().toISOString(),
            },
        } satisfies GamingPlatformNode
    },
}
