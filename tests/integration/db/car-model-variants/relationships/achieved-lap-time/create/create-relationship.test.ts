import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Creating a ›achieved-lap-time‹ relationship', () => {
    test('with valid data', async () => {
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)
        const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)

        const createdRelationship = await createRelationship(
            carModelVariant.id,
            lapTime.id,
            RelationshipType.CarModelVariantAchievedLapTime,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', carModelVariant.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', lapTime.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', RelationshipType.CarModelVariantAchievedLapTime)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

        const createdRelationship = await createRelationship(
            carModelVariant.id,
            -42,
            RelationshipType.CarModelVariantAchievedLapTime,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
