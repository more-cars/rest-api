import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›belongs-to-magazine‹ relationship', () => {
    test('with valid data', async () => {
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)
        const magazine = await seedNode(DbNodeType.Magazine)

        const createdRelationship = await createRelationship(
            magazineIssue.properties.id,
            magazine.properties.id,
            RelationshipType.MagazineIssueBelongsToMagazine,
        )

        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.MagazineIssueBelongsToMagazine)
        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', magazineIssue.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', magazine.properties.id)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

        const createdRelationship = await createRelationship(
            magazineIssue.properties.id,
            -42,
            RelationshipType.MagazineIssueBelongsToMagazine,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
