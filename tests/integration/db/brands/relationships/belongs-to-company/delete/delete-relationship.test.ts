import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

describe('Trying to delete a ›belongs-to-company‹ relationship', () => {
    test('nodes exist and have a relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.BRAND, NodeTypeEnum.COMPANY, DbRelationship.BrandBelongsToCompany)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.BrandBelongsToCompany,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await deleteSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.BrandBelongsToCompany,
        )

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.BrandBelongsToCompany,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })

    test('nodes exists, but not the relationship', async () => {
        const brand = await seedNode(NodeTypeEnum.BRAND)
        const company = await seedNode(NodeTypeEnum.COMPANY)

        const relationship = await deleteSpecificRelationship(
            brand.id,
            company.id,
            DbRelationship.BrandBelongsToCompany,
        )

        expect(relationship)
            .toBeFalsy()
    })

    test('neither the nodes, nor the relationship exist', async () => {
        const relationship = await deleteSpecificRelationship(
            -42,
            -43,
            DbRelationship.BrandBelongsToCompany,
        )

        expect(relationship)
            .toBeFalsy()
    })
})
