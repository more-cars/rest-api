import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Creating a ›has-image‹ relationship', () => {
    test('with valid data', async () => {
        const racingSeries = await seedNode(ControllerNodeType.RacingSeries)
        const image = await seedNode(ControllerNodeType.Image)

        const createdRelationship = await createRelationship(
            racingSeries.properties.id,
            image.properties.id,
            RelationshipType.RacingSeriesHasImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', racingSeries.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', image.properties.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.RacingSeriesHasImage)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const racingSeries = await seedNode(ControllerNodeType.RacingSeries)

        const createdRelationship = await createRelationship(
            racingSeries.properties.id,
            -42,
            RelationshipType.RacingSeriesHasImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
