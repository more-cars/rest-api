import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {TrackLayout} from "../../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›is-featured-in-racing-game‹ relationship again', async () => {
    const trackLayout = await seedNode(DbNodeType.TrackLayout)
    const racingGame = await seedNode(DbNodeType.RacingGame)

    await expect(TrackLayout.createIsFeaturedInRacingGameRelationship(trackLayout.properties.id, racingGame.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(TrackLayout.createIsFeaturedInRacingGameRelationship(trackLayout.properties.id, racingGame.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
