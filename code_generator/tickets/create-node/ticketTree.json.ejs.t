---
to: specification/sync-scripts/create-jira-tickets/ticketTree.json
---
<%
    const dataStructure = []
    for (prop in properties) {
        dataStructure.push(Object.assign({}, {name: prop}, properties[prop]))
    }
%>
{
    "epic": {
        "jiraId": "<%= h.changeCase.upper(h.changeCase.kebab(epicId)) %>",
        "dataStructure": <%- JSON.stringify(dataStructure, null, 2) %>,
        "stories": [{
            "title": "Create <%= h.changeCase.upper(nodeType) %> Node",
            "userStory": "As an API contributor\nI want to be able to create <%= h.changeCase.upper(nodeType) %> nodes\nSo I can fill gaps in the database",
            "description": "TODO...",
            "apiVerb": "POST",
            "apiPath": "/<%= h.changeCase.kebab(nodeType) %>",
            "responseOptions": [
                "201",
                "400",
                "422"
            ],
            "acceptanceCriteria": [
                {
                    "title": "<%= h.changeCase.upper(nodeType) %> is created when valid data was provided",
                    "description": "Data is valid when its structure is correct, has no syntax errors and contains all mandatory fields.",
                    "responseCode": "201",
                    "tests": [
                        {
                            "title": "Creating a <%= h.changeCase.upper(nodeType) %> with valid data",
                            <%
                                const gherkin = []
                                gherkin.push('When the user creates a \\"' + h.changeCase.upper(nodeType) + '\\" \\"' + exampleName + '\\" with the following valid data')
                                gherkin.push('  | key | value | datatype |')
                                for (prop in properties) {
                                    gherkin.push('  | ' + prop + ' | ' + properties[prop].example + ' | ' + properties[prop].datatype + ' |')
                                }
                                gherkin.push('Then the response should return the \\"' + h.changeCase.upper(nodeType) + '\\" \\"' + exampleName + '\\"')
                                gherkin.push('And the response should return with status code 201')
                                gherkin.push('When the user requests the \\"' + h.changeCase.upper(nodeType) + '\\" \\"' + exampleName + '\\"')
                                gherkin.push('Then the response should return the \\"' + h.changeCase.upper(nodeType) + '\\" \\"' + exampleName + '\\"')
                            %>
                            "gherkin": "<%- gherkin.join('\\n') %>"
                        }
                    ]
                }
            ]
        }]
    }
}
