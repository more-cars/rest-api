import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {MagazineIssue} from "../../../../../../../../src/models/node-types/magazine-issues/MagazineIssue"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›belongs-to-magazine‹ relationship with valid data', async () => {
    const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
    const magazine = await seedNode(DbNodeType.Magazine)

    const createdRelationship = await MagazineIssue.createBelongsToMagazineRelationship(magazineIssue.properties.id, magazine.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(magazineIssue.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(magazine.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.MagazineIssueBelongsToMagazine)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
