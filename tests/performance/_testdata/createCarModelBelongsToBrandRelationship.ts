import http from "k6/http"
import {createBrand} from "./createBrand.ts"

export function createCarModelBelongsToBrandRelationship(carModelId: number) {
    const brandId = createBrand()
    const url = `${__ENV.API_URL}/car-models/${carModelId}/belongs-to-brand/${brandId}`
    http.post(url)
}
