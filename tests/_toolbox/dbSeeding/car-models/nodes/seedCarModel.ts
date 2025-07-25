import {createNode} from "../../../../../src/db/nodes/car-models/createNode"
import FakeCarModel from "../../../fixtures/nodes/FakeCarModel"

/**
 * Creates a randomized car model in the database.
 *
 * This relies on the functionality provided by the db layer.
 * If something breaks there the seeder might break, too.
 * But for now the risk does not outweigh the effort to implement the functionality twice.
 */
export async function seedCarModel() {
    return await createNode(FakeCarModel)
}
