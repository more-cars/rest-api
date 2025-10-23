import {faker} from "@faker-js/faker"
import type {InputRacingEventCreate} from "../../../../src/db/nodes/racing-events/types/InputRacingEventCreate"
import type {RacingEventNode} from "../../../../src/models/racing-events/types/RacingEventNode"

export class FakeRacingEvent {
    static dbInput() {
        return {
            name: faker.word.noun(),
            round: faker.number.int({min: 1000, max: 3000}),
            date_from: faker.word.noun(),
            date_to: faker.word.noun(),
        } as InputRacingEventCreate
    }

    static modelOutput() {
        return {
            id: faker.number.int({min: 12_000_000, max: 20_000_000}),
            name: faker.word.noun(),
            round: faker.number.int({min: 1000, max: 3000}),
            date_from: faker.word.noun(),
            date_to: faker.word.noun(),
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString(),
        } as RacingEventNode
    }
}
