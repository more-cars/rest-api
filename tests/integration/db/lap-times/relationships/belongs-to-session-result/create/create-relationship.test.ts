import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Creating a ›belongs-to-session-result‹ relationship', () => {
    test('with valid data', async () => {
        const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)
        const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)

        const createdRelationship = await createRelationship(
            lapTime.id,
            sessionResult.id,
            RelationshipType.LapTimeBelongsToSessionResult,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', lapTime.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', sessionResult.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', RelationshipType.LapTimeBelongsToSessionResult)
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
            RelationshipType.LapTimeBelongsToSessionResult,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
