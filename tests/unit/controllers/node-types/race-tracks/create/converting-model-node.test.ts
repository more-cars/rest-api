import {expect, test} from 'vitest'
import {RaceTrackNode} from "../../../../../../src/models/node-types/race-tracks/types/RaceTrackNode"
import {ModelNodeType} from "../../../../../../src/models/types/ModelNodeType"
import {convertRaceTrackModelNodeToControllerNode} from "../../../../../../src/controllers/node-types/race-tracks/convertRaceTrackModelNodeToControllerNode"
import {ControllerNodeType} from "../../../../../../src/controllers/types/ControllerNodeType"

test("converting a RACE TRACK node", async () => {
    const node: RaceTrackNode = {
        node_type: ModelNodeType.RaceTrack,
        attributes: {
            id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "Lausitzring",
            opened: 2000,
            closed: null,
            type: "permanent race track",
            location: "Klettwitz",
            geo_position: "51°32'0\"N 13°55'10\"E",
            country_code: "DE",
        }
    }

    const convertedNode = convertRaceTrackModelNodeToControllerNode(node)

    expect(convertedNode)
        .toStrictEqual({
            node_type: ControllerNodeType.RaceTrack,
            fields: {
                id: 1,
                name: "Lausitzring",
                opened: 2000,
                closed: null,
                type: "permanent race track",
                location: "Klettwitz",
                geo_position: "51°32'0\"N 13°55'10\"E",
                country_code: "DE",
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            }
        })
})
