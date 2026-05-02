import {describe, expect, test} from 'vitest'
import {LapTime} from "../../../../../../../../src/models/node-types/lap-times/LapTime"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›documented-in-magazine-issue‹ relationship', () => {
    test('LAP TIME node does not exist', async () => {
        const lapTime = await seedNode(DbNodeType.LapTime)

        await expect(LapTime.deleteDocumentedInMagazineIssueRelationship(lapTime.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('MAGAZINE ISSUE node does not exist', async () => {
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

        await expect(LapTime.deleteDocumentedInMagazineIssueRelationship(-42, magazineIssue.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('LAP TIME node and MAGAZINE ISSUE node do not exist', async () => {
        await expect(LapTime.deleteDocumentedInMagazineIssueRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›documented-in-magazine-issue‹ relationship', async () => {
        const lapTime = await seedNode(DbNodeType.LapTime)
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

        await expect(LapTime.deleteDocumentedInMagazineIssueRelationship(lapTime.properties.id, magazineIssue.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›documented-in-magazine-issue‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.LapTime, DbNodeType.MagazineIssue, RelationshipType.LapTimeDocumentedInMagazineIssue)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.LapTimeDocumentedInMagazineIssue,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await LapTime.deleteDocumentedInMagazineIssueRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.LapTimeDocumentedInMagazineIssue,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
