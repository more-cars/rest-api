import {expect, test} from 'vitest'
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {Company} from "../../../../../../../src/models/companies/Company"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›has-prime-image‹ relationship again', async () => {
    const company = await seedCompany()
    const image = await seedImage()

    await expect(Company.createHasPrimeImageRelationship(company.id, image.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(Company.createHasPrimeImageRelationship(company.id, image.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
