import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {TrackLayout} from "../../../../../../../src/models/track-layouts/TrackLayout"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›is-featured-in-racing-game‹ relationship with nodes that do not exist', async () => {
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
    const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)

    await expect(TrackLayout.createIsFeaturedInRacingGameRelationship(-42, racingGame.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(TrackLayout.createIsFeaturedInRacingGameRelationship(trackLayout.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(TrackLayout.createIsFeaturedInRacingGameRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
