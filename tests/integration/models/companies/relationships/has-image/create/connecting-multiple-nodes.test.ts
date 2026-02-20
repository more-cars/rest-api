import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {Company} from "../../../../../../../src/models/node-types/companies/Company"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {Neo4jNodeType} from "../../../../../../../src/db/types/Neo4jNodeType"

test('A COMPANY can have multiple ›has-image‹ relationships', async () => {
    const company = await seedNode(ControllerNodeType.COMPANY)
    const imagesAmount = 3
    const images = await seedNodes(ControllerNodeType.IMAGE, imagesAmount)

    for (const image of images) {
        await Company.createHasImageRelationship(company.id, image.id)
    }

    const relationships = await getRelationshipCollection(
        company.id,
        RelationshipType.CompanyHasImage,
        Neo4jNodeType.Image,
    )

    expect(relationships.length)
        .toBe(imagesAmount)
})
