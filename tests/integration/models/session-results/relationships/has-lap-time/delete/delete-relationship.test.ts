import {describe, expect, test} from 'vitest'
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-lap-time‹ relationship', () => {
    test('SESSION RESULT node does not exist', async () => {
        const sessionResult = await seedNode(DbNodeType.SessionResult)

        await expect(SessionResult.deleteHasLapTimeRelationship(sessionResult.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('LAP TIME node does not exist', async () => {
        const lapTime = await seedNode(DbNodeType.LapTime)

        await expect(SessionResult.deleteHasLapTimeRelationship(-42, lapTime.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('SESSION RESULT node and LAP TIME node do not exist', async () => {
        await expect(SessionResult.deleteHasLapTimeRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-lap-time‹ relationship', async () => {
        const sessionResult = await seedNode(DbNodeType.SessionResult)
        const lapTime = await seedNode(DbNodeType.LapTime)

        await expect(SessionResult.deleteHasLapTimeRelationship(sessionResult.properties.id, lapTime.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-lap-time‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.SessionResult, DbNodeType.LapTime, RelationshipType.SessionResultHasLapTime)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.SessionResultHasLapTime,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await SessionResult.deleteHasLapTimeRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.SessionResultHasLapTime,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
