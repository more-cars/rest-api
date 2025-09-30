import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {Company} from "../../../../../../../src/models/companies/Company"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Company does not exist', async () => {
    const company = await seedNode('company')

    await expect(Company.deleteHasPrimeImageRelationship(company.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)
})

test('Image does not exist', async () => {
    const image = await seedNode('company')

    await expect(Company.deleteHasPrimeImageRelationship(-42, image.id))
        .rejects
        .toThrow(NodeNotFoundError)
})

test('Both nodes do not exist', async () => {
    await expect(Company.deleteHasPrimeImageRelationship(-42, -43))
        .rejects
        .toThrow(NodeNotFoundError)
})