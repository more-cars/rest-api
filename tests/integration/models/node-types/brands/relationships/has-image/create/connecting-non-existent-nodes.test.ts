import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Brand} from "../../../../../../../../src/models/node-types/brands/Brand"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-image‹ relationship with nodes that do not exist', async () => {
    const brand = await seedNode(DbNodeType.Brand)
    const image = await seedNode(DbNodeType.Image)

    await expect(Brand.createHasImageRelationship(-42, image.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Brand.createHasImageRelationship(brand.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Brand.createHasImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
