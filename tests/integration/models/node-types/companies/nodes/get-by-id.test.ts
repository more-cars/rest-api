import {describe, expect, test} from 'vitest'
import {Company} from "../../../../../../src/models/node-types/companies/Company"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"

describe('Fetching a COMPANY', () => {
    test('which does not exist', async () => {
        await expect(Company.findById(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('which exists', async () => {
        const expectedCompany = await seedNode(DbNodeType.Company)
        const actualCompany = await Company.findById(expectedCompany.properties.id)

        expect(actualCompany.attributes)
            .toEqual(expectedCompany.properties)
    })
})
