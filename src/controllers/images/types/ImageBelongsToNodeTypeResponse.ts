import type {RelationshipCollectionResponse} from "../../relationships/types/RelationshipCollectionResponse"

export type ImageBelongsToNodeTypeResponse = {
    "companies": RelationshipCollectionResponse
    "brands": RelationshipCollectionResponse
    "car_models": RelationshipCollectionResponse
}
