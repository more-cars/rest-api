import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {ModelCarBrand} from "../../../../../../../../src/models/node-types/model-car-brands/ModelCarBrand"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A MODEL CAR BRAND can have multiple ›has-image‹ relationships', async () => {
    const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)
    const imagesAmount = 3
    const images = await seedNodes(DbNodeType.Image, imagesAmount)

    for (const image of images) {
        await ModelCarBrand.createHasImageRelationship(modelCarBrand.properties.id, image.properties.id)
    }

    const relationships = await getRelationshipCollection(modelCarBrand.properties.id, RelationshipType.ModelCarBrandHasImage)

    expect(relationships.length)
        .toBe(imagesAmount)
})
