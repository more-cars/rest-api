import {expect, test} from 'vitest'
import {seedImages} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImages"
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {Company} from "../../../../../../../src/models/companies/Company"
import {
    getRelationshipsForSpecificNode
} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A COMPANY can have multiple ›has-image‹ relationships', async () => {
    const company = await seedCompany()
    const imagesAmount = 3
    const images = await seedImages(imagesAmount)

    for (const image of images) {
        await Company.createHasImageRelationship(company.id, image.id)
    }

    const relationships = await getRelationshipsForSpecificNode(company.id, DbRelationship.CompanyHasImage)

    expect(relationships.length)
        .toBe(imagesAmount)
})
