import {describe, expect, test} from 'vitest'
import {CarModel} from "../../../../../../src/models/node-types/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Deleting a Car Model', () => {
    test('that does not exist', async () => {
        await expect(CarModel.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(DbNodeType.CarModel)
        await expect(CarModel.delete(node.properties.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
