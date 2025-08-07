import http from "k6/http"
import {createCarModel} from "./createCarModel.ts"

export function createImageBelongsToNodeRelationships(imageId: number, amount: number) {
    for (let i = 0; i < amount; i++) {
        const nodeId = createCarModel()
        const url = `${__ENV.API_URL}/images/${imageId}/belongs-to-node/${nodeId}`
        http.post(url)
    }
}
