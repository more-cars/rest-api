import {describe, expect, test} from 'vitest'
import {RacingEvent} from "../../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›covered-by-magazine-issue‹ relationship', () => {
    test('RACING EVENT node does not exist', async () => {
        const racingEvent = await seedNode(DbNodeType.RacingEvent)

        await expect(RacingEvent.deleteCoveredByMagazineIssueRelationship(racingEvent.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('MAGAZINE ISSUE node does not exist', async () => {
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

        await expect(RacingEvent.deleteCoveredByMagazineIssueRelationship(-42, magazineIssue.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING EVENT node and MAGAZINE ISSUE node do not exist', async () => {
        await expect(RacingEvent.deleteCoveredByMagazineIssueRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›covered-by-magazine-issue‹ relationship', async () => {
        const racingEvent = await seedNode(DbNodeType.RacingEvent)
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

        await expect(RacingEvent.deleteCoveredByMagazineIssueRelationship(racingEvent.properties.id, magazineIssue.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›covered-by-magazine-issue‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.RacingEvent, DbNodeType.MagazineIssue, RelationshipType.RacingEventCoveredByMagazineIssue)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingEventCoveredByMagazineIssue,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RacingEvent.deleteCoveredByMagazineIssueRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingEventCoveredByMagazineIssue,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
