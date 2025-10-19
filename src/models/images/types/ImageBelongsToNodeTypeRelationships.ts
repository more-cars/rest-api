import type {GenericRelation} from "../../relationships/types/GenericRelation"

export type ImageBelongsToNodeTypeRelationships = {
    companies: GenericRelation[]
    brands: GenericRelation[]
    car_models: GenericRelation[]
}
