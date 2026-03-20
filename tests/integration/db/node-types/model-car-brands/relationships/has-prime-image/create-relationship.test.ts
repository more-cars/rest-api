import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›has-prime-image‹ relationship', () => {
    test('with valid data', async () => {
        const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)
        const image = await seedNode(DbNodeType.Image)

        const createdRelationship = await createRelationship(
            modelCarBrand.properties.id,
            image.properties.id,
            RelationshipType.ModelCarBrandHasPrimeImage,
        )

        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.ModelCarBrandHasPrimeImage)
        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', modelCarBrand.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', image.properties.id)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)

        const createdRelationship = await createRelationship(
            modelCarBrand.properties.id,
            -42,
            RelationshipType.ModelCarBrandHasPrimeImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
