import {describe, expect, test} from 'vitest'
import {ModelCarBrand} from "../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Deleting a MODEL CAR BRAND', () => {
    test('that does not exist', async () => {
        await expect(ModelCarBrand.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(DbNodeType.ModelCarBrand)
        await expect(ModelCarBrand.delete(node.properties.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
