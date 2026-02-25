import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Brand} from "../../../../../../../../src/models/node-types/brands/Brand"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›belongs-to-company‹ relationship with nodes that do not exist', async () => {
    const brand = await seedNode(DbNodeType.Brand)
    const company = await seedNode(DbNodeType.Company)

    await expect(Brand.createBelongsToCompanyRelationship(-42, company.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Brand.createBelongsToCompanyRelationship(brand.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Brand.createBelongsToCompanyRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
