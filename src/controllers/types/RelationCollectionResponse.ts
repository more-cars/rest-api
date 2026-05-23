import type {RelationResponseItem} from "./RelationResponseItem"

export type RelationCollectionResponse = {
    links: {
        self: string
    }
    data: RelationResponseItem[]
}
