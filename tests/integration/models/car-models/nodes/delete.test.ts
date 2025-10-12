import {describe, expect, test} from 'vitest'
import {CarModel} from "../../../../../src/models/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {seedCarModel} from "../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"

describe('Deleting a Car Model', () => {
    test('that does not exist', async () => {
        await expect(CarModel.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedCarModel()
        await expect(CarModel.delete(node.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
