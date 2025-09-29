import {expect, test} from 'vitest'
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {Company} from "../../../../../../../src/models/companies/Company"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

test('Company exists, but has no relationship', async () => {
    const company = await seedCompany()

    await expect(Company.getHasPrimeImageRelationship(company.id))
        .rejects
        .toThrow(RelationshipNotFoundError)
})
