import type {Rel} from "../../../relationships/types/Rel"

export type ImageBelongsToNodeTypeRelationships = {
    companies: Rel[]
    brands: Rel[]
    car_models: Rel[]
    car_model_variants: Rel[]
    race_tracks: Rel[]
    track_layouts: Rel[]
    racing_series: Rel[]
    racing_events: Rel[]
    racing_sessions: Rel[]
    session_results: Rel[]
    lap_times: Rel[]
    racing_games: Rel[]
    gaming_platforms: Rel[]
}
