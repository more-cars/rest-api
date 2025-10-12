import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

test('Both nodes exist, but have no ›has-car-model‹ relationship', async () => {
    const brand = await seedBrand()
    const carModel = await seedCarModel()

    await expect(Brand.getSpecificHasCarModelRelationship(brand.id, carModel.id))
        .rejects
        .toThrow(RelationshipNotFoundError)
})
