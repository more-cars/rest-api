import {describe, expect, test} from 'vitest'
import {ModelCar} from "../../../../../../src/models/node-types/model-cars/ModelCar"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Fetching a MODEL CAR', () => {
    test('which does not exist', async () => {
        await expect(ModelCar.findById(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('which exists', async () => {
        const expectedModelCar = await seedNode(DbNodeType.ModelCar)
        const actualModelCar = await ModelCar.findById(expectedModelCar.properties.id)

        expect(actualModelCar.attributes)
            .toEqual(expectedModelCar.properties)
    })
})
