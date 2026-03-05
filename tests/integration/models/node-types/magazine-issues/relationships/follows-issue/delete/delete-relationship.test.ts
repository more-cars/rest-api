import {describe, expect, test} from 'vitest'
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›follows-issue‹ relationship', () => {
    test('MAGAZINE ISSUE node does not exist', async () => {
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

        await expect(MagazineIssue.deleteFollowsIssueRelationship(magazineIssue.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('PARTNER node does not exist', async () => {
        const partner = await seedNode(DbNodeType.MagazineIssue)

        await expect(MagazineIssue.deleteFollowsIssueRelationship(-42, partner.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('MAGAZINE ISSUE node and PARTNER node do not exist', async () => {
        await expect(MagazineIssue.deleteFollowsIssueRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›follows-issue‹ relationship', async () => {
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
        const partner = await seedNode(DbNodeType.MagazineIssue)

        await expect(MagazineIssue.deleteFollowsIssueRelationship(magazineIssue.properties.id, partner.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›follows-issue‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.MagazineIssue, DbNodeType.MagazineIssue, RelationshipType.MagazineIssueFollowsIssue)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.MagazineIssueFollowsIssue,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await MagazineIssue.deleteFollowsIssueRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.MagazineIssueFollowsIssue,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
