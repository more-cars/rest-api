import http from "k6/http"

export function createNode() {
    const url = `${__ENV.API_URL}/lap-times`
    const payload = {
        "name": "Performance Test Lap Time"
    }

    const response = http.post(
        url,
        JSON.stringify(payload),
        {headers: {'Content-Type': 'application/json'}}
    )

    // @ts-expect-error TS2531
    return response.json().id
}
