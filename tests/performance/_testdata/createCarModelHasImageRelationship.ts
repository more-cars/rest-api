import http from "k6/http"

export function createCarModelHasImageRelationship(carModelId: number, imageId: number) {
    const url = `${__ENV.API_URL}/car-models/${carModelId}/has-image/${imageId}`
    http.post(url)
}
