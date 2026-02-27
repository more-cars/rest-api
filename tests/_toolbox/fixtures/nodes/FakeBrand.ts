import {faker} from "@faker-js/faker"
import type {InputBrandCreate} from "../../../../src/db/node-types/brands/types/InputBrandCreate"
import {ModelNodeType} from "../../../../src/models/types/ModelNodeType"
import type {BrandNode} from "../../../../src/models/node-types/brands/types/BrandNode"

export const FakeBrand = {
    dbInput: {
        name: faker.vehicle.manufacturer(),
        full_name: faker.vehicle.manufacturer(),
        founded: faker.number.int({min: 1000, max: 3000}),
        defunct: faker.number.int({min: 1000, max: 3000}),
        wmi: faker.vehicle.vrm(),
        hsn: faker.vehicle.vrm(),
    } satisfies InputBrandCreate,

    dbInputMinimal: {
        name: faker.vehicle.manufacturer(),
    } as InputBrandCreate,

    modelOutput: {
        node_type: ModelNodeType.Brand,
        attributes: {
            id: faker.number.int({min: 12_000_000, max: 20_000_000}),
            name: faker.vehicle.manufacturer(),
            full_name: faker.vehicle.manufacturer(),
            founded: faker.number.int({min: 1000, max: 3000}),
            defunct: faker.number.int({min: 1000, max: 3000}),
            wmi: faker.vehicle.vrm(),
            hsn: faker.vehicle.vrm(),
            created_at: faker.date.past().toISOString(),
            updated_at: faker.date.past().toISOString(),
        },
    } satisfies BrandNode,
}
