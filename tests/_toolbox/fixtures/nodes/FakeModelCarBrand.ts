import {faker} from "@faker-js/faker"
import type {InputModelCarBrandCreate} from "../../../../src/db/node-types/model-car-brands/types/InputModelCarBrandCreate"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {ModelCarBrandNode} from "../../../../src/models/node-types/model-car-brands/types/ModelCarBrandNode"

export const FakeModelCarBrand = {
    dbInput: {
        name: faker.word.noun(),
        founded: faker.number.int({min: 1000, max: 3000}),
        defunct: faker.number.int({min: 1000, max: 3000}),
        country_code: faker.location.countryCode(),
    } as InputModelCarBrandCreate,

    dbInputMinimal: {
        name: faker.word.noun(),
    } as InputModelCarBrandCreate,

    modelOutput: {
        node_type: ModelNodeType.ModelCarBrand,
        attributes: {
            id: faker.number.int({min: 12_000_000, max: 20_000_000}),
            name: faker.word.noun(),
            founded: faker.number.int({min: 1000, max: 3000}),
            defunct: faker.number.int({min: 1000, max: 3000}),
            country_code: faker.location.countryCode(),
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString(),
        },
    } satisfies ModelCarBrandNode
}
