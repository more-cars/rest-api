import {expect, test} from 'vitest'
import {InputRaceTrackCreate} from "../../../../../src/db/node-types/race-tracks/types/InputRaceTrackCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createNeo4jNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a RACE TRACK node', async () => {
    const data: InputRaceTrackCreate = {
        name: "Lausitzring",
        opened: 2000,
        closed: null,
        type: "permanent race track",
        location: "Klettwitz",
        geo_position: "51°32'0\"N 13°55'10\"E",
        country_code: "DE",
    }

    const query = createNodeQuery(DbNodeType.RaceTrack, data, "2025-05-14T11:05:07.793Z")

    expect(query)
        .toEqual(
            "CREATE (n:RaceTrack_A_" + appInstanceId + " {\n" +
            "  name: 'Lausitzring',\n" +
            "  opened: 2000,\n" +
            "  closed: null,\n" +
            "  type: 'permanent race track',\n" +
            "  location: 'Klettwitz',\n" +
            "  geo_position: '51°32\\'0\"N 13°55\\'10\"E',\n" +
            "  country_code: 'DE',\n" +
            "  created_at: '2025-05-14T11:05:07.793Z',\n" +
            "  updated_at: '2025-05-14T11:05:07.793Z'\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
