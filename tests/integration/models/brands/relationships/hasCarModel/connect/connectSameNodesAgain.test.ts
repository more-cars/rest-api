import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Expecting the relationship ID to not change when creating the same ›has-car-model‹ relationship again', async () => {
    const brand = await seedBrand()
    const carModel = await seedCarModel()

    await expect(Brand.createHasCarModelRelationship(brand.id, carModel.id))
        .resolves
        .not.toThrow(NodeNotFoundError)

    await expect(Brand.createHasCarModelRelationship(brand.id, carModel.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
