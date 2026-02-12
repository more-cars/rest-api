import {faker} from "@faker-js/faker"
import type {InputRacingSessionCreate} from "../../../../src/db/nodes/racing-sessions/types/InputRacingSessionCreate"
import type {RacingSessionNode} from "../../../../src/models/racing-sessions/types/RacingSessionNode"

export const FakeRacingSession = {
    dbInput() {
        return {
            name: faker.word.noun(),
            start_date: faker.word.noun(),
            start_time: faker.word.noun(),
            duration: faker.number.int({min: 1000, max: 3000}),
            duration_unit: faker.word.noun(),
            distance: faker.number.int({min: 1000, max: 3000}),
            distance_unit: faker.word.noun(),
        } as InputRacingSessionCreate
    },

    dbInputMinimal() {
        return {
            name: faker.word.noun(),
        } as InputRacingSessionCreate
    },

    modelOutput() {
        return {
            id: faker.number.int({min: 12_000_000, max: 20_000_000}),
            name: faker.word.noun(),
            start_date: faker.word.noun(),
            start_time: faker.word.noun(),
            duration: faker.number.int({min: 1000, max: 3000}),
            duration_unit: faker.word.noun(),
            distance: faker.number.int({min: 1000, max: 3000}),
            distance_unit: faker.word.noun(),
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString(),
        } as RacingSessionNode
    },
}
