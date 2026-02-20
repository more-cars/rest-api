import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

describe('Requesting all ›was-used-by-racing-event‹ relationships', () => {
    test('node and relationships exist', async () => {
        const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)
        await seedRelationshipForStartNode(trackLayout.id, ControllerNodeType.RACING_EVENT, RelationshipType.TrackLayoutWasUsedByRacingEvent)
        await seedRelationshipForStartNode(trackLayout.id, ControllerNodeType.RACING_EVENT, RelationshipType.TrackLayoutWasUsedByRacingEvent)

        const relationships = await getRelationshipCollection(
            trackLayout.id,
            RelationshipType.TrackLayoutWasUsedByRacingEvent,
            NodeTypeLabel.RacingEvent,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)

        const relationships = await getRelationshipCollection(
            trackLayout.id,
            RelationshipType.TrackLayoutWasUsedByRacingEvent,
            NodeTypeLabel.RacingEvent,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.TrackLayoutWasUsedByRacingEvent,
            NodeTypeLabel.RacingEvent,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
