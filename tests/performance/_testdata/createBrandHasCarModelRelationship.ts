import http from "k6/http"

export function createBrandHasCarModelRelationship(brandId: number, carModelId: number) {
    const url = `${__ENV.API_URL}/brands/${brandId}/has-car-model/${carModelId}`
    http.post(url)
}
