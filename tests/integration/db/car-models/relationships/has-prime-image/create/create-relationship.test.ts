import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›has-prime-image‹ relationship', () => {
    test('with valid data', async () => {
        const carModel = await seedNode(ControllerNodeType.CAR_MODEL)
        const image = await seedNode(ControllerNodeType.IMAGE)

        const createdRelationship = await createRelationship(
            carModel.id,
            image.id,
            RelationshipType.CarModelHasPrimeImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.id', carModel.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.id', image.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.CarModelHasPrimeImage)
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
            RelationshipType.CarModelHasPrimeImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
