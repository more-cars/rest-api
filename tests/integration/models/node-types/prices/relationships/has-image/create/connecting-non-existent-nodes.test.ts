import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Price} from "../../../../../../../../src/models/node-types/prices/Price"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-image‹ relationship with nodes that do not exist', async () => {
    const price = await seedNode(DbNodeType.Price)
    const image = await seedNode(DbNodeType.Image)

    await expect(Price.createHasImageRelationship(-42, image.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Price.createHasImageRelationship(price.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Price.createHasImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
