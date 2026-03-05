import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›followed-by-issue‹ relationship with valid data', async () => {
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
    const partner = await seedNode(DbNodeType.MagazineIssue)

    const createdRelationship = await MagazineIssue.createFollowedByIssueRelationship(magazineIssue.properties.id, partner.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(magazineIssue.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(partner.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.MagazineIssueFollowedByIssue)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
