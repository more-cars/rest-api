import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting all ›has-video‹ relationships', () => {
    test('node and relationships exist', async () => {
        const book = await seedNode(DbNodeType.Book)
        await seedRelationshipForStartNode(book.properties.id, DbNodeType.Video, RelationshipType.BookHasVideo)
        await seedRelationshipForStartNode(book.properties.id, DbNodeType.Video, RelationshipType.BookHasVideo)

        const relationships = await getRelationshipCollection(
            book.properties.id,
            RelationshipType.BookHasVideo,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const book = await seedNode(DbNodeType.Book)

        const relationships = await getRelationshipCollection(
            book.properties.id,
            RelationshipType.BookHasVideo,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.BookHasVideo,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
