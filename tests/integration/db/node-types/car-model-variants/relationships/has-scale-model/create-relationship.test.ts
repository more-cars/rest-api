import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›has-scale-model‹ relationship', () => {
    test('with valid data', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
        const modelCar = await seedNode(DbNodeType.ModelCar)

        const createdRelationship = await createRelationship(
            carModelVariant.properties.id,
            modelCar.properties.id,
            RelationshipType.CarModelVariantHasScaleModel,
        )

        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.CarModelVariantHasScaleModel)
        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', carModelVariant.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', modelCar.properties.id)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        const createdRelationship = await createRelationship(
            carModelVariant.properties.id,
            -42,
            RelationshipType.CarModelVariantHasScaleModel,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
