import type {RelType} from "./RelType"
import {DbNode} from "../../../db/types/DbNode"

export type Rel = {
    id: number
    type: RelType
    origin: DbNode
    destination: DbNode
    created_at: string
    updated_at: string
}
