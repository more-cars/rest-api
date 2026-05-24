import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›has-main-video‹ relationship', () => {
    test('with valid data', async () => {
        const book = await seedNode(DbNodeType.Book)
        const video = await seedNode(DbNodeType.Video)

        const createdRelationship = await createRelationship(
            book.properties.id,
            video.properties.id,
            RelationshipType.BookHasMainVideo,
        )

        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.BookHasMainVideo)
        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', book.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', video.properties.id)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const book = await seedNode(DbNodeType.Book)

        const createdRelationship = await createRelationship(
            book.properties.id,
            -42,
            RelationshipType.BookHasMainVideo,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
