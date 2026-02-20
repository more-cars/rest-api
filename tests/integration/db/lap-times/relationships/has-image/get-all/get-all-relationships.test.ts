import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const lapTime = await seedNode(ControllerNodeType.LAP_TIME)
        await seedRelationshipForStartNode(lapTime.properties.id, ControllerNodeType.IMAGE, RelationshipType.LapTimeHasImage)
        await seedRelationshipForStartNode(lapTime.properties.id, ControllerNodeType.IMAGE, RelationshipType.LapTimeHasImage)

        const relationships = await getRelationshipCollection(
            lapTime.properties.id,
            RelationshipType.LapTimeHasImage,
            DbNodeType.Image,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const lapTime = await seedNode(ControllerNodeType.LAP_TIME)

        const relationships = await getRelationshipCollection(
            lapTime.properties.id,
            RelationshipType.LapTimeHasImage,
            DbNodeType.Image,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.LapTimeHasImage,
            DbNodeType.Image,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
