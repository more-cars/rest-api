import {faker} from "@faker-js/faker"
import {createCarModelNode} from "../../src/db/createCarModelNode"

/**
 * Creates a randomized car model in the database.
 *
 * This relies on the functionality provided by the db layer.
 * If something breaks there the seeder might break, too.
 * But for now the risk does not outweigh the effort to implement the functionality twice.
 */
export async function seedCarModel() {
    const carModelData = {
        name: faker.vehicle.model(),
        built_from: faker.number.int({min: 1000, max: 3000}),
        built_to: faker.number.int({min: 1000, max: 3000}),
        generation: faker.number.int({min: 1, max: 10}),
        internal_code: faker.commerce.isbn(),
        total_production: faker.number.int({min: 100, max: 10000000}),
    }

    return await createCarModelNode(carModelData)
}
