import {describe, expect, test} from 'vitest'
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-prime-image‹ relationship', () => {
    test('SESSION RESULT node does not exist', async () => {
        const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)

        await expect(SessionResult.deleteHasPrimeImageRelationship(sessionResult.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node does not exist', async () => {
        const image = await seedNode(ControllerNodeType.IMAGE)

        await expect(SessionResult.deleteHasPrimeImageRelationship(-42, image.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('SESSION RESULT node and IMAGE node do not exist', async () => {
        await expect(SessionResult.deleteHasPrimeImageRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-prime-image‹ relationship', async () => {
        const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)
        const image = await seedNode(ControllerNodeType.IMAGE)

        await expect(SessionResult.deleteHasPrimeImageRelationship(sessionResult.id, image.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-prime-image‹ relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.SESSION_RESULT, ControllerNodeType.IMAGE, RelationshipType.SessionResultHasPrimeImage)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.SessionResultHasPrimeImage,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await SessionResult.deleteHasPrimeImageRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.SessionResultHasPrimeImage,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
