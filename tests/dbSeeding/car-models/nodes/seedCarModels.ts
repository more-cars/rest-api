import {seedCarModel} from "./seedCarModel"
import {CarModelNode} from "../../../../src/types/car-models/CarModelNode"

/**
 * Creates the requested amount of car models in the database.
 *
 * This relies on the functionality provided by the db layer.
 * If something breaks there the seeder might break, too.
 * But for now the risk does not outweigh the effort to implement the functionality twice.
 */
export async function seedCarModels(amount: number) {
    const carModels: Array<CarModelNode> = []

    for (let i = 0; i < amount; i++) {
        carModels.push(await seedCarModel())
    }

    return carModels
}
