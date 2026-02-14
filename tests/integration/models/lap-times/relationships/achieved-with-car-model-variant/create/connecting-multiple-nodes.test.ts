import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {LapTime} from "../../../../../../../src/models/lap-times/LapTime"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

test('A LAP TIME cannot have multiple ›achieved-with-car-model-variant‹ relationships', async () => {
    const lapTime = await seedNode(NodeTypeEnum.LAP_TIME)
    const carModelVariantsAmount = 3
    const carModelVariants = await seedNodes(NodeTypeEnum.CAR_MODEL_VARIANT, carModelVariantsAmount)

    for (const carModelVariant of carModelVariants) {
        await LapTime.createAchievedWithCarModelVariantRelationship(lapTime.id, carModelVariant.id)
    }

    const relationships = await getRelationshipCollection(
        lapTime.id,
        DbRelationship.LapTimeAchievedWithCarModelVariant,
        NodeTypeLabel.CarModelVariant,
        RelationshipDirection.REVERSE,
    )

    expect(relationships.length)
        .toBe(1)
})
