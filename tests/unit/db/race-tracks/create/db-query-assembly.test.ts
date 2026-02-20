import {expect, test} from 'vitest'
import {InputRaceTrackCreate} from "../../../../../src/db/nodes/race-tracks/types/InputRaceTrackCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createDbNode"
import {Neo4jNodeType} from "../../../../../src/db/types/Neo4jNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a RACE TRACK node', async () => {
    const data: InputRaceTrackCreate = {
        name: "Lausitzring",
        opened: 2000,
        closed: null,
        type: "permanent race track",
        location: "Klettwitz",
        geo_position: "51°32'0\"N 13°55'10\"E"
    }

    const query = createNodeQuery(Neo4jNodeType.RaceTrack, data)

    expect(query)
        .toEqual(
            "CREATE (node:RaceTrack_" + appInstanceId + " {\n" +
            "  name: 'Lausitzring',\n" +
            "  opened: 2000,\n" +
            "  closed: null,\n" +
            "  type: 'permanent race track',\n" +
            "  location: 'Klettwitz',\n" +
            "  geo_position: '51°32\\'0\"N 13°55\\'10\"E'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
