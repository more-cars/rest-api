import {ControllerNodeType} from "../../../types/ControllerNodeType"

export type ProgrammeNode = {
    node_type: ControllerNodeType.Programme
    fields: {
        id: number
        name: string
        aired_from_year: number | null
        aired_until_year: number | null
        channel: string | null
        total_seasons: number | null
        total_episodes: number | null
        regular_episode_running_time: string | null
        created_at: string
        updated_at: string
    }
}
