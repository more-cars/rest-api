import {faker} from "@faker-js/faker"
import type {InputMagazineIssueCreate} from "../../../../src/db/node-types/magazine-issues/types/InputMagazineIssueCreate"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {MagazineIssueNode} from "../../../../src/models/node-types/magazine-issues/types/MagazineIssueNode"

export const FakeMagazineIssue = {
    dbInput: {
        title: faker.commerce.productName(),
        consecutive_number: faker.number.int({min: 50, max: 500}),
        issue_number: faker.number.int({min: 1, max: 12}),
        issue_year: faker.number.int({min: 1000, max: 3000}),
        release_date: faker.date.past().toISOString().substring(0, 10),
        single_copy_price: faker.number.float({min: 1, max: 50, fractionDigits: 2}),
        single_copy_price_unit: faker.finance.currency().symbol,
        pages: faker.number.int({min: 50, max: 250}),
    } as InputMagazineIssueCreate,

    dbInputMinimal: {
        title: faker.commerce.productName(),
    } as InputMagazineIssueCreate,

    modelOutput: {
        node_type: ModelNodeType.MagazineIssue,
        attributes: {
            id: faker.number.int({min: 12_000_000, max: 20_000_000}),
            title: faker.commerce.productName(),
            consecutive_number: faker.number.int({min: 50, max: 500}),
            issue_number: faker.number.int({min: 1, max: 12}),
            issue_year: faker.number.int({min: 1000, max: 3000}),
            release_date: faker.date.past().toISOString().substring(0, 10),
            single_copy_price: faker.number.float({min: 1, max: 50, fractionDigits: 2}),
            single_copy_price_unit: faker.finance.currency().symbol,
            pages: faker.number.int({min: 50, max: 250}),
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString(),
        },
    } satisfies MagazineIssueNode
}
