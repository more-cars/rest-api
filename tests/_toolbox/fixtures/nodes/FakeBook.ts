import {faker} from "@faker-js/faker"
import type {DbInputData} from "../../../../src/db/types/DbInputData"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {BookNode} from "../../../../src/models/node-types/books/types/BookNode"

export const FakeBook = {
    dbInput: function () {
        return {
            title: faker.commerce.productName(),
            author: faker.person.fullName(),
            publisher: faker.company.name(),
            year_of_publication: faker.number.int({min: 1000, max: 3000}),
            isbn: faker.commerce.isbn(),
            pages: faker.number.int({min: 10, max: 300}),
            language: faker.location.language().alpha2,
        } satisfies DbInputData
    },

    dbInputMinimal: function () {
        return {
            title: faker.commerce.productName(),
        } as DbInputData
    },

    modelOutput: function () {
        return {
            node_type: ModelNodeType.Book,
            attributes: {
                id: faker.number.int({min: 12_000_000, max: 20_000_000}),
                title: faker.commerce.productName(),
                author: faker.person.fullName(),
                publisher: faker.company.name(),
                year_of_publication: faker.number.int({min: 1000, max: 3000}),
                isbn: faker.commerce.isbn(),
                pages: faker.number.int({min: 10, max: 300}),
                language: faker.location.language().alpha2,
                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.past().toISOString(),
            },
        } satisfies BookNode
    },
}
