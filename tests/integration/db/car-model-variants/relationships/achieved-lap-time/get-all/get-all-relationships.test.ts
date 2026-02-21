import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Requesting all ›achieved-lap-time‹ relationships', () => {
    test('node and relationships exist', async () => {
        const carModelVariant = await seedNode(ControllerNodeType.CarModelVariant)
        await seedRelationshipForStartNode(carModelVariant.properties.id, ControllerNodeType.LapTime, RelationshipType.CarModelVariantAchievedLapTime)
        await seedRelationshipForStartNode(carModelVariant.properties.id, ControllerNodeType.LapTime, RelationshipType.CarModelVariantAchievedLapTime)

        const relationships = await getRelationshipCollection(
            carModelVariant.properties.id,
            RelationshipType.CarModelVariantAchievedLapTime,
            DbNodeType.LapTime,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const carModelVariant = await seedNode(ControllerNodeType.CarModelVariant)

        const relationships = await getRelationshipCollection(
            carModelVariant.properties.id,
            RelationshipType.CarModelVariantAchievedLapTime,
            DbNodeType.LapTime,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.CarModelVariantAchievedLapTime,
            DbNodeType.LapTime,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
