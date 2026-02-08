import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {Company} from "../../../../../../../src/models/companies/Company"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A COMPANY cannot have multiple ›has-prime-image‹ relationships', async () => {
    const company = await seedNode(NodeTypeEnum.COMPANY)
    const imagesAmount = 3
    const images = await seedNodes(NodeTypeEnum.IMAGE, imagesAmount)

    for (const image of images) {
        await Company.createHasPrimeImageRelationship(company.id, image.id)
    }

    const relationships = await getRelationshipCollection(company.id, DbRelationship.CompanyHasPrimeImage)

    expect(relationships.length)
        .toBe(1)
})
