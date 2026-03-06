import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Rating} from "../../../../../../../../src/models/node-types/ratings/Rating"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›for-car-model-variant‹ relationship with nodes that do not exist', async () => {
    const rating = await seedNode(DbNodeType.Rating)
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

    await expect(Rating.createForCarModelVariantRelationship(-42, carModelVariant.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Rating.createForCarModelVariantRelationship(rating.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Rating.createForCarModelVariantRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
