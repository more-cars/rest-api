import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipsForSpecificNode} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)
        await seedRelationshipForStartNode(racingSession.id, NodeTypeEnum.IMAGE, DbRelationship.RacingSessionHasImage)
        await seedRelationshipForStartNode(racingSession.id, NodeTypeEnum.IMAGE, DbRelationship.RacingSessionHasImage)

        const relationships = await getRelationshipsForSpecificNode(
            racingSession.id,
            DbRelationship.RacingSessionHasImage,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)

        const relationships = await getRelationshipsForSpecificNode(
            racingSession.id,
            DbRelationship.RacingSessionHasImage,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipsForSpecificNode(
            -42,
            DbRelationship.RacingSessionHasImage,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
