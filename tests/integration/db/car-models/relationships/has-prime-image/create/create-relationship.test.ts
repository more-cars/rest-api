import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

describe('Creating a ›has-prime-image‹ relationship', () => {
    test('with valid data', async () => {
        const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
        const image = await seedNode(NodeTypeEnum.IMAGE)

        const createdRelationship = await createRelationship(
            carModel.id,
            image.id,
            DbRelationship.CarModelHasPrimeImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', carModel.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', image.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', DbRelationship.CarModelHasPrimeImage)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

        const createdRelationship = await createRelationship(
            carModel.id,
            -42,
            DbRelationship.CarModelHasPrimeImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
