import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {Company} from "../../../../../../../src/models/node-types/companies/Company"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-image‹ relationship with nodes that do not exist', async () => {
    const company = await seedNode(ControllerNodeType.COMPANY)
    const image = await seedNode(ControllerNodeType.IMAGE)

    await expect(Company.createHasImageRelationship(-42, image.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Company.createHasImageRelationship(company.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Company.createHasImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
