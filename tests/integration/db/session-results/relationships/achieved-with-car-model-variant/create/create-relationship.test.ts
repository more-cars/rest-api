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
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

        const createdRelationship = await createRelationship(
            carModelVariant.id,
            sessionResult.id,
            DbRelationship.SessionResultAchievedWithCarModelVariant,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', carModelVariant.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', sessionResult.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', CarModelVariantRelationship.achievedSessionResult)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

        const createdRelationship = await createRelationship(
            sessionResult.id,
            -42,
            DbRelationship.SessionResultAchievedWithCarModelVariant,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
