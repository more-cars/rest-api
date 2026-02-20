import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Creating a ›has-prime-image‹ relationship', () => {
    test('with valid data', async () => {
        const lapTime = await seedNode(ControllerNodeType.LAP_TIME)
        const image = await seedNode(ControllerNodeType.IMAGE)

        const createdRelationship = await createRelationship(
            lapTime.properties.id,
            image.properties.id,
            RelationshipType.LapTimeHasPrimeImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', lapTime.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', image.properties.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.LapTimeHasPrimeImage)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const lapTime = await seedNode(ControllerNodeType.LAP_TIME)

        const createdRelationship = await createRelationship(
            lapTime.properties.id,
            -42,
            RelationshipType.LapTimeHasPrimeImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
