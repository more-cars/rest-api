import type {RelationCollectionResponse} from "../../../types/RelationCollectionResponse"

export type ImageBelongsToNodeTypeResponse = {
    data: {
        "companies": RelationCollectionResponse
        "brands": RelationCollectionResponse
        "car_models": RelationCollectionResponse
        "car_model_variants": RelationCollectionResponse
        "race_tracks": RelationCollectionResponse
        "track_layouts": RelationCollectionResponse
        "racing_series": RelationCollectionResponse
        "racing_events": RelationCollectionResponse
        "racing_sessions": RelationCollectionResponse
        "session_results": RelationCollectionResponse
        "lap_times": RelationCollectionResponse
        "racing_games": RelationCollectionResponse
        "gaming_platforms": RelationCollectionResponse
    }
}
