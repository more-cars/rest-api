import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {CarModel} from "../../../../../../../../src/models/node-types/car-models/CarModel"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A CAR MODEL cannot have multiple ›has-prime-image‹ relationships', async () => {
    const carModel = await seedNode(DbNodeType.CarModel)
    const imagesAmount = 3
    const images = await seedNodes(DbNodeType.Image, imagesAmount)

    for (const image of images) {
        await CarModel.createHasPrimeImageRelationship(carModel.properties.id, image.properties.id)
    }

    const relationships = await getRelationshipCollection(carModel.properties.id, RelationshipType.CarModelHasPrimeImage, DbNodeType.Image)

    expect(relationships.length)
        .toBe(1)
})
