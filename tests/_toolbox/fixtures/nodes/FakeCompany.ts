import {faker} from "@faker-js/faker"
import type {InputCompanyCreate} from "../../../../src/db/nodes/companies/types/InputCompanyCreate"
import type {CompanyNode} from "../../../../src/models/companies/types/CompanyNode"

export const FakeCompany = {
    dbInput() {
        return {
            name: faker.word.noun(),
            founded: faker.number.int({min: 1000, max: 3000}),
            defunct: faker.number.int({min: 1000, max: 3000}),
            headquarters_location: faker.word.noun(),
            legal_headquarters_location: faker.word.noun(),
        } as InputCompanyCreate
    },

    dbInputMinimal() {
        return {
            name: faker.word.noun(),
        } as InputCompanyCreate
    },

    modelOutput() {
        return {
            id: faker.number.int({min: 12_000_000, max: 20_000_000}),
            name: faker.word.noun(),
            founded: faker.number.int({min: 1000, max: 3000}),
            defunct: faker.number.int({min: 1000, max: 3000}),
            headquarters_location: faker.word.noun(),
            legal_headquarters_location: faker.word.noun(),
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString(),
        } as CompanyNode
    },
}
