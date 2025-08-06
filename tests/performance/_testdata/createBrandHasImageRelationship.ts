import http from "k6/http"

export function createBrandHasImageRelationship(brandId: number, imageId: number) {
    const url = `${__ENV.API_URL}/brands/${brandId}/has-image/${imageId}`
    http.post(url)
}
