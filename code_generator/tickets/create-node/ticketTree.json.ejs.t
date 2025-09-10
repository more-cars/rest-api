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
                    "title": "Requests to create a <%= h.changeCase.upper(nodeType) %> are accepted when the provided data is valid",
                    "description": "Data is valid when its structure is correct, has no syntax errors and contains all mandatory fields.",
                    "responseCode": "201",
                    "tests": [
                        {
                            "title": "Creating a <%= h.changeCase.upper(nodeType) %> with valid data",
                            <%
                                const gherkin = []
                                gherkin.push('When the user creates a \\"' + h.changeCase.upper(nodeType) + '\\" \\"' + exampleName + '\\" with the following data')
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
                }, {
                    "title": "Requests to create a <%= h.changeCase.upper(nodeType) %> are rejected when the provided data is invalid",
                    "description": "Data is invalid when its structure is incorrect, has syntax errors or does not contain all mandatory fields.",
                    "responseCode": "400",
                    "tests": [
                        {
                            "title": "Trying to create a <%= h.changeCase.upper(nodeType) %> with missing mandatory information",
                            <%
                                const gherkin = []
                                gherkin.push('When the user tries to create a \\"' + h.changeCase.upper(nodeType) + '\\" \\"' + exampleName + '\\" with the following data')
                                gherkin.push('  | key | value | datatype |')
                                gherkin.push('Then the response should return with status code 400')
                            %>
                            "gherkin": "<%- gherkin.join('\\n') %>"
                        }, {
                            "title": "Trying to create a <%= h.changeCase.upper(nodeType) %> with invalid data types",
                            <%
                                const gherkin = []
                                gherkin.push('When the user tries to create a \\"' + h.changeCase.upper(nodeType) + '\\" \\"' + exampleName + '\\" with the following data')
                                gherkin.push('  | key | value | datatype |')
                                for (prop in properties) {
                                   gherkin.push('  | ' + prop + ' | ' + properties[prop].example + ' | boolean |')
                                }
                                gherkin.push('Then the response should return with status code 400')
                            %>
                            "gherkin": "<%- gherkin.join('\\n') %>"
                        }, {
                            "title": "Trying to create a <%= h.changeCase.upper(nodeType) %> with malformed data",
                            <%
                                const gherkin = []
                                gherkin.push('When the user tries to create a \\"' + h.changeCase.upper(nodeType) + '\\" \\"' + exampleName + '\\" with the following data')
                                gherkin.push('  | key | value | datatype |')
                                for (prop in properties) {
                                  gherkin.push('  | ' + prop + ' | ;' + properties[prop].example + ' | ' + properties[prop].datatype + ' |')
                                }
                                gherkin.push('Then the response should return with status code 400')
                            %>
                            "gherkin": "<%- gherkin.join('\\n') %>"
                        }
                    ]
                }, {
                    "title": "The response contains all specified properties when creating a <%= h.changeCase.upper(nodeType) %>",
                    "description": "All properties are returned that are specified in the epic <%= h.changeCase.upper(h.changeCase.kebab(epicId)) %>. When properties are empty they are returned with null values. IDs, timestamp and other meta information might be included too, but is not in the scope of this AC.",
                    "responseCode": "201",
                    "tests": [
                        {
                            "title": "Expecting all properties to be returned when creating a <%= h.changeCase.upper(nodeType) %>",
                            <%
                                const gherkin = []
                                gherkin.push('When the user creates a \\"' + h.changeCase.upper(nodeType) + '\\" \\"' + exampleName + '\\" with the following data')
                                gherkin.push('  | key | value | datatype |')
                                for (prop in properties) {
                                    gherkin.push('  | ' + prop + ' | ' + properties[prop].example + ' | ' + properties[prop].datatype + ' |')
                                }
                                gherkin.push('Then the response should contain the following properties')
                                gherkin.push('  | key | value |')
                                for (prop in properties) {
                                    gherkin.push('  | ' + prop + ' | ' + properties[prop].example + ' |')
                                }
                            %>
                            "gherkin": "<%- gherkin.join('\\n') %>"
                        }, {
                            "title": "Expecting empty properties to be returned as null values when creating a <%= h.changeCase.upper(nodeType) %>",
                            <%
                                const gherkin = []
                                gherkin.push('When the user creates a \\"' + h.changeCase.upper(nodeType) + '\\" \\"' + exampleName + '\\" with the following data')
                                gherkin.push('  | key | value | datatype |')
                                for (prop in properties) {
                                    if (properties[prop].mandatory) {
                                        gherkin.push('  | ' + prop + ' | ' + properties[prop].example + ' | ' + properties[prop].datatype + ' |')
                                    }
                                }
                                gherkin.push('Then the response should contain the following properties')
                                gherkin.push('  | key | value |')
                                for (prop in properties) {
                                    if (properties[prop].mandatory) {
                                        gherkin.push('  | ' + prop + ' | ' + properties[prop].example + ' |')
                                    } else {
                                        gherkin.push('  | ' + prop + ' | |')
                                    }
                                }
                            %>
                            "gherkin": "<%- gherkin.join('\\n') %>"
                        }
                    ]
                }, {
                    "title": "Unknown properties are ignored when creating a <%= h.changeCase.upper(nodeType) %>",
                    "description": "The user can provide properties that are not specified in the epic <%= h.changeCase.upper(h.changeCase.kebab(epicId)) %>, but they will be completely ignored. They will not be processed and there will be no info, warning or error that they were skipped.",
                    "responseCode": "201",
                    "tests": [
                        {
                            "title": "Expecting unknown properties to be ignored when creating a <%= h.changeCase.upper(nodeType) %>",
                            <%
                                const gherkin = []
                                gherkin.push('When the user creates a \\"' + h.changeCase.upper(nodeType) + '\\" \\"' + exampleName + '\\" with the following data')
                                gherkin.push('  | key | value | datatype |')
                                for (prop in properties) {
                                    gherkin.push('  | ' + prop + ' | ' + properties[prop].example + ' | ' + properties[prop].datatype + ' |')
                                }
                                gherkin.push('  | thimbleweed | park | string |')
                                gherkin.push('Then the response should contain the following properties')
                                gherkin.push('  | key | value |')
                                for (prop in properties) {
                                    gherkin.push('  | ' + prop + ' | ' + properties[prop].example + ' |')
                                }
                                gherkin.push('And the response should NOT contain the following keys')
                                gherkin.push('  | key         |')
                                gherkin.push('  | thimbleweed |')
                            %>
                            "gherkin": "<%- gherkin.join('\\n') %>"
                        }
                    ]
                }, {
                    "title": "Read-only properties cannot be overridden by the user when creating a <%= h.changeCase.upper(nodeType) %>",
                    "description": "Read-only properties are for example `ID`, `created_at` and `updated_at`. Analog to unknown properties, those fields will be ignored. They will not be processed and there will be no info, warning or error that they were skipped.",
                    "responseCode": "201",
                    "tests": [
                        {
                            "title": "Expecting read-only properties to be ignored when creating a <%= h.changeCase.upper(nodeType) %>",
                            <%
                                const gherkin = []
                                gherkin.push('When the user creates a \\"' + h.changeCase.upper(nodeType) + '\\" \\"' + exampleName + '\\" with the following data')
                                gherkin.push('  | key | value | datatype |')
                                for (prop in properties) {
                                    gherkin.push('  | ' + prop + ' | ' + properties[prop].example + ' | ' + properties[prop].datatype + ' |')
                                }
                                gherkin.push('  | id         | 1234       | number |')
                                gherkin.push('  | created_at | 2025-01-01 | string |')
                                gherkin.push('  | updated_at | 2025-01-01 | string |')
                                gherkin.push('Then the response should contain the following keys')
                                gherkin.push('  | id         |')
                                gherkin.push('  | created_at |')
                                gherkin.push('  | updated_at |')
                                gherkin.push('But the response should NOT contain the following properties')
                                gherkin.push('  | id         | 1234       |')
                                gherkin.push('  | created_at | 2025-01-01 |')
                                gherkin.push('  | updated_at | 2025-01-01 |')
                            %>
                            "gherkin": "<%- gherkin.join('\\n') %>"
                        }
                    ]
                }
            ]
        }]
    }
}
