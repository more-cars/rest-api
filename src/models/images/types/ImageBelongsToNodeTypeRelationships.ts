import type {GenericRelation} from "../../relationships/types/GenericRelation"

export type ImageBelongsToNodeTypeRelationships = {
    companies: GenericRelation[]
    brands: GenericRelation[]
    car_models: GenericRelation[]
    race_tracks: GenericRelation[]
    track_layouts: GenericRelation[]
    racing_series: GenericRelation[]
    racing_events: GenericRelation[]
}
