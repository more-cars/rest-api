import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

describe('Requesting a ›has-prime-image‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(NodeTypeEnum.TRACK_LAYOUT, NodeTypeEnum.IMAGE, DbRelationship.TrackLayoutHasPrimeImage)

        const relationships = await getRelationshipCollection(
            relationship.start_node_id,
            DbRelationship.TrackLayoutHasPrimeImage,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

        const relationships = await getRelationshipCollection(
            trackLayout.id,
            DbRelationship.TrackLayoutHasPrimeImage,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            DbRelationship.TrackLayoutHasPrimeImage,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
