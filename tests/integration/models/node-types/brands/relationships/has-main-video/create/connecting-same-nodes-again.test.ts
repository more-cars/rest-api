import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Brand} from "../../../../../../../../src/models/node-types/brands/Brand"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-main-video‹ relationship again', async () => {
    const brand = await seedNode(DbNodeType.Brand)
    const video = await seedNode(DbNodeType.Video)

    await expect(Brand.createHasMainVideoRelationship(brand.properties.id, video.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Brand.createHasMainVideoRelationship(brand.properties.id, video.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
