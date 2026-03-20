import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {ModelCar} from "../../../../../../../../src/models/node-types/model-cars/ModelCar"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A MODEL CAR can have multiple ›has-image‹ relationships', async () => {
    const modelCar = await seedNode(DbNodeType.ModelCar)
    const imagesAmount = 3
    const images = await seedNodes(DbNodeType.Image, imagesAmount)

    for (const image of images) {
        await ModelCar.createHasImageRelationship(modelCar.properties.id, image.properties.id)
    }

    const relationships = await getRelationshipCollection(modelCar.properties.id, RelationshipType.ModelCarHasImage)

    expect(relationships.length)
        .toBe(imagesAmount)
})
