import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"
import {Company} from "../../../../../../../src/models/companies/Company"

describe('Deleting a ›has-brand‹ relationship', () => {
    test('COMPANY node does not exist', async () => {
        const company = await seedNode(NodeTypeEnum.COMPANY)

        await expect(Company.deleteHasBrandRelationship(company.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node does not exist', async () => {
        const brand = await seedNode(NodeTypeEnum.BRAND)

        await expect(Company.deleteHasBrandRelationship(-42, brand.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('COMPANY node and IMAGE node do not exist', async () => {
        await expect(Company.deleteHasBrandRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-brand‹ relationship', async () => {
        const company = await seedNode(NodeTypeEnum.COMPANY)
        const brand = await seedNode(NodeTypeEnum.BRAND)

        await expect(Company.deleteHasBrandRelationship(company.id, brand.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('both nodes exist and have a ›has-brand‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.COMPANY, NodeTypeEnum.BRAND, DbRelationship.CompanyHasBrand)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.CompanyHasBrand,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await Company.deleteHasBrandRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.CompanyHasBrand,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
