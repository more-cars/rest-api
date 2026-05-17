import {faker} from "@faker-js/faker"
import type {DbInputData} from "../../../../src/db/types/DbInputData"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {ModelCarNode} from "../../../../src/models/node-types/model-cars/types/ModelCarNode"

export const FakeModelCar = {
    dbInput: function () {
        return {
            name: faker.word.noun(),
            product_code: faker.word.noun(),
            release_year: faker.number.int({min: 1000, max: 3000}),
            scale: faker.word.noun(),
            series: faker.word.noun(),
        } satisfies DbInputData
    },

    dbInputMinimal: function () {
        return {
            name: faker.word.noun(),
        } as DbInputData
    },

    modelOutput: function () {
        return {
            node_type: ModelNodeType.ModelCar,
            attributes: {
                id: faker.number.int({min: 12_000_000, max: 20_000_000}),
                name: faker.word.noun(),
                product_code: faker.word.noun(),
                release_year: faker.number.int({min: 1000, max: 3000}),
                scale: faker.word.noun(),
                series: faker.word.noun(),
                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.past().toISOString(),
            },
        } satisfies ModelCarNode
    },
}
