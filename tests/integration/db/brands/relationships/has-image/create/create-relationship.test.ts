import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›has-image‹ relationship', () => {
    test('with valid data', async () => {
        const brand = await seedNode(ControllerNodeType.BRAND)
        const image = await seedNode(ControllerNodeType.IMAGE)

        const createdRelationship = await createRelationship(
            brand.id,
            image.id,
            RelationshipType.BrandHasImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', brand.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', image.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.BrandHasImage)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const brand = await seedNode(ControllerNodeType.BRAND)

        const createdRelationship = await createRelationship(
            brand.id,
            -42,
            RelationshipType.BrandHasImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
