import {faker} from "@faker-js/faker"
import type {DbInputData} from "../../../../src/db/types/DbInputData"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {RacingSeriesNode} from "../../../../src/models/node-types/racing-series/types/RacingSeriesNode"

export const FakeRacingSeries = {
    dbInput: function () {
        return {
            name: faker.word.words(3),
            short_name: faker.word.noun().toUpperCase(),
            founded: faker.number.int({min: 1000, max: 3000}),
            defunct: faker.number.int({min: 1000, max: 3000}),
            organized_by: faker.company.name(),
            vehicle_type: faker.vehicle.type(),
            country_code: faker.location.countryCode(),
        } satisfies DbInputData
    },

    dbInputMinimal: function () {
        return {
            name: faker.word.words(3),
        } as DbInputData
    },


    modelOutput: function () {
        return {
            node_type: ModelNodeType.RacingSeries,
            attributes: {
                id: faker.number.int({min: 12_000_000, max: 20_000_000}),
                name: faker.word.words(3),
                short_name: faker.word.noun().toUpperCase(),
                founded: faker.number.int({min: 1000, max: 3000}),
                defunct: faker.number.int({min: 1000, max: 3000}),
                organized_by: faker.company.name(),
                vehicle_type: faker.vehicle.type(),
                country_code: faker.location.countryCode(),
                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.past().toISOString(),
            },
        } satisfies RacingSeriesNode
    },
}
