import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipsForSpecificNode} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)
        await seedRelationshipForStartNode(trackLayout.id, NodeTypeEnum.IMAGE, DbRelationship.TrackLayoutHasImage)
        await seedRelationshipForStartNode(trackLayout.id, NodeTypeEnum.IMAGE, DbRelationship.TrackLayoutHasImage)

        const relationships = await getRelationshipsForSpecificNode(
            trackLayout.id,
            DbRelationship.TrackLayoutHasImage,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

        const relationships = await getRelationshipsForSpecificNode(
            trackLayout.id,
            DbRelationship.TrackLayoutHasImage,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipsForSpecificNode(
            -42,
            DbRelationship.TrackLayoutHasImage,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
