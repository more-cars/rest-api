import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A RACING GAME can have multiple ›features-track-layout‹ relationships', async () => {
    const racingGame = await seedNode(ControllerNodeType.RACING_GAME)
    const trackLayoutsAmount = 3
    const trackLayouts = await seedNodes(ControllerNodeType.TRACK_LAYOUT, trackLayoutsAmount)

    for (const trackLayout of trackLayouts) {
        await RacingGame.createFeaturesTrackLayoutRelationship(racingGame.id, trackLayout.id)
    }

    const relationships = await getRelationshipCollection(
        racingGame.id,
        RelationshipType.RacingGameFeaturesTrackLayout,
        DbNodeType.TrackLayout,
    )

    expect(relationships.length)
        .toBe(trackLayoutsAmount)
})
