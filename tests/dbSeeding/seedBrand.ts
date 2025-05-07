import {faker} from "@faker-js/faker"
import {createBrandNode} from "../../src/db/createBrandNode"

/**
 * Creates a new brand in the database with random fake data.
 *
 * This relies on the functionality provided by the db layer.
 * If something breaks there the seeder might break, too.
 * But for now the risk does not outweigh the effort to implement the functionality twice.
 */
export async function seedBrand() {
    const data = {
        name: faker.vehicle.manufacturer(),
        full_name: faker.vehicle.manufacturer(),
        founded: faker.number.int({min: 1000, max: 3000}),
        defunct: faker.number.int({min: 1000, max: 3000}),
        wmi: faker.vehicle.vrm(),
        hsn: faker.vehicle.vrm(),
    }

    return await createBrandNode(data)
}
