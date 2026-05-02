import type {CreateRevisionInput} from "../types/CreateRevisionInput"
import type {InputRevisionCreate} from "../../../../db/node-types/revisions/types/InputRevisionCreate"

export function convertInputData(data: CreateRevisionInput): InputRevisionCreate {
    return data as InputRevisionCreate
}
