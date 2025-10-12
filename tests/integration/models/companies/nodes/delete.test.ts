import {describe, expect, test} from 'vitest'
import {Company} from "../../../../../src/models/companies/Company"
import {seedCompany} from "../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

describe('Deleting a COMPANY', () => {
    test('that does not exist', async () => {
        await expect(Company.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedCompany()
        await expect(Company.delete(node.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
