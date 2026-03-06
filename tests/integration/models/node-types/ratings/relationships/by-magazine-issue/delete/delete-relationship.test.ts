import {describe, expect, test} from 'vitest'
import {Rating} from "../../../../../../../../src/models/node-types/ratings/Rating"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›by-magazine-issue‹ relationship', () => {
    test('RATING node does not exist', async () => {
        const rating = await seedNode(DbNodeType.Rating)

        await expect(Rating.deleteByMagazineIssueRelationship(rating.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('MAGAZINE ISSUE node does not exist', async () => {
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

        await expect(Rating.deleteByMagazineIssueRelationship(-42, magazineIssue.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RATING node and MAGAZINE ISSUE node do not exist', async () => {
        await expect(Rating.deleteByMagazineIssueRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›by-magazine-issue‹ relationship', async () => {
        const rating = await seedNode(DbNodeType.Rating)
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

        await expect(Rating.deleteByMagazineIssueRelationship(rating.properties.id, magazineIssue.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›by-magazine-issue‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.Rating, DbNodeType.MagazineIssue, RelationshipType.RatingByMagazineIssue)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RatingByMagazineIssue,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await Rating.deleteByMagazineIssueRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RatingByMagazineIssue,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
