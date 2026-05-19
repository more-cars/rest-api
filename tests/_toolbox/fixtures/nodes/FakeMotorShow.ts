import {faker} from "@faker-js/faker"
import type {DbInputData} from "../../../../src/db/types/DbInputData"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {MotorShowNode} from "../../../../src/models/node-types/motor-shows/types/MotorShowNode"

export const FakeMotorShow = {
    dbInput: function () {
        return {
            name: faker.word.noun(),
            date_from: faker.date.past().toISOString().substring(0, 10),
            date_until: faker.date.past().toISOString().substring(0, 10),
            location: faker.word.noun(),
            target_audience: faker.helpers.arrayElement(['international', 'national']),
            focus: faker.helpers.arrayElement(['new_cars', 'other']),
            country_code: faker.location.countryCode(),
        } satisfies DbInputData
    },

    dbInputMinimal: function () {
        return {
            name: faker.word.noun(),
        } as DbInputData
    },

    modelOutput: function () {
        return {
            node_type: ModelNodeType.MotorShow,
            attributes: {
                id: faker.number.int({min: 12_000_000, max: 20_000_000}),
                name: faker.word.noun(),
                date_from: faker.date.past().toISOString().substring(0, 10),
                date_until: faker.date.past().toISOString().substring(0, 10),
                location: faker.word.noun(),
                target_audience: faker.helpers.arrayElement(['international', 'national']),
                focus: faker.helpers.arrayElement(['new_cars', 'other']),
                country_code: faker.location.countryCode(),
                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.past().toISOString(),
            },
        } satisfies MotorShowNode
    },
}
