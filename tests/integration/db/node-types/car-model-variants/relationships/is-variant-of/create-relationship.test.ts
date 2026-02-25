import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Creating a ›is-variant-of‹ relationship', () => {
    test('with valid data', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
        const carModel = await seedNode(DbNodeType.CarModel)

        const createdRelationship = await createRelationship(
            carModelVariant.properties.id,
            carModel.properties.id,
            RelationshipType.CarModelVariantIsVariantOf,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', carModelVariant.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', carModel.properties.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.CarModelVariantIsVariantOf)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        const createdRelationship = await createRelationship(
            -42,
            carModelVariant.properties.id,
            RelationshipType.CarModelVariantIsVariantOf,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
