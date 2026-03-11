import type {ModelNodeType} from "../../../types/ModelNodeType"

export type ProgrammeEpisodeNode = {
    node_type: ModelNodeType.ProgrammeEpisode
    attributes: {
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
