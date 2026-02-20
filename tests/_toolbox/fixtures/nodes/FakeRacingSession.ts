import {faker} from "@faker-js/faker"
import type {InputRacingSessionCreate} from "../../../../src/db/nodes/racing-sessions/types/InputRacingSessionCreate"
import type {RacingSessionNode} from "../../../../src/models/node-types/racing-sessions/types/RacingSessionNode"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"

export const FakeRacingSession = {
    dbInput() {
        return {
            name: faker.word.noun(),
            start_date: faker.date.past().toLocaleString(),
            start_time: faker.number.int().toString(),
            duration: faker.number.int({min: 1000, max: 3000}),
            duration_unit: faker.science.unit().name,
            distance: faker.number.int({min: 1000, max: 3000}),
            distance_unit: faker.science.unit().name,
        } as InputRacingSessionCreate
    },

    dbInputMinimal() {
        return {
            name: faker.word.noun(),
        } as InputRacingSessionCreate
    },

    modelOutput() {
        const output: RacingSessionNode = {
            node_type: ModelNodeType.RacingSession,
            attributes: {
                id: faker.number.int({min: 12_000_000, max: 20_000_000}),
                name: faker.word.noun(),
                start_date: faker.date.past().toLocaleString(),
                start_time: faker.number.int().toString(),
                duration: faker.number.int({min: 1000, max: 3000}),
                duration_unit: faker.science.unit().name,
                distance: faker.number.int({min: 1000, max: 3000}),
                distance_unit: faker.science.unit().name,
                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.past().toISOString(),
            }
        }

        return output
    },
}
