import {describe, expect, test} from 'vitest'
import {Book} from "../../../../../../../../src/models/node-types/books/Book"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›covers-car-model-variant‹ relationships', () => {
    test('node and relationships exist', async () => {
        const book = await seedNode(DbNodeType.Book)
        await seedRelationshipForStartNode(book.properties.id, DbNodeType.CarModelVariant, RelationshipType.BookCoversCarModelVariant)
        await seedRelationshipForStartNode(book.properties.id, DbNodeType.CarModelVariant, RelationshipType.BookCoversCarModelVariant)

        const relationships = await Book.getAllCoversCarModelVariantRelationships(book.properties.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const book = await seedNode(DbNodeType.Book)

        const relationships = await Book.getAllCoversCarModelVariantRelationships(book.properties.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(Book.getAllCoversCarModelVariantRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
