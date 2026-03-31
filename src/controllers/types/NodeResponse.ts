import {ControllerNodeType} from "./ControllerNodeType"

export type NodeResponse = {
    type: ControllerNodeType
    id: number
    attributes: {
        [key: string]: string | number | boolean | null
        created_at: string
        updated_at: string
    }
    links: {
        self: string
    }
}
