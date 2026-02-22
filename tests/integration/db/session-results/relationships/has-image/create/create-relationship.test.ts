import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Creating a ›has-image‹ relationship', () => {
    test('with valid data', async () => {
        const sessionResult = await seedNode(DbNodeType.SessionResult)
        const image = await seedNode(DbNodeType.Image)

        const createdRelationship = await createRelationship(
            sessionResult.properties.id,
            image.properties.id,
            RelationshipType.SessionResultHasImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', sessionResult.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', image.properties.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.SessionResultHasImage)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const sessionResult = await seedNode(DbNodeType.SessionResult)

        const createdRelationship = await createRelationship(
            sessionResult.properties.id,
            -42,
            RelationshipType.SessionResultHasImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
