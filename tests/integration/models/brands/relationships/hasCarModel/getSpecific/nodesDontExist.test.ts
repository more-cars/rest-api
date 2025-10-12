import {describe, expect, test} from 'vitest'
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting a specific ›has-car-model‹ relationship', () => {
    test('with a BRAND that does not exist', async () => {
        const carModel = await seedCarModel()

        await expect(Brand.getSpecificHasCarModelRelationship(-42, carModel.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('with a CAR MODEL that does not exist', async () => {
        const brand = await seedBrand()

        await expect(Brand.getSpecificHasCarModelRelationship(brand.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('with a BRAND and CAR MODEL that do not exist', async () => {
        await expect(Brand.getSpecificHasCarModelRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
