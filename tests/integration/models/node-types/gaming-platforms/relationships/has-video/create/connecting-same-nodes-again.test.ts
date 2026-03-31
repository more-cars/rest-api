import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {GamingPlatform} from "../../../../../../../../src/models/node-types/gaming-platforms/GamingPlatform"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-video‹ relationship again', async () => {
    const gamingPlatform = await seedNode(DbNodeType.GamingPlatform)
    const video = await seedNode(DbNodeType.Video)

    await expect(GamingPlatform.createHasVideoRelationship(gamingPlatform.properties.id, video.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(GamingPlatform.createHasVideoRelationship(gamingPlatform.properties.id, video.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
