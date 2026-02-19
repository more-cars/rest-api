import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"
import {Company} from "../../../../../../../src/models/node-types/companies/Company"

describe('Deleting a ›has-prime-image‹ relationship', () => {
    test('COMPANY node does not exist', async () => {
        const company = await seedNode(NodeTypeEnum.COMPANY)

        await expect(Company.deleteHasPrimeImageRelationship(company.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node does not exist', async () => {
        const image = await seedNode(NodeTypeEnum.IMAGE)

        await expect(Company.deleteHasPrimeImageRelationship(-42, image.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('COMPANY node and IMAGE node do not exist', async () => {
        await expect(Company.deleteHasPrimeImageRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-prime-image‹ relationship', async () => {
        const company = await seedNode(NodeTypeEnum.COMPANY)
        const image = await seedNode(NodeTypeEnum.IMAGE)

        await expect(Company.deleteHasPrimeImageRelationship(company.id, image.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-prime-image‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.COMPANY, NodeTypeEnum.IMAGE, RelationshipType.CompanyHasPrimeImage)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node.id,
            RelationshipType.CompanyHasPrimeImage,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await Company.deleteHasPrimeImageRelationship(seededRelationship.start_node.id, seededRelationship.end_node.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node.id,
            RelationshipType.CompanyHasPrimeImage,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
