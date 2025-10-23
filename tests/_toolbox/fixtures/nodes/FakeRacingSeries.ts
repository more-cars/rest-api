import {faker} from "@faker-js/faker"
import type {InputRacingSeriesCreate} from "../../../../src/db/nodes/racing-series/types/InputRacingSeriesCreate"
import type {RacingSeriesNode} from "../../../../src/models/racing-series/types/RacingSeriesNode"

export class FakeRacingSeries {
    static dbInput() {
        return {
            name: faker.word.noun(),
            short_name: faker.word.noun(),
            founded: faker.number.int({min: 1000, max: 3000}),
            defunct: faker.number.int({min: 1000, max: 3000}),
            organized_by: faker.word.noun(),
            vehicle_type: faker.word.noun(),
        } as InputRacingSeriesCreate
    }

    static modelOutput() {
        return {
            id: faker.number.int({min: 12_000_000, max: 20_000_000}),
            name: faker.word.noun(),
            short_name: faker.word.noun(),
            founded: faker.number.int({min: 1000, max: 3000}),
            defunct: faker.number.int({min: 1000, max: 3000}),
            organized_by: faker.word.noun(),
            vehicle_type: faker.word.noun(),
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString(),
        } as RacingSeriesNode
    }
}
