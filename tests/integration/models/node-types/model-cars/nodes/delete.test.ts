import {describe, expect, test} from 'vitest'
import {ModelCar} from "../../../../../../src/models/node-types/model-cars/ModelCar"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Deleting a MODEL CAR', () => {
    test('that does not exist', async () => {
        await expect(ModelCar.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(DbNodeType.ModelCar)
        await expect(ModelCar.delete(node.properties.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
