import {DbNodeType} from "../../../types/DbNodeType"

export type ProgrammeEpisodeNode = {
    node_type: DbNodeType.ProgrammeEpisode,
    properties: {
        id: number
        created_at: string
        updated_at: string
        title: string
        season_number: number | null
        season_episode_number: number | null
        original_air_date: string | null
        duration: string | null
    }
}
