import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A CAR MODEL VARIANT cannot have multiple ›has-prime-image‹ relationships', async () => {
    const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)
    const imagesAmount = 3
    const images = await seedNodes(ControllerNodeType.IMAGE, imagesAmount)

    for (const image of images) {
        await CarModelVariant.createHasPrimeImageRelationship(carModelVariant.id, image.id)
    }

    const relationships = await getRelationshipCollection(
        carModelVariant.id,
        RelationshipType.CarModelVariantHasPrimeImage,
        DbNodeType.Image,
    )

    expect(relationships.length)
        .toBe(1)
})
