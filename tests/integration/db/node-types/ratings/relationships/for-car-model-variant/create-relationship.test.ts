import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›for-car-model-variant‹ relationship', () => {
    test('with valid data', async () => {
        const rating = await seedNode(DbNodeType.Rating)
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        const createdRelationship = await createRelationship(
            rating.properties.id,
            carModelVariant.properties.id,
            RelationshipType.RatingForCarModelVariant,
        )

        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.RatingForCarModelVariant)
        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', rating.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', carModelVariant.properties.id)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const rating = await seedNode(DbNodeType.Rating)

        const createdRelationship = await createRelationship(
            rating.properties.id,
            -42,
            RelationshipType.RatingForCarModelVariant,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
