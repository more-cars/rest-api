import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›has-issue‹ relationship', () => {
    test('with valid data', async () => {
        const magazine = await seedNode(DbNodeType.Magazine)
        const magazineIssue = await seedNode(DbNodeType.MagazineIssue)

        const createdRelationship = await createRelationship(
            magazine.properties.id,
            magazineIssue.properties.id,
            RelationshipType.MagazineHasIssue,
        )

        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.MagazineHasIssue)
        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', magazine.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', magazineIssue.properties.id)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const magazine = await seedNode(DbNodeType.Magazine)

        const createdRelationship = await createRelationship(
            magazine.properties.id,
            -42,
            RelationshipType.MagazineHasIssue,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
