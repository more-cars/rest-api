import {describe, expect, test} from 'vitest'
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›covers-racing-event‹ relationship', () => {
    test('MAGAZINE ISSUE node does not exist', async () => {
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

        await expect(MagazineIssue.deleteCoversRacingEventRelationship(magazineIssue.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING EVENT node does not exist', async () => {
        const racingEvent = await seedNode(DbNodeType.RacingEvent)

        await expect(MagazineIssue.deleteCoversRacingEventRelationship(-42, racingEvent.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('MAGAZINE ISSUE node and RACING EVENT node do not exist', async () => {
        await expect(MagazineIssue.deleteCoversRacingEventRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›covers-racing-event‹ relationship', async () => {
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
        const racingEvent = await seedNode(DbNodeType.RacingEvent)

        await expect(MagazineIssue.deleteCoversRacingEventRelationship(magazineIssue.properties.id, racingEvent.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›covers-racing-event‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.MagazineIssue, DbNodeType.RacingEvent, RelationshipType.MagazineIssueCoversRacingEvent)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.MagazineIssueCoversRacingEvent,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await MagazineIssue.deleteCoversRacingEventRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.MagazineIssueCoversRacingEvent,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
