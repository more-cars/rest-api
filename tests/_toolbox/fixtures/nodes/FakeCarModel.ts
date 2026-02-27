import {faker} from "@faker-js/faker"
import type {InputCarModelCreate} from "../../../../src/db/node-types/car-models/types/InputCarModelCreate"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {CarModelNode} from "../../../../src/models/node-types/car-models/types/CarModelNode"

export const FakeCarModel = {
    dbInput: {
        name: faker.vehicle.model(),
        built_from: faker.number.int({min: 1000, max: 3000}),
        built_to: faker.number.int({min: 1000, max: 3000}),
        generation: faker.number.int({min: 1, max: 10}),
        internal_code: faker.vehicle.vrm(),
        total_production: faker.number.int({min: 100, max: 10000000}),
    } as InputCarModelCreate,

    dbInputMinimal: {
        name: faker.vehicle.model(),
    } as InputCarModelCreate,

    modelOutput: {
        node_type: ModelNodeType.CarModel,
        attributes: {
            id: faker.number.int({min: 12_000_000, max: 20_000_000}),
            name: faker.vehicle.model(),
            built_from: faker.number.int({min: 1000, max: 3000}),
            built_to: faker.number.int({min: 1000, max: 3000}),
            generation: faker.number.int({min: 1, max: 10}),
            internal_code: faker.vehicle.vrm(),
            total_production: faker.number.int({min: 100, max: 10000000}),
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString(),
        },
    } satisfies CarModelNode,
}
