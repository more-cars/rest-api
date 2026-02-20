import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const racingSession = await seedNode(ControllerNodeType.RACING_SESSION)
        await seedRelationshipForStartNode(racingSession.properties.id, ControllerNodeType.IMAGE, RelationshipType.RacingSessionHasImage)
        await seedRelationshipForStartNode(racingSession.properties.id, ControllerNodeType.IMAGE, RelationshipType.RacingSessionHasImage)

        const relationships = await getRelationshipCollection(
            racingSession.properties.id,
            RelationshipType.RacingSessionHasImage,
            DbNodeType.Image,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const racingSession = await seedNode(ControllerNodeType.RACING_SESSION)

        const relationships = await getRelationshipCollection(
            racingSession.properties.id,
            RelationshipType.RacingSessionHasImage,
            DbNodeType.Image,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.RacingSessionHasImage,
            DbNodeType.Image,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
