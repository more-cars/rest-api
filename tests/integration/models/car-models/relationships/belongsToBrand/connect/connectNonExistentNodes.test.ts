import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›belongs-to-brand‹ relationship with nodes that do not exist', async () => {
    const carModel = await seedCarModel()
    const brand = await seedBrand()

    await expect(CarModel.createBelongsToBrandRelationship(-42, brand.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModel.createBelongsToBrandRelationship(carModel.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(CarModel.createBelongsToBrandRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
