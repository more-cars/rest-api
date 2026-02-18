import {describe, expect, test} from 'vitest'
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Requesting a ›has-prime-image‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(NodeTypeEnum.TRACK_LAYOUT, NodeTypeEnum.IMAGE, RelationshipType.TrackLayoutHasPrimeImage)
        const expectedTrackLayoutId = expectedRelationship.start_node_id
        const expectedImageId = expectedRelationship.end_node_id
        const actualRelationship = await TrackLayout.getHasPrimeImageRelationship(expectedTrackLayoutId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.id)
            .toBe(expectedTrackLayoutId)

        expect(actualRelationship.destination.id)
            .toBe(expectedImageId)
    })

    test('node exists, but not the relationship', async () => {
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

        await expect(TrackLayout.getHasPrimeImageRelationship(trackLayout.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(TrackLayout.getHasPrimeImageRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
