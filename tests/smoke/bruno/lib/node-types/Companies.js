const {post} = require("../apiRequest.js")

exports.create = async function () {
    const response = await post("/companies", {
        name: 'Dummy Company',
    })
    const company = response.data
    bru.setEnvVar('validCompanyId', company.id)

    return company
}
