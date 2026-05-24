import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›covers-car-model-variant‹ relationship', () => {
    test('with valid data', async () => {
        const book = await seedNode(DbNodeType.Book)
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        const createdRelationship = await createRelationship(
            book.properties.id,
            carModelVariant.properties.id,
            RelationshipType.BookCoversCarModelVariant,
        )

        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.BookCoversCarModelVariant)
        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', book.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', carModelVariant.properties.id)
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
            RelationshipType.BookCoversCarModelVariant,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
