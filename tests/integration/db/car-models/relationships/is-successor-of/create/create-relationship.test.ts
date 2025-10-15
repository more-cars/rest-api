import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModelRelationship} from "../../../../../../../src/models/car-models/types/CarModelRelationship"

describe('Creating a ›is-successor-of‹ relationship', () => {
    test('with valid data', async () => {
        const carModel = await seedCarModel()
        const partner = await seedCarModel()

        const createdRelationship = await createRelationship(
            carModel.id,
            partner.id,
            DbRelationship.CarModelIsSuccessorOf,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', carModel.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', partner.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', CarModelRelationship.hasSuccessor)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const carModel = await seedCarModel()

        const createdRelationship = await createRelationship(
            carModel.id,
            -42,
            DbRelationship.CarModelIsSuccessorOf,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
