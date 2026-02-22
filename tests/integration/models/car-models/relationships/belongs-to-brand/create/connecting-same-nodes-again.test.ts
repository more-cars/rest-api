import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›belongs-to-brand‹ relationship again', async () => {
    const carModel = await seedNode(DbNodeType.CarModel)
    const brand = await seedNode(DbNodeType.Brand)

    await expect(CarModel.createBelongsToBrandRelationship(carModel.properties.id, brand.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(CarModel.createBelongsToBrandRelationship(carModel.properties.id, brand.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
