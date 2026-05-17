import {faker} from "@faker-js/faker"
import type {DbInputData} from "../../../../src/db/types/DbInputData"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {LapTimeNode} from "../../../../src/models/node-types/lap-times/types/LapTimeNode"

export const FakeLapTime = {
    dbInput: function () {
        return {
            time: faker.word.noun(),
            driver_name: faker.person.fullName(),
            date: faker.date.past().toISOString().substring(0, 10),
        } satisfies DbInputData
    },

    dbInputMinimal: function () {
        return {
            time: faker.word.noun(),
            driver_name: faker.person.fullName(),
        } as DbInputData
    },

    modelOutput: function () {
        return {
            node_type: ModelNodeType.LapTime,
            attributes: {
                id: faker.number.int({min: 12_000_000, max: 20_000_000}),
                time: faker.word.noun(),
                driver_name: faker.person.fullName(),
                date: faker.date.past().toISOString().substring(0, 10),
                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.past().toISOString(),
            },
        } satisfies LapTimeNode
    },
}
