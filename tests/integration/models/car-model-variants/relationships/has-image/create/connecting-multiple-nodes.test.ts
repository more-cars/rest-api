import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A CAR MODEL VARIANT can have multiple ›has-image‹ relationships', async () => {
    const carModelVariant = await seedNode(ControllerNodeType.CarModelVariant)
    const imagesAmount = 3
    const images = await seedNodes(ControllerNodeType.Image, imagesAmount)

    for (const image of images) {
        await CarModelVariant.createHasImageRelationship(carModelVariant.properties.id, image.properties.id)
    }

    const relationships = await getRelationshipCollection(
        carModelVariant.properties.id,
        RelationshipType.CarModelVariantHasImage,
        DbNodeType.Image,
    )

    expect(relationships.length)
        .toBe(imagesAmount)
})
