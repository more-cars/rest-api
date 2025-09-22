import {faker} from "@faker-js/faker"
import type {InputBrandCreate} from "../../../../src/db/nodes/brands/types/InputBrandCreate"

export default {
    name: faker.vehicle.manufacturer(),
    full_name: faker.vehicle.manufacturer(),
    founded: faker.number.int({min: 1000, max: 3000}),
    defunct: faker.number.int({min: 1000, max: 3000}),
    wmi: faker.vehicle.vrm(),
    hsn: faker.vehicle.vrm(),
} as InputBrandCreate
