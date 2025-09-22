import {faker} from "@faker-js/faker"
import type {InputCompanyCreate} from "../../../../src/db/nodes/companies/types/InputCompanyCreate"

export default {
    name: faker.word.noun(),
    founded: faker.number.int({min: 1000, max: 3000}),
    defunct: faker.number.int({min: 1000, max: 3000}),
    headquarters_location: faker.word.noun(),
    legal_headquarters_location: faker.word.noun(),
} as InputCompanyCreate
