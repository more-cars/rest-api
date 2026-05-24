import {describe, expect, test} from 'vitest'
import {Book} from "../../../../../../../../src/models/node-types/books/Book"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-video‹ relationship', () => {
    test('BOOK node does not exist', async () => {
        const book = await seedNode(DbNodeType.Book)

        await expect(Book.deleteHasVideoRelationship(book.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('VIDEO node does not exist', async () => {
        const video = await seedNode(DbNodeType.Video)

        await expect(Book.deleteHasVideoRelationship(-42, video.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('BOOK node and VIDEO node do not exist', async () => {
        await expect(Book.deleteHasVideoRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-video‹ relationship', async () => {
        const book = await seedNode(DbNodeType.Book)
        const video = await seedNode(DbNodeType.Video)

        await expect(Book.deleteHasVideoRelationship(book.properties.id, video.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-video‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.Book, DbNodeType.Video, RelationshipType.BookHasVideo)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.BookHasVideo,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await Book.deleteHasVideoRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.BookHasVideo,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
