import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›has-prime-image‹ relationship', () => {
    test('with valid data', async () => {
        const company = await seedNode(ControllerNodeType.Company)
        const image = await seedNode(ControllerNodeType.Image)

        const createdRelationship = await createRelationship(
            company.properties.id,
            image.properties.id,
            RelationshipType.CompanyHasPrimeImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', company.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', image.properties.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.CompanyHasPrimeImage)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const company = await seedNode(ControllerNodeType.Company)

        const createdRelationship = await createRelationship(
            company.properties.id,
            -42,
            RelationshipType.CompanyHasPrimeImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
