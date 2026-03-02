import {describe, expect, test} from 'vitest'
import {Magazine} from "../../../../../../../../src/models/node-types/magazines/Magazine"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-issue‹ relationship', () => {
    test('MAGAZINE node does not exist', async () => {
        const magazine = await seedNode(DbNodeType.Magazine)

        await expect(Magazine.deleteHasIssueRelationship(magazine.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('MAGAZINE ISSUE node does not exist', async () => {
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

        await expect(Magazine.deleteHasIssueRelationship(-42, magazineIssue.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('MAGAZINE node and MAGAZINE ISSUE node do not exist', async () => {
        await expect(Magazine.deleteHasIssueRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-issue‹ relationship', async () => {
        const magazine = await seedNode(DbNodeType.Magazine)
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

        await expect(Magazine.deleteHasIssueRelationship(magazine.properties.id, magazineIssue.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-issue‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.Magazine, DbNodeType.MagazineIssue, RelationshipType.MagazineHasIssue)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.MagazineHasIssue,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await Magazine.deleteHasIssueRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.MagazineHasIssue,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
