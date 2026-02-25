import {describe, expect, test} from 'vitest'
import {CarModel} from "../../../../../../src/models/node-types/car-models/CarModel"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Fetching a CAR MODEL', () => {
    test('which does not exist', async () => {
        await expect(CarModel.findById(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('which exists', async () => {
        const expectedCarModel = await seedNode(DbNodeType.CarModel)
        const actualCarModel = await CarModel.findById(expectedCarModel.properties.id)

        expect(actualCarModel.attributes)
            .toEqual(expectedCarModel.properties)
    })
})
