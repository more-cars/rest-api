import {faker} from "@faker-js/faker"
import type {RaceTrackNode} from "../../../../src/models/node-types/race-tracks/types/RaceTrackNode"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {DbInputData} from "../../../../src/db/types/DbInputData"

export const FakeRaceTrack = {
    dbInput: function () {
        return {
            name: faker.location.city() + ' Racetrack',
            opened: faker.number.int({min: 1000, max: 3000}),
            closed: faker.number.int({min: 1000, max: 3000}),
            type: faker.word.noun(),
            location: faker.location.city(),
            geo_position: faker.location.latitude() + ' ' + faker.location.longitude,
            country_code: faker.location.countryCode(),
        } satisfies DbInputData
    },

    dbInputMinimal: function () {
        return {
            name: faker.location.city() + ' Racetrack',
        } as DbInputData
    },

    modelOutput: function () {
        return {
            node_type: ModelNodeType.RaceTrack,
            attributes: {
                id: faker.number.int({min: 12_000_000, max: 20_000_000}),
                name: faker.location.city() + ' Racetrack',
                opened: faker.number.int({min: 1000, max: 3000}),
                closed: faker.number.int({min: 1000, max: 3000}),
                type: faker.word.noun(),
                location: faker.location.city(),
                geo_position: faker.location.latitude() + ' ' + faker.location.longitude,
                country_code: faker.location.countryCode(),
                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.past().toISOString(),
            },
        } satisfies RaceTrackNode
    },
}
