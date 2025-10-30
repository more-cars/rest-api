import http from "k6/http"

export function createNode() {
    const url = `${__ENV.API_URL}/car-model-variants`
    const payload = {
        "name": "Performance Test Car Model Variant"
    }

    const response = http.post(
        url,
        JSON.stringify(payload),
        {headers: {'Content-Type': 'application/json'}}
    )

    // @ts-expect-error TS2531
    return response.json().id
}
