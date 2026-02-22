import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {Company} from "../../../../../../../src/models/node-types/companies/Company"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

test('A COMPANY cannot have multiple ›has-prime-image‹ relationships', async () => {
    const company = await seedNode(DbNodeType.Company)
    const imagesAmount = 3
    const images = await seedNodes(DbNodeType.Image, imagesAmount)

    for (const image of images) {
        await Company.createHasPrimeImageRelationship(company.properties.id, image.properties.id)
    }

    const relationships = await getRelationshipCollection(company.properties.id, RelationshipType.CompanyHasPrimeImage, DbNodeType.Image)

    expect(relationships.length)
        .toBe(1)
})
