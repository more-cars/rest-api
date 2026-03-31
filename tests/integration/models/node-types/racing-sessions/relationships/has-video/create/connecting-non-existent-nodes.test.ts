import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RacingSession} from "../../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-video‹ relationship with nodes that do not exist', async () => {
    const racingSession = await seedNode(DbNodeType.RacingSession)
    const video = await seedNode(DbNodeType.Video)

    await expect(RacingSession.createHasVideoRelationship(-42, video.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingSession.createHasVideoRelationship(racingSession.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingSession.createHasVideoRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
