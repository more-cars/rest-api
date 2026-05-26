import type {ControllerNodeType} from "./ControllerNodeType"

export type RelationResponseItem = {
    type: ControllerNodeType
    id: number
    attributes: Record<string, string | number | boolean | null>
    data: object
}
