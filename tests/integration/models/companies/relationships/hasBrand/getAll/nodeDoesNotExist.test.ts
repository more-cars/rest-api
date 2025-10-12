import {expect, test} from 'vitest'
import {Company} from "../../../../../../../src/models/companies/Company"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('COMPANY does not exist', async () => {
    await expect(Company.getAllHasBrandRelationships(-42))
        .rejects
        .toThrow(NodeNotFoundError)
})
