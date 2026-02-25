import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RacingGame} from "../../../../../../../../src/models/node-types/racing-games/RacingGame"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›features-track-layout‹ relationship again', async () => {
    const racingGame = await seedNode(DbNodeType.RacingGame)
    const trackLayout = await seedNode(DbNodeType.TrackLayout)

    await expect(RacingGame.createFeaturesTrackLayoutRelationship(racingGame.properties.id, trackLayout.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingGame.createFeaturesTrackLayoutRelationship(racingGame.properties.id, trackLayout.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
