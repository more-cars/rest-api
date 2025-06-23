import {ImageNode} from "../../../../src/db/nodes/images/types/ImageNode"
import {seedImage} from "./seedImage"

/**
 * Creates the requested amount of images in the database.
 *
 * This relies on the functionality provided by the db layer.
 * If something breaks there the seeder might break, too.
 * But for now the risk does not outweigh the effort to implement the functionality twice.
 */
export async function seedImages(amount: number) {
    const images: Array<ImageNode> = []

    for (let i = 0; i < amount; i++) {
        images.push(await seedImage())
    }

    return images
}
