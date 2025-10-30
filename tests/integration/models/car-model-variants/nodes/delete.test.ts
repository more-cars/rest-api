import {describe, expect, test} from 'vitest'
import {CarModelVariant} from "../../../../../src/models/car-model-variants/CarModelVariant"
import {seedCarModelVariant} from "../../../../_toolbox/dbSeeding/car-model-variants/nodes/seedCarModelVariant"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

describe('Deleting a CAR MODEL VARIANT', () => {
    test('that does not exist', async () => {
        await expect(CarModelVariant.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedCarModelVariant()
        await expect(CarModelVariant.delete(node.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
