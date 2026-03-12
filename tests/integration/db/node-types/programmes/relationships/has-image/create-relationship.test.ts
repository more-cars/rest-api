import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›has-image‹ relationship', () => {
    test('with valid data', async () => {
        const programme = await seedNode(DbNodeType.Programme)
        const image = await seedNode(DbNodeType.Image)

        const createdRelationship = await createRelationship(
            programme.properties.id,
            image.properties.id,
            RelationshipType.ProgrammeHasImage,
        )

        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.ProgrammeHasImage)
        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', programme.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', image.properties.id)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const programme = await seedNode(DbNodeType.Programme)

        const createdRelationship = await createRelationship(
            programme.properties.id,
            -42,
            RelationshipType.ProgrammeHasImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
