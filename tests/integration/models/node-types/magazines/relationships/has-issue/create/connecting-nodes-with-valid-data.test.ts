import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Magazine} from "../../../../../../../../src/models/node-types/magazines/Magazine"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-issue‹ relationship with valid data', async () => {
    const magazine = await seedNode(DbNodeType.Magazine)
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

    const createdRelationship = await Magazine.createHasIssueRelationship(magazine.properties.id, magazineIssue.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(magazine.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(magazineIssue.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.MagazineHasIssue)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
