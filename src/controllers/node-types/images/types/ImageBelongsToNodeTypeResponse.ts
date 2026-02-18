import type {RelationCollectionResponse} from "../../../relations/types/RelationCollectionResponse"

export type ImageBelongsToNodeTypeResponse = {
    data: {
        "companies": RelationCollectionResponse
        "brands": RelationCollectionResponse
        "car_models": RelationCollectionResponse
        "race_tracks": RelationCollectionResponse
        "track_layouts": RelationCollectionResponse
        "racing_series": RelationCollectionResponse
        "racing_events": RelationCollectionResponse
    }
}
