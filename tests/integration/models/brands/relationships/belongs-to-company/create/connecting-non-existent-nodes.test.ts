import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›belongs-to-company‹ relationship with nodes that do not exist', async () => {
    const brand = await seedNode(ControllerNodeType.BRAND)
    const company = await seedNode(ControllerNodeType.COMPANY)

    await expect(Brand.createBelongsToCompanyRelationship(-42, company.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Brand.createBelongsToCompanyRelationship(brand.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Brand.createBelongsToCompanyRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
