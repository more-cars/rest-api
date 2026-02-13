import {faker} from "@faker-js/faker"
import type {InputGamingPlatformCreate} from "../../../../src/db/nodes/gaming-platforms/types/InputGamingPlatformCreate"
import type {GamingPlatformNode} from "../../../../src/models/gaming-platforms/types/GamingPlatformNode"

export const FakeGamingPlatform = {
    dbInput() {
        return {
            name: faker.commerce.product(),
            release_year: faker.number.int({min: 1000, max: 3000}),
            manufacturer: faker.company.name(),
        } as InputGamingPlatformCreate
    },

    dbInputMinimal() {
        return {
            name: faker.commerce.product(),
        } as InputGamingPlatformCreate
    },

    modelOutput() {
        return {
            id: faker.number.int({min: 12_000_000, max: 20_000_000}),
            name: faker.commerce.product(),
            release_year: faker.number.int({min: 1000, max: 3000}),
            manufacturer: faker.company.name(),
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString(),
        } as GamingPlatformNode
    },
}
