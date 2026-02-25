import {describe, expect, test} from 'vitest'
import {CarModelVariant} from "../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Fetching a CAR MODEL VARIANT', () => {
    test('which does not exist', async () => {
        await expect(CarModelVariant.findById(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('which exists', async () => {
        const expectedCarModelVariant = await seedNode(DbNodeType.CarModelVariant)
        const actualCarModelVariant = await CarModelVariant.findById(expectedCarModelVariant.properties.id)

        expect(actualCarModelVariant.attributes)
            .toEqual(expectedCarModelVariant.properties)
    })
})
