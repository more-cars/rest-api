import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {Company} from "../../../../../../../src/models/node-types/companies/Company"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A COMPANY cannot have multiple ›has-prime-image‹ relationships', async () => {
    const company = await seedNode(ControllerNodeType.COMPANY)
    const imagesAmount = 3
    const images = await seedNodes(ControllerNodeType.IMAGE, imagesAmount)

    for (const image of images) {
        await Company.createHasPrimeImageRelationship(company.id, image.id)
    }

    const relationships = await getRelationshipCollection(company.id, RelationshipType.CompanyHasPrimeImage, DbNodeType.Image)

    expect(relationships.length)
        .toBe(1)
})
