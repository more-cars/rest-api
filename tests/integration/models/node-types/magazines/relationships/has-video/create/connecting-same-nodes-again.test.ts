import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Magazine} from "../../../../../../../../src/models/node-types/magazines/Magazine"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-video‹ relationship again', async () => {
    const magazine = await seedNode(DbNodeType.Magazine)
    const video = await seedNode(DbNodeType.Video)

    await expect(Magazine.createHasVideoRelationship(magazine.properties.id, video.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Magazine.createHasVideoRelationship(magazine.properties.id, video.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
