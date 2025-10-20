import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {Company} from "../../../../../../../src/models/companies/Company"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Both nodes exist, but have no relationship', async () => {
    const company = await seedNode(NodeTypeEnum.COMPANY)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(Company.deleteHasImageRelationship(company.id, image.id))
        .rejects
        .toThrow(RelationshipNotFoundError)
})
