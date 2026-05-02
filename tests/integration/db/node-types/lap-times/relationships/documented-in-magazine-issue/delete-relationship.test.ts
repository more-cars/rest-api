import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Trying to delete a ›documented-in-magazine-issue‹ relationship', () => {
    test('nodes exist and have a relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.LapTime, DbNodeType.MagazineIssue, RelationshipType.LapTimeDocumentedInMagazineIssue)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.LapTimeDocumentedInMagazineIssue,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await deleteSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.LapTimeDocumentedInMagazineIssue,
        )

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.LapTimeDocumentedInMagazineIssue,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })

    test('nodes exists, but not the relationship', async () => {
        const lapTime = await seedNode(DbNodeType.LapTime)
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

        const relationship = await deleteSpecificRelationship(
            lapTime.properties.id,
            magazineIssue.properties.id,
            RelationshipType.LapTimeDocumentedInMagazineIssue,
        )

        expect(relationship)
            .toBeFalsy()
    })

    test('neither the nodes, nor the relationship exist', async () => {
        const relationship = await deleteSpecificRelationship(
            -42,
            -43,
            RelationshipType.LapTimeDocumentedInMagazineIssue,
        )

        expect(relationship)
            .toBeFalsy()
    })
})
