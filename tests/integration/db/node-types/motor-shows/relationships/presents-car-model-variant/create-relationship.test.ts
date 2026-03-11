import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›presents-car-model-variant‹ relationship', () => {
    test('with valid data', async () => {
        const motorShow = await seedNode(DbNodeType.MotorShow)
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        const createdRelationship = await createRelationship(
            motorShow.properties.id,
            carModelVariant.properties.id,
            RelationshipType.MotorShowPresentsCarModelVariant,
        )

        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.MotorShowPresentsCarModelVariant)
        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', motorShow.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', carModelVariant.properties.id)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const motorShow = await seedNode(DbNodeType.MotorShow)

        const createdRelationship = await createRelationship(
            motorShow.properties.id,
            -42,
            RelationshipType.MotorShowPresentsCarModelVariant,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
