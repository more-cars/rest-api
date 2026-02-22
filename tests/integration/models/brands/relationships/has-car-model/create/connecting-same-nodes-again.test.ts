import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"

test('Trying to create the same ›has-car-model‹ relationship again', async () => {
    const brand = await seedNode(DbNodeType.Brand)
    const carModel = await seedNode(DbNodeType.CarModel)

    await expect(Brand.createHasCarModelRelationship(brand.properties.id, carModel.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Brand.createHasCarModelRelationship(brand.properties.id, carModel.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
