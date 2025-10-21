import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipsForSpecificNode} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)
        await seedRelationshipForStartNode(raceTrack.id, NodeTypeEnum.IMAGE, DbRelationship.RaceTrackHasImage)
        await seedRelationshipForStartNode(raceTrack.id, NodeTypeEnum.IMAGE, DbRelationship.RaceTrackHasImage)

        const relationships = await getRelationshipsForSpecificNode(
            raceTrack.id,
            DbRelationship.RaceTrackHasImage,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)

        const relationships = await getRelationshipsForSpecificNode(
            raceTrack.id,
            DbRelationship.RaceTrackHasImage,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipsForSpecificNode(
            -42,
            DbRelationship.RaceTrackHasImage,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
