import http from "k6/http"

export function createImage() {
    const url = `${__ENV.API_URL}/images`
    const payload = {
        "image_provider": "performance-test",
        "external_id": "123456789",
    }

    const response = http.post(
        url,
        JSON.stringify(payload),
        {headers: {'Content-Type': 'application/json'}}
    )

    // @ts-expect-error TS2531
    return response.json().data.id
}
