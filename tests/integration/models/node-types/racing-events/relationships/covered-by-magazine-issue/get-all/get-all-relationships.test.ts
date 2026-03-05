import {describe, expect, test} from 'vitest'
import {RacingEvent} from "../../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›covered-by-magazine-issue‹ relationships', () => {
    test('node and relationships exist', async () => {
        const racingEvent = await seedNode(DbNodeType.RacingEvent)
        await seedRelationshipForStartNode(racingEvent.properties.id, DbNodeType.MagazineIssue, RelationshipType.RacingEventCoveredByMagazineIssue)
        await seedRelationshipForStartNode(racingEvent.properties.id, DbNodeType.MagazineIssue, RelationshipType.RacingEventCoveredByMagazineIssue)

        const relationships = await RacingEvent.getAllCoveredByMagazineIssueRelationships(racingEvent.properties.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const racingEvent = await seedNode(DbNodeType.RacingEvent)

        const relationships = await RacingEvent.getAllCoveredByMagazineIssueRelationships(racingEvent.properties.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(RacingEvent.getAllCoveredByMagazineIssueRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
