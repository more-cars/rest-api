import {expect, test} from 'vitest'
import {ProgrammeEpisodeNode} from "../../../../../../src/models/node-types/programme-episodes/types/ProgrammeEpisodeNode"
import {ModelNodeType} from "../../../../../../src/models/types/ModelNodeType"
import {convertProgrammeEpisodeModelNodeToControllerNode} from "../../../../../../src/controllers/node-types/programme-episodes/convertProgrammeEpisodeModelNodeToControllerNode"
import {ControllerNodeType} from "../../../../../../src/controllers/types/ControllerNodeType"

test("converting a PROGRAMME EPISODE node", async () => {
    const node: ProgrammeEpisodeNode = {
        node_type: ModelNodeType.ProgrammeEpisode,
        attributes: {
            id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            title: "The Falls Guys",
            season_number: 2,
            season_episode_number: 2,
            original_air_date: "2017-12-08",
            duration: "PT55M",
        },
    }

    const convertedNode = convertProgrammeEpisodeModelNodeToControllerNode(node)

    expect(convertedNode)
        .toStrictEqual({
            node_type: ControllerNodeType.ProgrammeEpisode,
            fields: {
                id: 1,
                title: "The Falls Guys",
                season_number: 2,
                season_episode_number: 2,
                original_air_date: "2017-12-08",
                duration: "PT55M",
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            },
        })
})
