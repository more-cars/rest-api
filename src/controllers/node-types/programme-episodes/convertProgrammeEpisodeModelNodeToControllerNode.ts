import type {ProgrammeEpisodeNode as ModelProgrammeEpisodeNode} from "../../../models/node-types/programme-episodes/types/ProgrammeEpisodeNode"
import type {ProgrammeEpisodeNode} from "./types/ProgrammeEpisodeNode"
import {ControllerNodeType} from "../../types/ControllerNodeType"

export function convertProgrammeEpisodeModelNodeToControllerNode(modelNode: ModelProgrammeEpisodeNode): ProgrammeEpisodeNode {
    return {
        node_type: ControllerNodeType.ProgrammeEpisode,
        fields: {
            id: modelNode.attributes.id,
            title: modelNode.attributes.title,
            season_number: modelNode.attributes.season_number ?? null,
            season_episode_number: modelNode.attributes.season_episode_number ?? null,
            original_air_date: modelNode.attributes.original_air_date ?? null,
            duration: modelNode.attributes.duration ?? null,
            created_at: modelNode.attributes.created_at,
            updated_at: modelNode.attributes.updated_at,
        },
    } satisfies ProgrammeEpisodeNode
}
