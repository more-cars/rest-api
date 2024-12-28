import {getCarModelNodeById} from "../db/getCarModelNodeById"
import {CarModelType} from "../types/CarModelType"

export class CarModel {
    static async findById(id: number) {
        const dbNode = await getCarModelNodeById(id)

        if (!dbNode) {
            return false
        }

        const node: CarModelType = {
            mc_id: dbNode.mc_id,
            name: dbNode.name,
        }

        return node
    }
}
