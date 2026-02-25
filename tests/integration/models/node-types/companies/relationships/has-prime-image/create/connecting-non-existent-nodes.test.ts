import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Company} from "../../../../../../../../src/models/node-types/companies/Company"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-prime-image‹ relationship with nodes that do not exist', async () => {
    const company = await seedNode(DbNodeType.Company)
    const image = await seedNode(DbNodeType.Image)

    await expect(Company.createHasPrimeImageRelationship(-42, image.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Company.createHasPrimeImageRelationship(company.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Company.createHasPrimeImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
