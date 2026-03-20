import {faker} from "@faker-js/faker"
import type {InputPriceCreate} from "../../../../src/db/node-types/prices/types/InputPriceCreate"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {PriceNode} from "../../../../src/models/node-types/prices/types/PriceNode"

export const FakePrice = {
    dbInput: {
        price: faker.number.int({min: 10000, max: 100000}),
        price_year: faker.number.int({min: 1000, max: 3000}),
        currency_code: faker.finance.currencyCode(),
        country_code: faker.location.countryCode(),
    } as InputPriceCreate,

    dbInputMinimal: {
        price: faker.number.int({min: 10000, max: 100000}),
        price_year: faker.number.int({min: 1000, max: 3000}),
        currency_code: faker.finance.currencyCode(),
        country_code: faker.location.countryCode(),
    } as InputPriceCreate,

    modelOutput: {
        node_type: ModelNodeType.Price,
        attributes: {
            id: faker.number.int({min: 12_000_000, max: 20_000_000}),
            price: faker.number.int({min: 10000, max: 100000}),
            price_year: faker.number.int({min: 1000, max: 3000}),
            currency_code: faker.finance.currencyCode(),
            country_code: faker.location.countryCode(),
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString(),
        },
    } satisfies PriceNode
}
