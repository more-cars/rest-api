import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {TrackLayout} from "../../../../../../../src/models/track-layouts/TrackLayout"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›is-featured-in-racing-game‹ relationship again', async () => {
    const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
    const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)

    await expect(TrackLayout.createIsFeaturedInRacingGameRelationship(trackLayout.id, racingGame.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(TrackLayout.createIsFeaturedInRacingGameRelationship(trackLayout.id, racingGame.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
