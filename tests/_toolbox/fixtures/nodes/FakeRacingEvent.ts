import {faker} from "@faker-js/faker"
import type {InputRacingEventCreate} from "../../../../src/db/node-types/racing-events/types/InputRacingEventCreate"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {RacingEventNode} from "../../../../src/models/node-types/racing-events/types/RacingEventNode"

export const FakeRacingEvent = {
    dbInput: {
        name: 'F1 GP ' + faker.location.country(),
        round: faker.number.int({min: 1000, max: 3000}),
        date_from: faker.date.past().toLocaleString(),
        date_to: faker.date.past().toLocaleString(),
    } as InputRacingEventCreate,

    dbInputMinimal: {
        name: 'F1 GP ' + faker.location.country(),
    } as InputRacingEventCreate,

    modelOutput: {
        node_type: ModelNodeType.RacingEvent,
        attributes: {
            id: faker.number.int({min: 12_000_000, max: 20_000_000}),
            name: 'F1 GP ' + faker.location.country(),
            round: faker.number.int({min: 1000, max: 3000}),
            date_from: faker.date.past().toLocaleString(),
            date_to: faker.date.past().toLocaleString(),
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString(),
        },
    } satisfies RacingEventNode,
}
