import {faker} from "@faker-js/faker"
import type {InputMagazineCreate} from "../../../../src/db/node-types/magazines/types/InputMagazineCreate"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {MagazineNode} from "../../../../src/models/node-types/magazines/types/MagazineNode"

export const FakeMagazine = {
    dbInput: {
        name: faker.company.name(),
        founded: faker.number.int({min: 1000, max: 3000}),
        defunct: faker.number.int({min: 1000, max: 3000}),
        focus: faker.commerce.product(),
        publication_frequency: faker.word.noun(),
        single_copy_price: faker.number.float({min: 1, max: 50, fractionDigits: 2}),
        single_copy_price_unit: faker.finance.currency().symbol,
        publication_format: faker.word.noun(),
        circulation: faker.number.int({min: 1000, max: 1000000}),
        circulation_year: faker.number.int({min: 1000, max: 3000}),
        publisher: faker.company.name(),
        issn: faker.commerce.isbn(),
    } as InputMagazineCreate,

    dbInputMinimal: {
        name: faker.company.name(),
    } as InputMagazineCreate,

    modelOutput: {
        node_type: ModelNodeType.Magazine,
        attributes: {
            id: faker.number.int({min: 12_000_000, max: 20_000_000}),
            name: faker.company.name(),
            founded: faker.number.int({min: 1000, max: 3000}),
            defunct: faker.number.int({min: 1000, max: 3000}),
            focus: faker.commerce.product(),
            publication_frequency: faker.word.noun(),
            single_copy_price: faker.number.float({min: 1, max: 50, fractionDigits: 2}),
            single_copy_price_unit: faker.finance.currency().symbol,
            publication_format: faker.word.noun(),
            circulation: faker.number.int({min: 1000, max: 1000000}),
            circulation_year: faker.number.int({min: 1000, max: 3000}),
            publisher: faker.company.name(),
            issn: faker.commerce.isbn(),
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString(),
        },
    } satisfies MagazineNode,
}
