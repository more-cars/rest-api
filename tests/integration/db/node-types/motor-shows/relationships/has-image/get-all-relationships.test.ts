import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const motorShow = await seedNode(DbNodeType.MotorShow)
        await seedRelationshipForStartNode(motorShow.properties.id, DbNodeType.Image, RelationshipType.MotorShowHasImage)
        await seedRelationshipForStartNode(motorShow.properties.id, DbNodeType.Image, RelationshipType.MotorShowHasImage)

        const relationships = await getRelationshipCollection(
            motorShow.properties.id,
            RelationshipType.MotorShowHasImage,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const motorShow = await seedNode(DbNodeType.MotorShow)

        const relationships = await getRelationshipCollection(
            motorShow.properties.id,
            RelationshipType.MotorShowHasImage,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.MotorShowHasImage,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
