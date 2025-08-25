import {input} from '@inquirer/prompts'
import type {Story} from "./create-jira-tickets/Story"
import type {AcceptanceCriterion} from "./create-jira-tickets/AcceptanceCriterion"
import type {Test} from "./create-jira-tickets/Test"
import {createStory} from "./create-jira-tickets/createStory"
import {connectStoryToEpic} from "./create-jira-tickets/connectStoryToEpic"
import {createAcceptanceCriterion} from "./create-jira-tickets/createAcceptanceCriterion"
import {createTest} from "./create-jira-tickets/createTest"
import {connectTestToAcceptanceCriterion} from "./create-jira-tickets/connectTestToAcceptanceCriterion"

async function createTickets() {
    const params = {
        nodeType: await input({message: "Name of the new node type?", required: true}),
        epicId: await input({message: "ID of the existing Jira epic?", required: true}),
    }

    const storyData: Story = {
        title: "[test] Create " + params.nodeType.toUpperCase() + ' Node Type',
        userStory: `As a ...
I want to be able to ...
So I can ...`,
        description: "test description",
        apiVerb: '10187', // POST
        apiPath: '/' + params.nodeType.toLowerCase(),
        responseOptions: [
            '201',
            '404',
        ]
    }

    const storyId = await createStory(storyData)
    await connectStoryToEpic(storyId, params.epicId)
    console.log('Created Story:', storyId)

    const acData: AcceptanceCriterion = {
        title: "[test] AC for new node type " + params.nodeType.toUpperCase(),
        description: "test description",
        responseCode: '10253' // 201
    }
    const acceptanceCriterionId = await createAcceptanceCriterion(acData, storyId)
    console.log('Created AC:', acceptanceCriterionId)

    const testData: Test = {
        title: "[test] Test for new node type " + params.nodeType.toUpperCase(),
        description: "test description",
    }
    const testId = await createTest(testData)
    await connectTestToAcceptanceCriterion(testId, acceptanceCriterionId)
    console.log('Created Test:', testId)
}

createTickets().then(r => {
})
