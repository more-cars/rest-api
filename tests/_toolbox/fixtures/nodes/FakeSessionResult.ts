import {faker} from "@faker-js/faker"
import type {InputSessionResultCreate} from "../../../../src/db/nodes/session-results/types/InputSessionResultCreate"
import type {SessionResultNode} from "../../../../src/models/session-results/types/SessionResultNode"

export const FakeSessionResult = {
    dbInput() {
        return {
            position: faker.number.int({min: 1, max: 99}),
            race_number: faker.number.int({min: 1, max: 99}).toString(),
            driver_name: faker.person.fullName(),
            team_name: faker.company.name(),
            race_time: faker.word.noun(),
            laps: faker.number.int({min: 1, max: 99}),
            status: faker.word.noun(),
            points: faker.number.int({min: 1, max: 99}),
        } as InputSessionResultCreate
    },

    modelOutput() {
        return {
            id: faker.number.int({min: 12_000_000, max: 20_000_000}),
            position: faker.number.int({min: 1, max: 99}),
            race_number: faker.number.int({min: 1, max: 99}).toString(),
            driver_name: faker.person.fullName(),
            team_name: faker.company.name(),
            race_time: faker.word.noun(),
            laps: faker.number.int({min: 1, max: 99}),
            status: faker.word.noun(),
            points: faker.number.int({min: 1, max: 99}),
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString(),
        } as SessionResultNode
    },
}
