import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›is-featured-in-racing-game‹ relationship again', async () => {
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)
    const racingGame = await seedNode(ControllerNodeType.RACING_GAME)

    await expect(TrackLayout.createIsFeaturedInRacingGameRelationship(trackLayout.id, racingGame.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(TrackLayout.createIsFeaturedInRacingGameRelationship(trackLayout.id, racingGame.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
