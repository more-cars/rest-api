import http from "k6/http"

export function createImageBelongsToNodeRelationship(imageId: number, nodeId: number) {
    const url = `${__ENV.API_URL}/images/${imageId}/belongs-to-node/${nodeId}`
    http.post(url)
}
