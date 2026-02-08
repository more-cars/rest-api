import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {CompanyRelationship} from "../../../../../../../src/models/companies/types/CompanyRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Creating a ›belongs-to-company‹ relationship', () => {
    test('with valid data', async () => {
        const brand = await seedNode(NodeTypeEnum.BRAND)
        const company = await seedNode(NodeTypeEnum.COMPANY)

        const createdRelationship = await createRelationship(
            company.id,
            brand.id,
            DbRelationship.BrandBelongsToCompany,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', company.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', brand.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', CompanyRelationship.hasBrand)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const brand = await seedNode(NodeTypeEnum.BRAND)

        const createdRelationship = await createRelationship(
            brand.id,
            -42,
            DbRelationship.BrandBelongsToCompany,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
