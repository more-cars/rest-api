import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Expecting an error when any of the nodes does not exist', async () => {
    const brand = await seedBrand()
    const carModel = await seedCarModel()

    await expect(Brand.createHasCarModelRelationship(-42, carModel.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Brand.createHasCarModelRelationship(brand.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Brand.createHasCarModelRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
