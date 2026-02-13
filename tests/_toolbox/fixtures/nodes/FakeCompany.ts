import {faker} from "@faker-js/faker"
import type {InputCompanyCreate} from "../../../../src/db/nodes/companies/types/InputCompanyCreate"
import type {CompanyNode} from "../../../../src/models/companies/types/CompanyNode"

export const FakeCompany = {
    dbInput() {
        return {
            name: faker.company.name(),
            founded: faker.number.int({min: 1000, max: 3000}),
            defunct: faker.number.int({min: 1000, max: 3000}),
            headquarters_location: faker.location.city(),
            legal_headquarters_location: faker.location.city(),
        } as InputCompanyCreate
    },

    dbInputMinimal() {
        return {
            name: faker.company.name(),
        } as InputCompanyCreate
    },

    modelOutput() {
        return {
            id: faker.number.int({min: 12_000_000, max: 20_000_000}),
            name: faker.company.name(),
            founded: faker.number.int({min: 1000, max: 3000}),
            defunct: faker.number.int({min: 1000, max: 3000}),
            headquarters_location: faker.location.city(),
            legal_headquarters_location: faker.location.city(),
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString(),
        } as CompanyNode
    },
}
