import type {NodeCollectionConstraints} from "../../models/types/NodeCollectionConstraints"
import type {CollectionQueryParams} from "../types/CollectionQueryParams"

export function getDbQueryCollectionParams(constraints: NodeCollectionConstraints = {}): CollectionQueryParams {
    const sortByProperty = (constraints.sortByProperty || "mc_id").replace("mc_id", "id")
    const sortDirection = (constraints.sortDirection || "ASC").toUpperCase()

    const page = constraints.page || 1
    const limit = 100
    const offset = (page - 1) * limit

    return {
        sortByProperty,
        sortDirection,
        offset,
        limit,
    }
}
