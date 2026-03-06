import {describe, expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {Rating} from "../../../../../../../../src/models/node-types/ratings/Rating"
import {validateJson} from "../../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting a ›by-magazine-issue‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(DbNodeType.Rating, DbNodeType.MagazineIssue, RelationshipType.RatingByMagazineIssue)
        const expectedRatingId = expectedRelationship.start_node.properties.id
        const expectedMagazineIssueId = expectedRelationship.end_node.properties.id
        const actualRelationship = await Rating.getByMagazineIssueRelationship(expectedRatingId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.attributes.id)
            .toBe(expectedRatingId)

        expect(actualRelationship.destination.attributes.id)
            .toBe(expectedMagazineIssueId)
    })

    test('node exists, but not the relationship', async () => {
        const rating = await seedNode(DbNodeType.Rating)

        await expect(Rating.getByMagazineIssueRelationship(rating.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(Rating.getByMagazineIssueRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
