import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {GamingPlatform} from "../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-image‹ relationship with nodes that do not exist', async () => {
    const gamingPlatform = await seedNode(DbNodeType.GamingPlatform)
    const image = await seedNode(DbNodeType.Image)

    await expect(GamingPlatform.createHasImageRelationship(-42, image.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(GamingPlatform.createHasImageRelationship(gamingPlatform.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(GamingPlatform.createHasImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
