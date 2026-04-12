import {DbNodeType} from "../../../types/DbNodeType"

export type ProgrammeNode = {
    node_type: DbNodeType.Programme,
    properties: {
        id: number
        created_at: string
        updated_at: string
        name: string
        aired_from_year: number | null
        aired_until_year: number | null
        channel: string | null
        total_seasons: number | null
        total_episodes: number | null
        regular_episode_running_time: string | null
        country_code: string | null
    }
}
