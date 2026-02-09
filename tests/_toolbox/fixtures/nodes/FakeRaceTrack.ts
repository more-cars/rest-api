import {faker} from "@faker-js/faker"
import type {RaceTrackNode} from "../../../../src/models/race-tracks/types/RaceTrackNode"
import type {InputRaceTrackCreate} from "../../../../src/db/nodes/race-tracks/types/InputRaceTrackCreate"

export const FakeRaceTrack = {
    dbInput() {
        return {
            name: faker.word.noun(),
            opened: faker.number.int({min: 1000, max: 3000}),
            closed: faker.number.int({min: 1000, max: 3000}),
            type: faker.word.noun(),
            location: faker.word.noun(),
            geo_position: faker.word.noun(),
        } as InputRaceTrackCreate
    },

    modelOutput() {
        return {
            id: faker.number.int({min: 12_000_000, max: 20_000_000}),
            name: faker.word.noun(),
            opened: faker.number.int({min: 1000, max: 3000}),
            closed: faker.number.int({min: 1000, max: 3000}),
            type: faker.word.noun(),
            location: faker.word.noun(),
            geo_position: faker.word.noun(),
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString(),
        } as RaceTrackNode
    },
}
