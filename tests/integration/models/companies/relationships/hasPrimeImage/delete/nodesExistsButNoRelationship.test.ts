import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {Company} from "../../../../../../../src/models/companies/Company"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

test('Both nodes exist, but have no relationship', async () => {
    const company = await seedNode('company')
    const image = await seedNode('image')

    await expect(Company.deleteHasPrimeImageRelationship(company.id, image.id))
        .rejects
        .toThrow(RelationshipNotFoundError)
})
