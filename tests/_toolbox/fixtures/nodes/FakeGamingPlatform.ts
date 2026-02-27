import {faker} from "@faker-js/faker"
import type {InputGamingPlatformCreate} from "../../../../src/db/node-types/gaming-platforms/types/InputGamingPlatformCreate"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {GamingPlatformNode} from "../../../../src/models/node-types/gaming-platforms/types/GamingPlatformNode"

export const FakeGamingPlatform = {
    dbInput: {
        name: faker.commerce.product(),
        release_year: faker.number.int({min: 1000, max: 3000}),
        manufacturer: faker.company.name(),
    } as InputGamingPlatformCreate,

    dbInputMinimal: {
        name: faker.commerce.product(),
    } as InputGamingPlatformCreate,

    modelOutput: {
        node_type: ModelNodeType.GamingPlatform,
        attributes: {
            id: faker.number.int({min: 12_000_000, max: 20_000_000}),
            name: faker.commerce.product(),
            release_year: faker.number.int({min: 1000, max: 3000}),
            manufacturer: faker.company.name(),
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString(),
        },
    } satisfies GamingPlatformNode,
}
