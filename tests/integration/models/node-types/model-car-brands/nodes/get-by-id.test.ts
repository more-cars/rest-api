import {describe, expect, test} from 'vitest'
import {ModelCarBrand} from "../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Fetching a MODEL CAR BRAND', () => {
    test('which does not exist', async () => {
        await expect(ModelCarBrand.findById(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('which exists', async () => {
        const expectedModelCarBrand = await seedNode(DbNodeType.ModelCarBrand)
        const actualModelCarBrand = await ModelCarBrand.findById(expectedModelCarBrand.properties.id)

        expect(actualModelCarBrand.attributes)
            .toEqual(expectedModelCarBrand.properties)
    })
})
