import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›has-prime-image‹ relationship', () => {
    test('with valid data', async () => {
        const brand = await seedNode(ControllerNodeType.Brand)
        const image = await seedNode(ControllerNodeType.Image)

        const createdRelationship = await createRelationship(
            brand.properties.id,
            image.properties.id,
            RelationshipType.BrandHasPrimeImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', brand.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', image.properties.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.BrandHasPrimeImage)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const brand = await seedNode(ControllerNodeType.Brand)

        const createdRelationship = await createRelationship(
            brand.properties.id,
            -42,
            RelationshipType.BrandHasPrimeImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
