import {expect, test} from 'vitest'
import {InputRaceTrackCreate} from "../../../../../src/db/node-types/race-tracks/types/InputRaceTrackCreate"
import {createNodeQuery} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('single quotes are correctly escaped', async () => {
    const data: InputRaceTrackCreate = {
        name: "'Lausitzring",
        opened: null,
        closed: null,
        type: "'permanent race track",
        location: "'Klettwitz",
        geo_position: "'51°32'0\"N 13°55'10\"E"
    }

    const query = createNodeQuery(DbNodeType.RaceTrack, data)

    expect(query)
        .toEqual(
            "CREATE (node:RaceTrack_" + appInstanceId + " {\n" +
            "  name: '\\'Lausitzring',\n" +
            "  opened: null,\n" +
            "  closed: null,\n" +
            "  type: '\\'permanent race track',\n" +
            "  location: '\\'Klettwitz',\n" +
            "  geo_position: '\\'51°32\\'0\"N 13°55\\'10\"E'\n" +
            "})\n" +
            "RETURN node\n" +
            "  LIMIT 1")
})
