import {faker} from "@faker-js/faker"
import type {InputLapTimeCreate} from "../../../../src/db/node-types/lap-times/types/InputLapTimeCreate"
import type {LapTimeNode} from "../../../../src/models/node-types/lap-times/types/LapTimeNode"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"

export const FakeLapTime = {
    dbInput() {
        return {
            time: faker.word.noun(),
            driver_name: faker.person.fullName(),
            date: faker.date.past().toISOString().substring(0, 10),
        } as InputLapTimeCreate
    },

    dbInputMinimal() {
        return {
            time: faker.word.noun(),
            driver_name: faker.person.fullName(),
        } as InputLapTimeCreate
    },

    modelOutput() {
        return {
            node_type: ModelNodeType.LapTime,
            attributes: {
                id: faker.number.int({min: 12_000_000, max: 20_000_000}),
                time: faker.word.noun(),
                driver_name: faker.person.fullName(),
                date: faker.date.past().toISOString().substring(0, 10),
                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.past().toISOString(),
            }
        } satisfies LapTimeNode
    },
}
