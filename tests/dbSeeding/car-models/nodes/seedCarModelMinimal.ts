import {faker} from "@faker-js/faker"
import {createNode} from "../../../../src/db/car-models/createNode"

/**
 * Creates a randomized car model in the database, where only the mandatory fields are filled out.
 *
 * This relies on the functionality provided by the db layer.
 * If something breaks there the seeder might break, too.
 * But for now the risk does not outweigh the effort to implement the functionality twice.
 */
export async function seedCarModelMinimal() {
    const carModelData = {
        name: faker.vehicle.model()
    }

    return await createNode(carModelData)
}
