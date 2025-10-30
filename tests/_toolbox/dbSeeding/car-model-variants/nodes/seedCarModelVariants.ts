import {CarModelVariantNode} from "../../../../../src/db/nodes/car-model-variants/types/CarModelVariantNode"
import {seedCarModelVariant} from "./seedCarModelVariant"

export async function seedCarModelVariants(amount: number) {
    const carModelVariants: CarModelVariantNode[] = []

    for (let i = 0; i < amount; i++) {
        carModelVariants.push(await seedCarModelVariant())
    }

    return carModelVariants
}
