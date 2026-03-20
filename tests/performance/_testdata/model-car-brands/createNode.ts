import http from "k6/http"

export function createNode() {
    const url = `${__ENV.API_URL}/model-car-brands`
    const payload = {
        "name": "Performance Test Model Car Brand"
    }

    const response = http.post(
        url,
        JSON.stringify(payload),
        {headers: {'Content-Type': 'application/json'}}
    )

    // @ts-expect-error TS2531
    return response.json().id
}
