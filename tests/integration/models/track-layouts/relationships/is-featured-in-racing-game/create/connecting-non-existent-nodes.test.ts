import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›is-featured-in-racing-game‹ relationship with nodes that do not exist', async () => {
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)
    const racingGame = await seedNode(ControllerNodeType.RACING_GAME)

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
