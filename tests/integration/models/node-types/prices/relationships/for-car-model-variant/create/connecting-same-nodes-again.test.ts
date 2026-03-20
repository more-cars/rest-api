import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Price} from "../../../../../../../../src/models/node-types/prices/Price"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›for-car-model-variant‹ relationship again', async () => {
    const price = await seedNode(DbNodeType.Price)
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

    await expect(Price.createForCarModelVariantRelationship(price.properties.id, carModelVariant.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Price.createForCarModelVariantRelationship(price.properties.id, carModelVariant.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
