import {expect, test} from 'vitest'
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {Company} from "../../../../../../../src/models/companies/Company"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Expecting the relationship ID to not change when creating the same ›has-image‹ relationship again', async () => {
    const company = await seedCompany()
    const image = await seedImage()

    await expect(Company.createHasImageRelationship(company.id, image.id))
        .resolves
        .not.toThrow(NodeNotFoundError)

    await expect(Company.createHasImageRelationship(company.id, image.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
