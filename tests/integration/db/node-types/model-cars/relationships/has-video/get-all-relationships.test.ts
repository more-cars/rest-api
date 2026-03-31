import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting all ›has-video‹ relationships', () => {
    test('node and relationships exist', async () => {
        const modelCar = await seedNode(DbNodeType.ModelCar)
        await seedRelationshipForStartNode(modelCar.properties.id, DbNodeType.Video, RelationshipType.ModelCarHasVideo)
        await seedRelationshipForStartNode(modelCar.properties.id, DbNodeType.Video, RelationshipType.ModelCarHasVideo)

        const relationships = await getRelationshipCollection(
            modelCar.properties.id,
            RelationshipType.ModelCarHasVideo,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const modelCar = await seedNode(DbNodeType.ModelCar)

        const relationships = await getRelationshipCollection(
            modelCar.properties.id,
            RelationshipType.ModelCarHasVideo,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.ModelCarHasVideo,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
