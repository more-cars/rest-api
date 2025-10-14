import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModelRelationship} from "../../../../../../../src/models/car-models/types/CarModelRelationship"

describe('Creating a ›has-successor‹ relationship', () => {
    test('with valid data', async () => {
        const carModel = await seedCarModel()
        const partnerNode = await seedCarModel()

        const createdRelationship = await createRelationship(
            carModel.id,
            partnerNode.id,
            DbRelationship.CarModelHasSuccessor,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', carModel.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', partnerNode.id)
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
            DbRelationship.CarModelHasSuccessor,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
