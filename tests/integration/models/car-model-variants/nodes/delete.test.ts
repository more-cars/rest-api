import {describe, expect, test} from 'vitest'
import {CarModelVariant} from "../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Deleting a CAR MODEL VARIANT', () => {
    test('that does not exist', async () => {
        await expect(CarModelVariant.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(ControllerNodeType.CarModelVariant)
        await expect(CarModelVariant.delete(node.properties.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
