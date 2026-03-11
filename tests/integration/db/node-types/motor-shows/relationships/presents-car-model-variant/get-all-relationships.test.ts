import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting all ›presents-car-model-variant‹ relationships', () => {
    test('node and relationships exist', async () => {
        const motorShow = await seedNode(DbNodeType.MotorShow)
        await seedRelationshipForStartNode(motorShow.properties.id, DbNodeType.CarModelVariant, RelationshipType.MotorShowPresentsCarModelVariant)
        await seedRelationshipForStartNode(motorShow.properties.id, DbNodeType.CarModelVariant, RelationshipType.MotorShowPresentsCarModelVariant)

        const relationships = await getRelationshipCollection(
            motorShow.properties.id,
            RelationshipType.MotorShowPresentsCarModelVariant,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const motorShow = await seedNode(DbNodeType.MotorShow)

        const relationships = await getRelationshipCollection(
            motorShow.properties.id,
            RelationshipType.MotorShowPresentsCarModelVariant,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.MotorShowPresentsCarModelVariant,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
