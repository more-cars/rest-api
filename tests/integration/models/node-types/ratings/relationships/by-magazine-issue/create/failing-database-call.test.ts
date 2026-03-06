import {expect, test, vi} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Rating} from "../../../../../../../../src/models/node-types/ratings/Rating"

test('A completely valid request, but the database call fails (e.g. one of the nodes was deleted just a moment ago)', async () => {
    vi.mock("../../../../../../../../src/db/relationships/createRelationship", async () => {
        return {
            createRelationship: () => false
        }
    })

    const rating = await seedNode(DbNodeType.Rating)
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

    await expect(Rating.createByMagazineIssueRelationship(rating.properties.id, magazineIssue.properties.id))
        .rejects
        .toThrow(Error)
})
