import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›belongs-to-brand‹ relationship again', async () => {
    const carModel = await seedCarModel()
    const brand = await seedBrand()

    await expect(CarModel.createBelongsToBrandRelationship(carModel.id, brand.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(CarModel.createBelongsToBrandRelationship(carModel.id, brand.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
