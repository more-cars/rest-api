import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Rating} from "../../../../../../../../src/models/node-types/ratings/Rating"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-image‹ relationship with nodes that do not exist', async () => {
    const rating = await seedNode(DbNodeType.Rating)
    const image = await seedNode(DbNodeType.Image)

    await expect(Rating.createHasImageRelationship(-42, image.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Rating.createHasImageRelationship(rating.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Rating.createHasImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
