import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›is-scale-model-of-car-model-variant‹ relationship', () => {
    test('with valid data', async () => {
        const modelCar = await seedNode(DbNodeType.ModelCar)
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        const createdRelationship = await createRelationship(
            modelCar.properties.id,
            carModelVariant.properties.id,
            RelationshipType.ModelCarIsScaleModelOfCarModelVariant,
        )

        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.ModelCarIsScaleModelOfCarModelVariant)
        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', modelCar.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', carModelVariant.properties.id)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const modelCar = await seedNode(DbNodeType.ModelCar)

        const createdRelationship = await createRelationship(
            modelCar.properties.id,
            -42,
            RelationshipType.ModelCarIsScaleModelOfCarModelVariant,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
