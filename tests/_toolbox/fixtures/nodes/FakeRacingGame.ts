import {faker} from "@faker-js/faker"
import type {InputRacingGameCreate} from "../../../../src/db/node-types/racing-games/types/InputRacingGameCreate"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {RacingGameNode} from "../../../../src/models/node-types/racing-games/types/RacingGameNode"

export const FakeRacingGame = {
    dbInput: {
        name: faker.commerce.productName(),
        release_year: faker.number.int({min: 1000, max: 3000}),
        developer: faker.company.name(),
        publisher: faker.company.name(),
    } as InputRacingGameCreate,

    dbInputMinimal: {
        name: faker.commerce.productName(),
    } as InputRacingGameCreate,

    modelOutput: {
        node_type: ModelNodeType.RacingGame,
        attributes: {
            id: faker.number.int({min: 12_000_000, max: 20_000_000}),
            name: faker.commerce.productName(),
            release_year: faker.number.int({min: 1000, max: 3000}),
            developer: faker.company.name(),
            publisher: faker.company.name(),
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString(),
        },
    } satisfies RacingGameNode,
}
