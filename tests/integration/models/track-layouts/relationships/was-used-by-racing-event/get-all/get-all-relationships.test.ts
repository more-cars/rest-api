import {describe, expect, test} from 'vitest'
import {TrackLayout} from "../../../../../../../src/models/track-layouts/TrackLayout"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›was-used-by-racing-event‹ relationships', () => {
    test('node and relationships exist', async () => {
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
        await seedRelationshipForStartNode(trackLayout.id, NodeTypeEnum.RACING_EVENT, RelationshipType.TrackLayoutWasUsedByRacingEvent)
        await seedRelationshipForStartNode(trackLayout.id, NodeTypeEnum.RACING_EVENT, RelationshipType.TrackLayoutWasUsedByRacingEvent)

        const relationships = await TrackLayout.getAllWasUsedByRacingEventRelationships(trackLayout.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

        const relationships = await TrackLayout.getAllWasUsedByRacingEventRelationships(trackLayout.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(TrackLayout.getAllWasUsedByRacingEventRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
