import {faker} from "@faker-js/faker"
import type {InputLapTimeCreate} from "../../../../src/db/nodes/lap-times/types/InputLapTimeCreate"
import type {LapTimeNode} from "../../../../src/models/lap-times/types/LapTimeNode"

export class FakeLapTime {
    static dbInput() {
        return {
            time: faker.word.noun(),
            driver_name: faker.person.fullName(),
            date: faker.date.past().toISOString().substring(0, 10),
        } as InputLapTimeCreate
    }

    static modelOutput() {
        return {
            id: faker.number.int({min: 12_000_000, max: 20_000_000}),
            time: faker.word.noun(),
            driver_name: faker.person.fullName(),
            date: faker.date.past().toISOString().substring(0, 10),
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString(),
        } as LapTimeNode
    }
}
