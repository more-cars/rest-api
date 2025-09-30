import {expect, test} from 'vitest'
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {Company} from "../../../../../../../src/models/companies/Company"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-image‹ relationship with nodes that do not exist', async () => {
    const company = await seedCompany()
    const image = await seedImage()

    await expect(Company.createHasImageRelationship(-42, image.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Company.createHasImageRelationship(company.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(Company.createHasImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
