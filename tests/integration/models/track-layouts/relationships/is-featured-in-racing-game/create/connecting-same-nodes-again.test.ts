import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›is-featured-in-racing-game‹ relationship again', async () => {
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
    const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)

    await expect(TrackLayout.createIsFeaturedInRacingGameRelationship(trackLayout.id, racingGame.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(TrackLayout.createIsFeaturedInRacingGameRelationship(trackLayout.id, racingGame.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
