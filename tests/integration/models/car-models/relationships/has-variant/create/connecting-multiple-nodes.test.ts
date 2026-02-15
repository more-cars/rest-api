import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModel} from "../../../../../../../src/models/car-models/CarModel"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

test('A CAR MODEL can have multiple ›has-variant‹ relationships', async () => {
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
    const carModelVariantsAmount = 3
    const carModelVariants = await seedNodes(NodeTypeEnum.CAR_MODEL_VARIANT, carModelVariantsAmount)

    for (const carModelVariant of carModelVariants) {
        await CarModel.createHasVariantRelationship(carModel.id, carModelVariant.id)
    }

    const relationships = await getRelationshipCollection(
        carModel.id,
        DbRelationship.CarModelHasVariant,
        NodeTypeLabel.CarModelVariant,
    )

    expect(relationships.length)
        .toBe(carModelVariantsAmount)
})
