import type {ProgrammeNode as ModelProgrammeNode} from "../../../models/node-types/programmes/types/ProgrammeNode"
import type {ProgrammeNode} from "./types/ProgrammeNode"
import {ControllerNodeType} from "../../types/ControllerNodeType"

export function convertProgrammeModelNodeToControllerNode(modelNode: ModelProgrammeNode): ProgrammeNode {
    return {
        node_type: ControllerNodeType.Programme,
        fields: {
            id: modelNode.attributes.id,
            name: modelNode.attributes.name,
            aired_from_year: modelNode.attributes.aired_from_year ?? null,
            aired_until_year: modelNode.attributes.aired_until_year ?? null,
            channel: modelNode.attributes.channel ?? null,
            total_seasons: modelNode.attributes.total_seasons ?? null,
            total_episodes: modelNode.attributes.total_episodes ?? null,
            regular_episode_running_time: modelNode.attributes.regular_episode_running_time ?? null,
            country_code: modelNode.attributes.country_code ?? null,
            created_at: modelNode.attributes.created_at,
            updated_at: modelNode.attributes.updated_at,
        },
    } satisfies ProgrammeNode
}
