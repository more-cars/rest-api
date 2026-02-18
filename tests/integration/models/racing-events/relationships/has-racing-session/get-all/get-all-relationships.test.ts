import {describe, expect, test} from 'vitest'
import {RacingEvent} from "../../../../../../../src/models/racing-events/RacingEvent"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-racing-session‹ relationships', () => {
    test('node and relationships exist', async () => {
        const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
        await seedRelationshipForStartNode(racingEvent.id, NodeTypeEnum.RACING_SESSION, RelationshipType.RacingEventHasRacingSession)
        await seedRelationshipForStartNode(racingEvent.id, NodeTypeEnum.RACING_SESSION, RelationshipType.RacingEventHasRacingSession)

        const relationships = await RacingEvent.getAllHasRacingSessionRelationships(racingEvent.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

        const relationships = await RacingEvent.getAllHasRacingSessionRelationships(racingEvent.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(RacingEvent.getAllHasRacingSessionRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
