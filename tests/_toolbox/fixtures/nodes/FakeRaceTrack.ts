import {faker} from "@faker-js/faker"
import type {InputRaceTrackCreate} from "../../../../src/db/nodes/race-tracks/types/InputRaceTrackCreate"

export default {
    name: faker.word.noun(),
    opened: faker.number.int({min: 1000, max: 3000}),
    closed: faker.number.int({min: 1000, max: 3000}),
    type: faker.word.noun(),
    location: faker.word.noun(),
    geo_position: faker.word.noun(),
} as InputRaceTrackCreate
