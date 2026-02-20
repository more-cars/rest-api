import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Creating a ›belongs-to-session-result‹ relationship', () => {
    test('with valid data', async () => {
        const lapTime = await seedNode(ControllerNodeType.LAP_TIME)
        const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)

        const createdRelationship = await createRelationship(
            lapTime.id,
            sessionResult.id,
            RelationshipType.LapTimeBelongsToSessionResult,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', lapTime.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', sessionResult.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.LapTimeBelongsToSessionResult)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const lapTime = await seedNode(ControllerNodeType.LAP_TIME)

        const createdRelationship = await createRelationship(
            lapTime.id,
            -42,
            RelationshipType.LapTimeBelongsToSessionResult,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
