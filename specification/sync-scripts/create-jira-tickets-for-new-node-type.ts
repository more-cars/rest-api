import {input} from '@inquirer/prompts'
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

    const data = {
        title: "[test] " + params.nodeType,
        description: "test description",
    }

    const storyId = await createStory(data)
    await connectStoryToEpic(storyId, params.epicId)
    console.log('Created Story:', storyId)

    const acceptanceCriterionId = await createAcceptanceCriterion(data, storyId)
    console.log('Created AC:', acceptanceCriterionId)

    const testId = await createTest(data)
    await connectTestToAcceptanceCriterion(testId, acceptanceCriterionId)
    console.log('Created Test:', testId)
}

createTickets().then(r => {
})
