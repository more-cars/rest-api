import {createNode} from "../../src/db/images/createNode"
import FakeImageFull from "../fixtures/nodes/FakeImageFull"

/**
 * Creates a new image in the database with random fake data.
 *
 * This relies on the functionality provided by the db layer.
 * If something breaks there the seeder might break, too.
 * But for now the risk does not outweigh the effort to implement the functionality twice.
 */
export async function seedImage() {
    return await createNode(FakeImageFull)
}
