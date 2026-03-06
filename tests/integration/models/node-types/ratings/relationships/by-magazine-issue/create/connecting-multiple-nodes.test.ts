import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {Rating} from "../../../../../../../../src/models/node-types/ratings/Rating"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A RATING cannot have multiple ›by-magazine-issue‹ relationships', async () => {
    const rating = await seedNode(DbNodeType.Rating)
    const magazineIssuesAmount = 3
    const magazineIssues = await seedNodes(DbNodeType.MagazineIssue, magazineIssuesAmount)

    for (const magazineIssue of magazineIssues) {
        await Rating.createByMagazineIssueRelationship(rating.properties.id, magazineIssue.properties.id)
    }

    const relationships = await getRelationshipCollection(rating.properties.id, RelationshipType.RatingByMagazineIssue)

    expect(relationships.length)
        .toBe(1)
})
