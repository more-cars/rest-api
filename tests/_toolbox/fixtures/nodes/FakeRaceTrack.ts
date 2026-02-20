import {faker} from "@faker-js/faker"
import type {RaceTrackNode} from "../../../../src/models/node-types/race-tracks/types/RaceTrackNode"
import type {InputRaceTrackCreate} from "../../../../src/db/nodes/race-tracks/types/InputRaceTrackCreate"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"

export const FakeRaceTrack = {
    dbInput() {
        return {
            name: faker.location.city() + ' Racetrack',
            opened: faker.number.int({min: 1000, max: 3000}),
            closed: faker.number.int({min: 1000, max: 3000}),
            type: faker.word.noun(),
            location: faker.location.city(),
            geo_position: faker.location.latitude() + ' ' + faker.location.longitude,
        } as InputRaceTrackCreate
    },

    dbInputMinimal() {
        return {
            name: faker.location.city() + ' Racetrack',
        } as InputRaceTrackCreate
    },

    modelOutput() {
        const output: RaceTrackNode = {
            node_type: ModelNodeType.RaceTrack,
            attributes: {
                id: faker.number.int({min: 12_000_000, max: 20_000_000}),
                name: faker.location.city() + ' Racetrack',
                opened: faker.number.int({min: 1000, max: 3000}),
                closed: faker.number.int({min: 1000, max: 3000}),
                type: faker.word.noun(),
                location: faker.location.city(),
                geo_position: faker.location.latitude() + ' ' + faker.location.longitude,
                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.past().toISOString(),
            }
        }

        return output
    },
}
