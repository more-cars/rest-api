import {describe, expect, test} from 'vitest'
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›was-used-by-racing-event‹ relationships', () => {
    test('node and relationships exist', async () => {
        const trackLayout = await seedNode(DbNodeType.TrackLayout)
        await seedRelationshipForStartNode(trackLayout.properties.id, DbNodeType.RacingEvent, RelationshipType.TrackLayoutWasUsedByRacingEvent)
        await seedRelationshipForStartNode(trackLayout.properties.id, DbNodeType.RacingEvent, RelationshipType.TrackLayoutWasUsedByRacingEvent)

        const relationships = await TrackLayout.getAllWasUsedByRacingEventRelationships(trackLayout.properties.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const trackLayout = await seedNode(DbNodeType.TrackLayout)

        const relationships = await TrackLayout.getAllWasUsedByRacingEventRelationships(trackLayout.properties.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(TrackLayout.getAllWasUsedByRacingEventRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
