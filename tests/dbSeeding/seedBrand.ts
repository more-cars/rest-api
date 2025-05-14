import {createNode} from "../../src/db/brands/createNode"
import FakeBrand from "../fixtures/nodes/FakeBrand"

/**
 * Creates a new brand in the database with random fake data.
 *
 * This relies on the functionality provided by the db layer.
 * If something breaks there the seeder might break, too.
 * But for now the risk does not outweigh the effort to implement the functionality twice.
 */
export async function seedBrand() {
    return await createNode(FakeBrand)
}
