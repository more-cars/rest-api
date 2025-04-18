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
    }

    return await createCarModelNode(carModelData)
}
