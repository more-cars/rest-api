import {faker} from "@faker-js/faker"
import type {InputRacingSeriesCreate} from "../../../../src/db/node-types/racing-series/types/InputRacingSeriesCreate"
import type {RacingSeriesNode} from "../../../../src/models/node-types/racing-series/types/RacingSeriesNode"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"

export const FakeRacingSeries = {
    dbInput() {
        return {
            name: faker.word.words(3),
            short_name: faker.word.noun().toUpperCase(),
            founded: faker.number.int({min: 1000, max: 3000}),
            defunct: faker.number.int({min: 1000, max: 3000}),
            organized_by: faker.company.name(),
            vehicle_type: faker.vehicle.type(),
        } as InputRacingSeriesCreate
    },

    dbInputMinimal() {
        return {
            name: faker.word.words(3),
        } as InputRacingSeriesCreate
    },


    modelOutput() {
        const output: RacingSeriesNode = {
            node_type: ModelNodeType.RacingSeries,
            attributes: {
                id: faker.number.int({min: 12_000_000, max: 20_000_000}),
                name: faker.word.words(3),
                short_name: faker.word.noun().toUpperCase(),
                founded: faker.number.int({min: 1000, max: 3000}),
                defunct: faker.number.int({min: 1000, max: 3000}),
                organized_by: faker.company.name(),
                vehicle_type: faker.vehicle.type(),
                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.past().toISOString(),
            }
        }

        return output
    },
}
