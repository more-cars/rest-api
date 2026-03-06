import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Rating} from "../../../../../../../../src/models/node-types/ratings/Rating"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›by-magazine-issue‹ relationship with valid data', async () => {
    const rating = await seedNode(DbNodeType.Rating)
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

    const createdRelationship = await Rating.createByMagazineIssueRelationship(rating.properties.id, magazineIssue.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(rating.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(magazineIssue.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RatingByMagazineIssue)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
