import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›has-brand‹ relationship', () => {
    test('with valid data', async () => {
        const company = await seedNode(NodeTypeEnum.COMPANY)
        const brand = await seedNode(NodeTypeEnum.BRAND)

        const createdRelationship = await createRelationship(
            company.id,
            brand.id,
            RelationshipType.CompanyHasBrand,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', company.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', brand.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', RelationshipType.CompanyHasBrand)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const company = await seedNode(NodeTypeEnum.COMPANY)

        const createdRelationship = await createRelationship(
            company.id,
            -42,
            RelationshipType.CompanyHasBrand,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
