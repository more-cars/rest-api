import {describe, expect, test} from 'vitest'
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-prime-image‹ relationship', () => {
    test('RACING SESSION node does not exist', async () => {
        const racingSession = await seedNode(ControllerNodeType.RACING_SESSION)

        await expect(RacingSession.deleteHasPrimeImageRelationship(racingSession.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node does not exist', async () => {
        const image = await seedNode(ControllerNodeType.IMAGE)

        await expect(RacingSession.deleteHasPrimeImageRelationship(-42, image.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING SESSION node and IMAGE node do not exist', async () => {
        await expect(RacingSession.deleteHasPrimeImageRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-prime-image‹ relationship', async () => {
        const racingSession = await seedNode(ControllerNodeType.RACING_SESSION)
        const image = await seedNode(ControllerNodeType.IMAGE)

        await expect(RacingSession.deleteHasPrimeImageRelationship(racingSession.id, image.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-prime-image‹ relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.RACING_SESSION, ControllerNodeType.IMAGE, RelationshipType.RacingSessionHasPrimeImage)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingSessionHasPrimeImage,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RacingSession.deleteHasPrimeImageRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingSessionHasPrimeImage,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
