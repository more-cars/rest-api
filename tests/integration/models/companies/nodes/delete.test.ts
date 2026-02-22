import {describe, expect, test} from 'vitest'
import {Company} from "../../../../../src/models/node-types/companies/Company"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"

describe('Deleting a COMPANY', () => {
    test('that does not exist', async () => {
        await expect(Company.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedNode(DbNodeType.Company)
        await expect(Company.delete(node.properties.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
