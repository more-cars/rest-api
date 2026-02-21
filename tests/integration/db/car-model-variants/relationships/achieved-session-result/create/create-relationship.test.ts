import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Creating a ›achieved-session-result‹ relationship', () => {
    test('with valid data', async () => {
        const carModelVariant = await seedNode(ControllerNodeType.CarModelVariant)
        const sessionResult = await seedNode(ControllerNodeType.SessionResult)

        const createdRelationship = await createRelationship(
            carModelVariant.properties.id,
            sessionResult.properties.id,
            RelationshipType.CarModelVariantAchievedSessionResult,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', carModelVariant.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', sessionResult.properties.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.CarModelVariantAchievedSessionResult)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const carModelVariant = await seedNode(ControllerNodeType.CarModelVariant)

        const createdRelationship = await createRelationship(
            carModelVariant.properties.id,
            -42,
            RelationshipType.CarModelVariantAchievedSessionResult,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
