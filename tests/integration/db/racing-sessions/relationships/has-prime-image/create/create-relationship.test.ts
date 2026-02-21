import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Creating a ›has-prime-image‹ relationship', () => {
    test('with valid data', async () => {
        const racingSession = await seedNode(ControllerNodeType.RacingSession)
        const image = await seedNode(ControllerNodeType.Image)

        const createdRelationship = await createRelationship(
            racingSession.properties.id,
            image.properties.id,
            RelationshipType.RacingSessionHasPrimeImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', racingSession.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', image.properties.id)
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
        const racingSession = await seedNode(ControllerNodeType.RacingSession)

        const createdRelationship = await createRelationship(
            racingSession.properties.id,
            -42,
            RelationshipType.RacingSessionHasPrimeImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
