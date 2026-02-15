import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Creating a ›has-prime-image‹ relationship', () => {
    test('with valid data', async () => {
        const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)
        const image = await seedNode(NodeTypeEnum.IMAGE)

        const createdRelationship = await createRelationship(
            lapTime.id,
            image.id,
            DbRelationship.LapTimeHasPrimeImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', lapTime.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', image.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', DbRelationship.LapTimeHasPrimeImage)
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
            DbRelationship.LapTimeHasPrimeImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
