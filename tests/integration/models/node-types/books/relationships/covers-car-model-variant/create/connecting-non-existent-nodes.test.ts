import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Book} from "../../../../../../../../src/models/node-types/books/Book"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›covers-car-model-variant‹ relationship with nodes that do not exist', async () => {
    const book = await seedNode(DbNodeType.Book)
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

    await expect(Book.createCoversCarModelVariantRelationship(-42, carModelVariant.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Book.createCoversCarModelVariantRelationship(book.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Book.createCoversCarModelVariantRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
