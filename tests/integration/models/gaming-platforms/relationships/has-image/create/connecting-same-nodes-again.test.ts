import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {GamingPlatform} from "../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-image‹ relationship again', async () => {
    const gamingPlatform = await seedNode(DbNodeType.GamingPlatform)
    const image = await seedNode(DbNodeType.Image)

    await expect(GamingPlatform.createHasImageRelationship(gamingPlatform.properties.id, image.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(GamingPlatform.createHasImageRelationship(gamingPlatform.properties.id, image.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
