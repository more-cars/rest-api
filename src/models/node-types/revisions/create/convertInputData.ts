import type {CreateRevisionInput} from "../types/CreateRevisionInput"
import type {InputRevisionCreate} from "../../../../db/node-types/revisions/types/InputRevisionCreate"

export function convertInputData(data: CreateRevisionInput): InputRevisionCreate {
    return {
        node_type: data.node_type,
        node_id: data.node_id,
        node_created_at: data.node_created_at,
        node_updated_at: data.node_updated_at,
        // TODO add remaining props
    } satisfies InputRevisionCreate
}
