import {faker} from "@faker-js/faker"
import type {InputTrackLayoutCreate} from "../../../../src/db/nodes/track-layouts/types/InputTrackLayoutCreate"

export default {
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
