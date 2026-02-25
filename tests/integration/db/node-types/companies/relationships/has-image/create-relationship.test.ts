import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›has-image‹ relationship', () => {
    test('with valid data', async () => {
        const company = await seedNode(DbNodeType.Company)
        const image = await seedNode(DbNodeType.Image)

        const createdRelationship = await createRelationship(
            company.properties.id,
            image.properties.id,
            RelationshipType.CompanyHasImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', company.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', image.properties.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.CompanyHasImage)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const company = await seedNode(DbNodeType.Company)

        const createdRelationship = await createRelationship(
            company.properties.id,
            -42,
            RelationshipType.CompanyHasImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
