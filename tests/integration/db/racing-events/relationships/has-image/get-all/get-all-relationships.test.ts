import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipsForSpecificNode} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
        await seedRelationshipForStartNode(racingEvent.id, NodeTypeEnum.IMAGE, DbRelationship.RacingEventHasImage)
        await seedRelationshipForStartNode(racingEvent.id, NodeTypeEnum.IMAGE, DbRelationship.RacingEventHasImage)

        const relationships = await getRelationshipsForSpecificNode(
            racingEvent.id,
            DbRelationship.RacingEventHasImage,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

        const relationships = await getRelationshipsForSpecificNode(
            racingEvent.id,
            DbRelationship.RacingEventHasImage,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipsForSpecificNode(
            -42,
            DbRelationship.RacingEventHasImage,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
