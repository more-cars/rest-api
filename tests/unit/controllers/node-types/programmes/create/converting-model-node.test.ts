import {expect, test} from 'vitest'
import {ProgrammeNode} from "../../../../../../src/models/node-types/programmes/types/ProgrammeNode"
import {ModelNodeType} from "../../../../../../src/models/types/ModelNodeType"
import {convertProgrammeModelNodeToControllerNode} from "../../../../../../src/controllers/node-types/programmes/convertProgrammeModelNodeToControllerNode"
import {ControllerNodeType} from "../../../../../../src/controllers/types/ControllerNodeType"

test("converting a PROGRAMME node", async () => {
    const node: ProgrammeNode = {
        node_type: ModelNodeType.Programme,
        attributes: {
            id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            name: "Top Gear",
            aired_from_year: 2002,
            aired_until_year: 2022,
            channel: "BBC Two",
            total_seasons: 33,
            total_episodes: 240,
            regular_episode_running_time: 60,
        },
    }

    const convertedNode = convertProgrammeModelNodeToControllerNode(node)

    expect(convertedNode)
        .toStrictEqual({
            node_type: ControllerNodeType.Programme,
            fields: {
                id: 1,
                name: "Top Gear",
                aired_from_year: 2002,
                aired_until_year: 2022,
                channel: "BBC Two",
                total_seasons: 33,
                total_episodes: 240,
                regular_episode_running_time: 60,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            },
        })
})
