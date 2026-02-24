import {expect, test} from 'vitest'
import {Integer, Node} from "neo4j-driver"
import {convertRaceTrackNeo4jNodeToDbNode} from "../../../../src/db/node-types/race-tracks/convertRaceTrackNeo4jNodeToDbNode"

test('the Neo4j node is correctly mapped to a More Cars node', async () => {
    const dbNode: Node = {
        identity: new Integer,
        labels: [],
        properties: {
            mc_id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "Lausitzring",
            opened: 2000,
            closed: null,
            type: "permanent race track",
            location: "Klettwitz",
            geo_position: "51°32&#39;0&#34;N 13°55&#39;10&#34;E",
        },
        elementId: "",
    }

    const mappedNode = convertRaceTrackNeo4jNodeToDbNode(dbNode)

    expect(mappedNode)
        .toStrictEqual({
            node_type: "RaceTrack",
            properties: {
                id: 1,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
                name: "Lausitzring",
                opened: 2000,
                closed: null,
                type: "permanent race track",
                location: "Klettwitz",
                geo_position: "51°32&#39;0&#34;N 13°55&#39;10&#34;E",
            },
        })
})
