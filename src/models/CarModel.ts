import {getCarModelNodeById} from "../db/getCarModelNodeById"

export class CarModel {
    static async findById(id: number) {
        return await getCarModelNodeById(id)
    }
}
