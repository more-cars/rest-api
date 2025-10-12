import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

test('Both nodes exist, but have no ›has-prime-image‹ relationship', async () => {
    const carModel = await seedNode('car model')
    const image = await seedNode('image')

    await expect(CarModel.getSpecificHasPrimeImageRelationship(carModel.id, image.id))
        .rejects
        .toThrow(RelationshipNotFoundError)
})
