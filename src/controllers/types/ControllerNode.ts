import {ControllerNodeType} from "./ControllerNodeType"

export type ControllerNode = {
    node_type: ControllerNodeType
    fields: {
        id: number

        [key: string]: string | number | boolean | null

        created_at: string
        updated_at: string
    }
}
