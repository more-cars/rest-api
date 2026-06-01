import {faker} from "@faker-js/faker"
import type {DbInputData} from "../../../../src/db/types/DbInputData"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {MagazineNode} from "../../../../src/models/node-types/magazines/types/MagazineNode"

export const FakeMagazine = {
    dbInput: function () {
        return {
            name: faker.company.name(),
            founded: faker.number.int({min: 1000, max: 3000}),
            defunct: faker.number.int({min: 1000, max: 3000}),
            focus: faker.helpers.arrayElement(['new-cars', 'race-cars']),
            publication_frequency: faker.helpers.arrayElement(['weekly', 'monthly']),
            single_copy_price: faker.number.float({min: 1, max: 50, fractionDigits: 2}),
            single_copy_price_unit: faker.finance.currency().code,
            publication_format: faker.helpers.arrayElement(['print', 'digital']),
            circulation: faker.number.int({min: 1000, max: 1000000}),
            circulation_year: faker.number.int({min: 1000, max: 3000}),
            publisher: faker.company.name(),
            issn: '1350-9624',
            country_code: faker.location.countryCode(),
        } satisfies DbInputData
    },

    dbInputMinimal: function () {
        return {
            name: faker.company.name(),
        } as DbInputData
    },

    modelOutput: function () {
        return {
            node_type: ModelNodeType.Magazine,
            attributes: {
                id: faker.number.int({min: 12_000_000, max: 20_000_000}),
                name: faker.company.name(),
                founded: faker.number.int({min: 1000, max: 3000}),
                defunct: faker.number.int({min: 1000, max: 3000}),
                focus: faker.helpers.arrayElement(['new-cars', 'race-cars']),
                publication_frequency: faker.helpers.arrayElement(['weekly', 'monthly']),
                single_copy_price: faker.number.float({min: 1, max: 50, fractionDigits: 2}),
                single_copy_price_unit: faker.finance.currency().code,
                publication_format: faker.helpers.arrayElement(['print', 'digital']),
                circulation: faker.number.int({min: 1000, max: 1000000}),
                circulation_year: faker.number.int({min: 1000, max: 3000}),
                publisher: faker.company.name(),
                issn: '1350-9624',
                country_code: faker.location.countryCode(),
                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.past().toISOString(),
            },
        } satisfies MagazineNode
    },
}
