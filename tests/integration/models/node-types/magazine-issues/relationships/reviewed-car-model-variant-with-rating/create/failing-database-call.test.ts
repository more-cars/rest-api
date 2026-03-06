import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
    const rating = await seedNode(DbNodeType.Rating)

    await expect(MagazineIssue.createReviewedCarModelVariantWithRatingRelationship(magazineIssue.properties.id, rating.properties.id))
        .rejects
        .toThrow(Error)
})
