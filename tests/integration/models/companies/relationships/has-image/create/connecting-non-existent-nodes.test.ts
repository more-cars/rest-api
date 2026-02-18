import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Company} from "../../../../../../../src/models/node-types/companies/Company"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-image‹ relationship with nodes that do not exist', async () => {
    const company = await seedNode(NodeTypeEnum.COMPANY)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(Company.createHasImageRelationship(-42, image.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Company.createHasImageRelationship(company.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Company.createHasImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
