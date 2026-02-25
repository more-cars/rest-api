import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {CarModelVariant} from "../../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A CAR MODEL VARIANT can have multiple ›achieved-lap-time‹ relationships', async () => {
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const lapTimesAmount = 3
    const lapTimes = await seedNodes(DbNodeType.LapTime, lapTimesAmount)

    for (const lapTime of lapTimes) {
        await CarModelVariant.createAchievedLapTimeRelationship(carModelVariant.properties.id, lapTime.properties.id)
    }

    const relationships = await getRelationshipCollection(carModelVariant.properties.id, RelationshipType.CarModelVariantAchievedLapTime, DbNodeType.LapTime)

    expect(relationships.length)
        .toBe(lapTimesAmount)
})
