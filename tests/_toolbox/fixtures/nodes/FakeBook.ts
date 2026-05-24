import {faker} from "@faker-js/faker"
import type {DbInputData} from "../../../../src/db/types/DbInputData"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {BookNode} from "../../../../src/models/node-types/books/types/BookNode"

export const FakeBook = {
    dbInput: function () {
        return {
            title: faker.word.noun(),
            author: faker.word.noun(),
            publisher: faker.word.noun(),
            year_of_publication: faker.number.int({min: 1000, max: 3000}),
            isbn: faker.word.noun(),
            pages: faker.number.int({min: 1000, max: 3000}),
            language: faker.word.noun(),
        } satisfies DbInputData
    },

    dbInputMinimal: function () {
        return {
            title: faker.word.noun(),
        } as DbInputData
    },

    modelOutput: function () {
        return {
            node_type: ModelNodeType.Book,
            attributes: {
                id: faker.number.int({min: 12_000_000, max: 20_000_000}),
                title: faker.word.noun(),
                author: faker.word.noun(),
                publisher: faker.word.noun(),
                year_of_publication: faker.number.int({min: 1000, max: 3000}),
                isbn: faker.word.noun(),
                pages: faker.number.int({min: 1000, max: 3000}),
                language: faker.word.noun(),
                created_at: faker.date.past().toISOString(),
                updated_at: faker.date.past().toISOString(),
            },
        } satisfies BookNode
    },
}
