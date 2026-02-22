import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›features-track-layout‹ relationship with nodes that do not exist', async () => {
    const racingGame = await seedNode(DbNodeType.RacingGame)
    const trackLayout = await seedNode(DbNodeType.TrackLayout)

    await expect(RacingGame.createFeaturesTrackLayoutRelationship(-42, trackLayout.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingGame.createFeaturesTrackLayoutRelationship(racingGame.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingGame.createFeaturesTrackLayoutRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
