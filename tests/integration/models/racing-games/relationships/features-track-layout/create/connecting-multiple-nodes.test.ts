import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingGame} from "../../../../../../../src/models/racing-games/RacingGame"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

test('A RACING GAME can have multiple ›features-track-layout‹ relationships', async () => {
    const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)
    const trackLayoutsAmount = 3
    const trackLayouts = await seedNodes(NodeTypeEnum.TRACK_LAYOUT, trackLayoutsAmount)

    for (const trackLayout of trackLayouts) {
        await RacingGame.createFeaturesTrackLayoutRelationship(racingGame.id, trackLayout.id)
    }

    const relationships = await getRelationshipCollection(
        racingGame.id,
        DbRelationship.RacingGameFeaturesTrackLayout,
        NodeTypeLabel.TrackLayout,
    )

    expect(relationships.length)
        .toBe(trackLayoutsAmount)
})
