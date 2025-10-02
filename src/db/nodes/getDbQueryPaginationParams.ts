import type {NodeCollectionConstraints} from "../../models/types/NodeCollectionConstraints"
import type {CollectionQueryParams} from "../types/CollectionQueryParams"

export function getDbQueryPaginationParams(constraints: NodeCollectionConstraints = {page: 1}): CollectionQueryParams {
    const limit = 100
    const offset = (constraints.page - 1) * limit

    return {
        offset,
        limit,
    }
}
