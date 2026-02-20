import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {Neo4jNodeType} from "../../../../../../../src/db/types/Neo4jNodeType"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const raceTrack = await seedNode(ControllerNodeType.RACE_TRACK)
        await seedRelationshipForStartNode(raceTrack.id, ControllerNodeType.IMAGE, RelationshipType.RaceTrackHasImage)
        await seedRelationshipForStartNode(raceTrack.id, ControllerNodeType.IMAGE, RelationshipType.RaceTrackHasImage)

        const relationships = await getRelationshipCollection(
            raceTrack.id,
            RelationshipType.RaceTrackHasImage,
            Neo4jNodeType.Image,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const raceTrack = await seedNode(ControllerNodeType.RACE_TRACK)

        const relationships = await getRelationshipCollection(
            raceTrack.id,
            RelationshipType.RaceTrackHasImage,
            Neo4jNodeType.Image,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.RaceTrackHasImage,
            Neo4jNodeType.Image,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
