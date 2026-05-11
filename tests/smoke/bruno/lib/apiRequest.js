exports.post = async function (path, data) {
    const response = await fetch(bru.getEnvVar('baseUrl') + path, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    let responseBody = await response.text()
    try {
        responseBody = JSON.parse(responseBody)
    } catch (e) {

    }

    return responseBody
}

exports.del = async function (path) {
    const response = await fetch(bru.getEnvVar('baseUrl') + path, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    })

    let responseBody = await response.text()
    try {
        responseBody = JSON.parse(responseBody)
    } catch (e) {

    }

    return responseBody
}
