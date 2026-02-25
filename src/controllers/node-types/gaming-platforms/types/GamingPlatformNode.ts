import {ControllerNodeType} from "../../../types/ControllerNodeType"

export type GamingPlatformNode = {
    node_type: ControllerNodeType.GamingPlatform
    fields: {
        id: number

        name: string
        release_year: number | null
        manufacturer: string | null

        created_at: string
        updated_at: string
    }
}
