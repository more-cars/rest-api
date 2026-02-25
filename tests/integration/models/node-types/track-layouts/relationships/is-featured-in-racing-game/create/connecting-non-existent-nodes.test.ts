import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {TrackLayout} from "../../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›is-featured-in-racing-game‹ relationship with nodes that do not exist', async () => {
    const trackLayout = await seedNode(DbNodeType.TrackLayout)
    const racingGame = await seedNode(DbNodeType.RacingGame)

    await expect(TrackLayout.createIsFeaturedInRacingGameRelationship(-42, racingGame.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(TrackLayout.createIsFeaturedInRacingGameRelationship(trackLayout.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(TrackLayout.createIsFeaturedInRacingGameRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
