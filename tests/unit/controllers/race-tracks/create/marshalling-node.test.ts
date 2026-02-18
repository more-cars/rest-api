import {expect, test} from 'vitest'
import {RaceTrackNode} from "../../../../../src/models/race-tracks/types/RaceTrackNode"
import {marshalNode} from "../../../../../src/controllers/node-types/race-tracks/marshalling/marshalNode"

test("marshalling a RACE TRACK node", async () => {
    const node: RaceTrackNode = {
        id: 1,
        created_at: "2025-05-14T11:05:07.793Z",
        updated_at: "2025-05-14T11:05:07.793Z",
        name: "Lausitzring",
        opened: 2000,
        closed: null,
        type: "permanent race track",
        location: "Klettwitz",
        geo_position: "51°32'0\"N 13°55'10\"E",
    }

    const marshalledNode = marshalNode(node)

    expect(marshalledNode)
        .toStrictEqual({
            data: {
                id: 1,
                name: "Lausitzring",
                opened: 2000,
                closed: null,
                type: "permanent race track",
                location: "Klettwitz",
                geo_position: "51°32'0\"N 13°55'10\"E",
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            }
        })
})
