import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Creating a ›has-prime-image‹ relationship', () => {
    test('with valid data', async () => {
        const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)
        const image = await seedNode(ControllerNodeType.IMAGE)

        const createdRelationship = await createRelationship(
            sessionResult.id,
            image.id,
            RelationshipType.SessionResultHasPrimeImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', sessionResult.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', image.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.SessionResultHasPrimeImage)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)

        const createdRelationship = await createRelationship(
            sessionResult.id,
            -42,
            RelationshipType.SessionResultHasPrimeImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
