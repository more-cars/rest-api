import {BrandNode} from "../../../../../src/db/nodes/brands/types/BrandNode"
import {seedBrand} from "./seedBrand"

/**
 * Creates the requested amount of brands in the database.
 *
 * This relies on the functionality provided by the db layer.
 * If something breaks there the seeder might break, too.
 * But for now the risk does not outweigh the effort to implement the functionality twice.
 */
export async function seedBrands(amount: number) {
    const brands: Array<BrandNode> = []

    for (let i = 0; i < amount; i++) {
        brands.push(await seedBrand())
    }

    return brands
}
