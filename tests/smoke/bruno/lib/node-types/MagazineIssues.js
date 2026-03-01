const {post} = require("../apiRequest.js")

exports.create = async function (prefix = '') {
    const response = await post("/magazine-issues", {
        title: 'Dummy Magazine Issue',
    })
    const magazineIssue = response.data
    bru.setEnvVar('valid' + prefix + 'MagazineIssueId', magazineIssue.id)

    return magazineIssue
}
