import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

describe('Requesting all ›is-featured-in-racing-game‹ relationships', () => {
    test('node and relationships exist', async () => {
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
        await seedRelationshipForStartNode(trackLayout.id, NodeTypeEnum.RACING_GAME, DbRelationship.TrackLayoutIsFeaturedInRacingGame)
        await seedRelationshipForStartNode(trackLayout.id, NodeTypeEnum.RACING_GAME, DbRelationship.TrackLayoutIsFeaturedInRacingGame)

        const relationships = await getRelationshipCollection(
            trackLayout.id,
            DbRelationship.TrackLayoutIsFeaturedInRacingGame,
            NodeTypeLabel.RacingGame,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

        const relationships = await getRelationshipCollection(
            trackLayout.id,
            DbRelationship.TrackLayoutIsFeaturedInRacingGame,
            NodeTypeLabel.RacingGame,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            DbRelationship.TrackLayoutIsFeaturedInRacingGame,
            NodeTypeLabel.RacingGame,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
