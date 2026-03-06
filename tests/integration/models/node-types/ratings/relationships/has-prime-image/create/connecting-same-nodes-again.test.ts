import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Rating} from "../../../../../../../../src/models/node-types/ratings/Rating"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-prime-image‹ relationship again', async () => {
    const rating = await seedNode(DbNodeType.Rating)
    const image = await seedNode(DbNodeType.Image)

    await expect(Rating.createHasPrimeImageRelationship(rating.properties.id, image.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Rating.createHasPrimeImageRelationship(rating.properties.id, image.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
