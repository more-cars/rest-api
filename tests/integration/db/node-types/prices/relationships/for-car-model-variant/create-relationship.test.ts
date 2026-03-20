import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›for-car-model-variant‹ relationship', () => {
    test('with valid data', async () => {
        const price = await seedNode(DbNodeType.Price)
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        const createdRelationship = await createRelationship(
            price.properties.id,
            carModelVariant.properties.id,
            RelationshipType.PriceForCarModelVariant,
        )

        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.PriceForCarModelVariant)
        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', price.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', carModelVariant.properties.id)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const price = await seedNode(DbNodeType.Price)

        const createdRelationship = await createRelationship(
            price.properties.id,
            -42,
            RelationshipType.PriceForCarModelVariant,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
