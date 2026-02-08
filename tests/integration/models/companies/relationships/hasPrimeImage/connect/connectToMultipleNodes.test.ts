import {expect, test} from 'vitest'
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {Company} from "../../../../../../../src/models/companies/Company"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A COMPANY cannot have multiple ›has-prime-image‹ relationships', async () => {
    const company = await seedCompany()
    const imagesAmount = 3
    const images = await seedNodes(NodeTypeEnum.IMAGE, imagesAmount)

    for (const image of images) {
        await Company.createHasPrimeImageRelationship(company.id, image.id)
    }

    const relationships = await getRelationshipCollection(company.id, DbRelationship.CompanyHasPrimeImage)

    expect(relationships.length)
        .toBe(1)
})
