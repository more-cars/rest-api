import type {RelationshipCollectionResponse} from "../../relationships/types/RelationshipCollectionResponse"

export type ImageBelongsToNodeTypeResponse = {
    data: {
        "companies": RelationshipCollectionResponse
        "brands": RelationshipCollectionResponse
        "car_models": RelationshipCollectionResponse
    }
}
