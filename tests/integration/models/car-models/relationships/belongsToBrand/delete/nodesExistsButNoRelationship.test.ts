import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

test('Both nodes exist, but have no relationship', async () => {
    const carModel = await seedNode('car model')
    const brand = await seedNode('brand')

    await expect(CarModel.deleteBelongsToBrandRelationship(carModel.id, brand.id))
        .rejects
        .toThrow(RelationshipNotFoundError)
})
