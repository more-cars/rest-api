import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RacingSession} from "../../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-video‹ relationship again', async () => {
    const racingSession = await seedNode(DbNodeType.RacingSession)
    const video = await seedNode(DbNodeType.Video)

    await expect(RacingSession.createHasVideoRelationship(racingSession.properties.id, video.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingSession.createHasVideoRelationship(racingSession.properties.id, video.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
