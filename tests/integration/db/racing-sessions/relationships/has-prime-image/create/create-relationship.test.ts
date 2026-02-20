import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Creating a ›has-prime-image‹ relationship', () => {
    test('with valid data', async () => {
        const racingSession = await seedNode(ControllerNodeType.RACING_SESSION)
        const image = await seedNode(ControllerNodeType.IMAGE)

        const createdRelationship = await createRelationship(
            racingSession.id,
            image.id,
            RelationshipType.RacingSessionHasPrimeImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.id', racingSession.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.id', image.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.RacingSessionHasPrimeImage)
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
            RelationshipType.RacingSessionHasPrimeImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
