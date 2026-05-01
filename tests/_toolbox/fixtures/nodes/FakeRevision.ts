import {faker} from "@faker-js/faker"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {InputRevisionCreate} from "../../../../src/db/node-types/revisions/types/InputRevisionCreate"
import type {RevisionNode} from "../../../../src/models/node-types/revisions/types/RevisionNode"

export const FakeRevision = {
    dbInput: {
        node_type: 'CarModel',
        node_id: faker.number.int({min: 12_000_000, max: 20_000_000}),
        node_created_at: faker.date.past().toISOString(),
        node_updated_at: faker.date.past().toISOString(),
        name: faker.vehicle.model(),
        built_from: faker.number.int({min: 1000, max: 3000}),
        built_to: faker.number.int({min: 1000, max: 3000}),
        generation: faker.number.int({min: 1, max: 10}),
        internal_code: faker.vehicle.vrm(),
        total_production: faker.number.int({min: 100, max: 10000000}),
    } as InputRevisionCreate,

    dbInputMinimal: {
        node_type: 'CarModel',
        node_id: faker.number.int({min: 12_000_000, max: 20_000_000}),
        node_created_at: faker.date.past().toISOString(),
        node_updated_at: faker.date.past().toISOString(),
        name: faker.vehicle.model(),
    } as InputRevisionCreate,

    modelOutput: {
        node_type: ModelNodeType.Revision,
        attributes: {
            id: faker.number.int({min: 12_000_000, max: 20_000_000}),
            node_type: 'CarModel',
            node_id: faker.number.int({min: 12_000_000, max: 20_000_000}),
            node_created_at: faker.date.past().toISOString(),
            node_updated_at: faker.date.past().toISOString(),
            name: faker.vehicle.model(),
            built_from: faker.number.int({min: 1000, max: 3000}),
            built_to: faker.number.int({min: 1000, max: 3000}),
            generation: faker.number.int({min: 1, max: 10}),
            internal_code: faker.vehicle.vrm(),
            total_production: faker.number.int({min: 100, max: 10000000}),
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString(),
        },
    } satisfies RevisionNode
}
