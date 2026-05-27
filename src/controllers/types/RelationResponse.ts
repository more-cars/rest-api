import type {ControllerNodeType} from "./ControllerNodeType"

export type RelationResponse = {
    links: {
        self: string
        related?: string
    }
    data: null | {
        type: ControllerNodeType
        id: number
        attributes: Record<string, string | number | boolean | null>
    }
}
