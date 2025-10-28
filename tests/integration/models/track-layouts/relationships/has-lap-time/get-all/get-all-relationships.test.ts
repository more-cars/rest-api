import {describe, expect, test} from 'vitest'
import {TrackLayout} from "../../../../../../../src/models/track-layouts/TrackLayout"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-lap-time‹ relationships', () => {
    test('node and relationships exist', async () => {
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
        await seedRelationshipForStartNode(trackLayout.id, NodeTypeEnum.LAP_TIME, DbRelationship.TrackLayoutHasLapTime)
        await seedRelationshipForStartNode(trackLayout.id, NodeTypeEnum.LAP_TIME, DbRelationship.TrackLayoutHasLapTime)

        const relationships = await TrackLayout.getAllHasLapTimeRelationships(trackLayout.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

        const relationships = await TrackLayout.getAllHasLapTimeRelationships(trackLayout.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(TrackLayout.getAllHasLapTimeRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
