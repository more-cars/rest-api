import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Creating a ›has-session-result‹ relationship', () => {
    test('with valid data', async () => {
        const racingSession = await seedNode(ControllerNodeType.RACING_SESSION)
        const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)

        const createdRelationship = await createRelationship(
            racingSession.id,
            sessionResult.id,
            RelationshipType.RacingSessionHasSessionResult,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', racingSession.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', sessionResult.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.RacingSessionHasSessionResult)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const racingSession = await seedNode(ControllerNodeType.RACING_SESSION)

        const createdRelationship = await createRelationship(
            racingSession.id,
            -42,
            RelationshipType.RacingSessionHasSessionResult,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
