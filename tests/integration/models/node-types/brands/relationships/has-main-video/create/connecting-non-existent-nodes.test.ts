import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Brand} from "../../../../../../../../src/models/node-types/brands/Brand"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-main-video‹ relationship with nodes that do not exist', async () => {
    const brand = await seedNode(DbNodeType.Brand)
    const video = await seedNode(DbNodeType.Video)

    await expect(Brand.createHasMainVideoRelationship(-42, video.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Brand.createHasMainVideoRelationship(brand.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Brand.createHasMainVideoRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
