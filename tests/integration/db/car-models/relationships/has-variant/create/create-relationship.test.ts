import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Creating a ›has-variant‹ relationship', () => {
    test('with valid data', async () => {
        const carModel = await seedNode(ControllerNodeType.CAR_MODEL)
        const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)

        const createdRelationship = await createRelationship(
            carModel.id,
            carModelVariant.id,
            RelationshipType.CarModelHasVariant,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.id', carModel.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.id', carModelVariant.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.CarModelHasVariant)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const carModel = await seedNode(ControllerNodeType.CAR_MODEL)

        const createdRelationship = await createRelationship(
            carModel.id,
            -42,
            RelationshipType.CarModelHasVariant,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
