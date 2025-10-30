import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {
    CarModelVariantRelationship
} from "../../../../../../../src/models/car-model-variants/types/CarModelVariantRelationship"

describe('Creating a ›achieved-with-car-model-variant‹ relationship', () => {
    test('with valid data', async () => {
        const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

        const createdRelationship = await createRelationship(
            carModelVariant.id,
            lapTime.id,
            DbRelationship.LapTimeAchievedWithCarModelVariant,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', carModelVariant.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', lapTime.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', CarModelVariantRelationship.achievedLapTime)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)

        const createdRelationship = await createRelationship(
            lapTime.id,
            -42,
            DbRelationship.LapTimeAchievedWithCarModelVariant,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
