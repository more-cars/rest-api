import {describe, expect, test} from 'vitest'
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›reviewed-car-model-variant-with-rating‹ relationships', () => {
    test('node and relationships exist', async () => {
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
        await seedRelationshipForStartNode(magazineIssue.properties.id, DbNodeType.Rating, RelationshipType.MagazineIssueReviewedCarModelVariantWithRating)
        await seedRelationshipForStartNode(magazineIssue.properties.id, DbNodeType.Rating, RelationshipType.MagazineIssueReviewedCarModelVariantWithRating)

        const relationships = await MagazineIssue.getAllReviewedCarModelVariantWithRatingRelationships(magazineIssue.properties.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

        const relationships = await MagazineIssue.getAllReviewedCarModelVariantWithRatingRelationships(magazineIssue.properties.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(MagazineIssue.getAllReviewedCarModelVariantWithRatingRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
