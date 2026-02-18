import {faker} from "@faker-js/faker"
import type {InputRacingGameCreate} from "../../../../src/db/nodes/racing-games/types/InputRacingGameCreate"
import type {RacingGameNode} from "../../../../src/models/node-types/racing-games/types/RacingGameNode"

export const FakeRacingGame = {
    dbInput() {
        return {
            name: faker.commerce.productName(),
            release_year: faker.number.int({min: 1000, max: 3000}),
            developer: faker.company.name(),
            publisher: faker.company.name(),
        } as InputRacingGameCreate
    },

    dbInputMinimal() {
        return {
            name: faker.commerce.productName(),
        } as InputRacingGameCreate
    },

    modelOutput() {
        return {
            id: faker.number.int({min: 12_000_000, max: 20_000_000}),
            name: faker.commerce.productName(),
            release_year: faker.number.int({min: 1000, max: 3000}),
            developer: faker.company.name(),
            publisher: faker.company.name(),
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString(),
        } as RacingGameNode
    },
}
