import {describe, expect, test} from 'vitest'
import {Book} from "../../../../../../../../src/models/node-types/books/Book"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›covers-car-model-variant‹ relationship', () => {
    test('BOOK node does not exist', async () => {
        const book = await seedNode(DbNodeType.Book)

        await expect(Book.deleteCoversCarModelVariantRelationship(book.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('CAR MODEL VARIANT node does not exist', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        await expect(Book.deleteCoversCarModelVariantRelationship(-42, carModelVariant.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('BOOK node and CAR MODEL VARIANT node do not exist', async () => {
        await expect(Book.deleteCoversCarModelVariantRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›covers-car-model-variant‹ relationship', async () => {
        const book = await seedNode(DbNodeType.Book)
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        await expect(Book.deleteCoversCarModelVariantRelationship(book.properties.id, carModelVariant.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›covers-car-model-variant‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.Book, DbNodeType.CarModelVariant, RelationshipType.BookCoversCarModelVariant)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.BookCoversCarModelVariant,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await Book.deleteCoversCarModelVariantRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.BookCoversCarModelVariant,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
