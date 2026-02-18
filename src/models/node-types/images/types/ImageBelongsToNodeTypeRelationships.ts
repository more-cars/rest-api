import type {Rel} from "../../../relationships/types/Rel"

export type ImageBelongsToNodeTypeRelationships = {
    companies: Rel[]
    brands: Rel[]
    car_models: Rel[]
    race_tracks: Rel[]
    track_layouts: Rel[]
    racing_series: Rel[]
    racing_events: Rel[]
}
