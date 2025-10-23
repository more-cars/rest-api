import http from "k6/http"

export function createNode() {
    const url = `${__ENV.API_URL}/racing-series`
    const payload = {
        "name": "Performance Test Racing Series"
    }

    const response = http.post(
        url,
        JSON.stringify(payload),
        {headers: {'Content-Type': 'application/json'}}
    )

    // @ts-expect-error TS2531
    return response.json().id
}
