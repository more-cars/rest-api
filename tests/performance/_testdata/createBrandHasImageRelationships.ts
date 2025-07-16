import http from "k6/http"
import {createImage} from "./createImage.ts"

export function createBrandHasImageRelationships(brandId: number, amount: number) {
    for (let i = 0; i < amount; i++) {
        const imageId = createImage()
        const url = `${__ENV.API_URL}/brands/${brandId}/has-image/${imageId}`
        http.post(url)
    }
}
