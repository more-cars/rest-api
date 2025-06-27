import http from "k6/http"
import {createCarModel} from "./createCarModel.ts"

export function createBrandHasCarModelRelationships(brandId: number, amount: number) {
    for (let i = 0; i < amount; i++) {
        const carModelId = createCarModel()
        const url = `${__ENV.API_URL}/brands/${brandId}/has-car-model/${carModelId}`
        http.post(url)
    }
}
