import {ControllerNodeType} from "../../../types/ControllerNodeType"

export type ProgrammeEpisodeNode = {
    node_type: ControllerNodeType.ProgrammeEpisode
    fields: {
        id: number
        title: string
        season_number: number | null
        season_episode_number: number | null
        original_air_date: string | null
        duration: string | null
        created_at: string
        updated_at: string
    }
}
