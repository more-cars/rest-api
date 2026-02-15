import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Creating a ›has-lap-time‹ relationship', () => {
    test('with valid data', async () => {
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)
        const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)

        const createdRelationship = await createRelationship(
            sessionResult.id,
            lapTime.id,
            DbRelationship.SessionResultHasLapTime,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', sessionResult.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', lapTime.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', DbRelationship.SessionResultHasLapTime)
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
            DbRelationship.SessionResultHasLapTime,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
