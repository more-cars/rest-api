import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Rating} from "../../../../../../../../src/models/node-types/ratings/Rating"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›for-car-model-variant‹ relationship again', async () => {
    const rating = await seedNode(DbNodeType.Rating)
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

    await expect(Rating.createForCarModelVariantRelationship(rating.properties.id, carModelVariant.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Rating.createForCarModelVariantRelationship(rating.properties.id, carModelVariant.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
