import {faker} from "@faker-js/faker"
import type {InputTrackLayoutCreate} from "../../../../src/db/nodes/track-layouts/types/InputTrackLayoutCreate"
import type {TrackLayoutNode} from "../../../../src/models/track-layouts/types/TrackLayoutNode"

export class FakeTrackLayout {
    static dbInput() {
        return {
            name: faker.word.noun(),
            year_from: faker.number.int({min: 1000, max: 3000}),
            year_to: faker.number.int({min: 1000, max: 3000}),
            length: faker.number.int({min: 1000, max: 3000}),
            length_unit: faker.word.noun(),
            direction: faker.word.noun(),
            elevation_change: faker.number.int({min: 1000, max: 3000}),
            elevation_change_unit: faker.word.noun(),
            surface: faker.word.noun(),
        } as InputTrackLayoutCreate
    }

    static modelOutput() {
        return {
            id: faker.number.int({min: 12_000_000, max: 20_000_000}),
            name: faker.word.noun(),
            year_from: faker.number.int({min: 1000, max: 3000}),
            year_to: faker.number.int({min: 1000, max: 3000}),
            length: faker.number.int({min: 1000, max: 3000}),
            length_unit: faker.word.noun(),
            direction: faker.word.noun(),
            elevation_change: faker.number.int({min: 1000, max: 3000}),
            elevation_change_unit: faker.word.noun(),
            surface: faker.word.noun(),
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString(),
        } as TrackLayoutNode
    }
}
