import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModel} from "../../../../../../../src/models/node-types/car-models/CarModel"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A CAR MODEL can have multiple ›has-image‹ relationships', async () => {
    const carModel = await seedNode(ControllerNodeType.CAR_MODEL)
    const imagesAmount = 3
    const images = await seedNodes(ControllerNodeType.IMAGE, imagesAmount)

    for (const image of images) {
        await CarModel.createHasImageRelationship(carModel.id, image.id)
    }

    const relationships = await getRelationshipCollection(
        carModel.id,
        RelationshipType.CarModelHasImage,
        DbNodeType.Image,
    )

    expect(relationships.length)
        .toBe(imagesAmount)
})
