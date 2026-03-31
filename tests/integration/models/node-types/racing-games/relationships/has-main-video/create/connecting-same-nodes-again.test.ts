import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RacingGame} from "../../../../../../../../src/models/node-types/racing-games/RacingGame"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-main-video‹ relationship again', async () => {
    const racingGame = await seedNode(DbNodeType.RacingGame)
    const video = await seedNode(DbNodeType.Video)

    await expect(RacingGame.createHasMainVideoRelationship(racingGame.properties.id, video.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingGame.createHasMainVideoRelationship(racingGame.properties.id, video.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
