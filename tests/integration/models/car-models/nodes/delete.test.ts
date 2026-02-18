import {describe, expect, test} from 'vitest'
import {CarModel} from "../../../../../src/models/node-types/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Deleting a Car Model', () => {
    test('that does not exist', async () => {
        await expect(CarModel.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(NodeTypeEnum.CAR_MODEL)
        await expect(CarModel.delete(node.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
