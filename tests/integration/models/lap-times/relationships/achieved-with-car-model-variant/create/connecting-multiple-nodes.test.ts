import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {LapTime} from "../../../../../../../src/models/node-types/lap-times/LapTime"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A LAP TIME cannot have multiple ›achieved-with-car-model-variant‹ relationships', async () => {
    const lapTime = await seedNode(ControllerNodeType.LAP_TIME)
    const carModelVariantsAmount = 3
    const carModelVariants = await seedNodes(ControllerNodeType.CAR_MODEL_VARIANT, carModelVariantsAmount)

    for (const carModelVariant of carModelVariants) {
        await LapTime.createAchievedWithCarModelVariantRelationship(lapTime.properties.id, carModelVariant.properties.id)
    }

    const relationships = await getRelationshipCollection(
        lapTime.properties.id,
        RelationshipType.LapTimeAchievedWithCarModelVariant,
        DbNodeType.CarModelVariant,
    )

    expect(relationships.length)
        .toBe(1)
})
