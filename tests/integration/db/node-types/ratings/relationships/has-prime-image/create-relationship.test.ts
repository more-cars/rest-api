import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›has-prime-image‹ relationship', () => {
    test('with valid data', async () => {
        const rating = await seedNode(DbNodeType.Rating)
        const image = await seedNode(DbNodeType.Image)

        const createdRelationship = await createRelationship(
            rating.properties.id,
            image.properties.id,
            RelationshipType.RatingHasPrimeImage,
        )

        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.RatingHasPrimeImage)
        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', rating.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', image.properties.id)
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
            RelationshipType.RatingHasPrimeImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
