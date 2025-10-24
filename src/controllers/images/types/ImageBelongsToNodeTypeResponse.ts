import type {RelationshipCollectionResponse} from "../../relationships/types/RelationshipCollectionResponse"

export type ImageBelongsToNodeTypeResponse = {
    data: {
        "companies": RelationshipCollectionResponse
        "brands": RelationshipCollectionResponse
        "car_models": RelationshipCollectionResponse
        "race_tracks": RelationshipCollectionResponse
        "track_layouts": RelationshipCollectionResponse
        "racing_series": RelationshipCollectionResponse
        "racing_events": RelationshipCollectionResponse
    }
}
