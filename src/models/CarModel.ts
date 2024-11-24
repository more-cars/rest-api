import {CarModelType} from "../types/CarModelType"

export class CarModel {
    static findById(id: number) {
        if (id === 555) {
            const foundCarModel: CarModelType = {
                id: 555,
                name: "Countach",
            }

            return foundCarModel
        }

        return false
    }
}
