import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›features-track-layout‹ relationship with nodes that do not exist', async () => {
    const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

    await expect(RacingGame.createFeaturesTrackLayoutRelationship(-42, trackLayout.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingGame.createFeaturesTrackLayoutRelationship(racingGame.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingGame.createFeaturesTrackLayoutRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
