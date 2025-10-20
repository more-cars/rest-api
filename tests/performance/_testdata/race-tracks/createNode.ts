import http from "k6/http"

export function createNode() {
    const url = `${__ENV.API_URL}/race-tracks`
    const payload = {
        "name": "Performance Test Race Track"
    }

    const response = http.post(
        url,
        JSON.stringify(payload),
        {headers: {'Content-Type': 'application/json'}}
    )

    // @ts-expect-error TS2531
    return response.json().id
}
