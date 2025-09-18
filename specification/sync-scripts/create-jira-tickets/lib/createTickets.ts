import type {TicketTree} from "./types/TicketTree"
import {updateEpic} from "./updateEpic"
import {createStory} from "./createStory"
import {connectStoryToEpic} from "./connectStoryToEpic"
import {createAcceptanceCriterion} from "./createAcceptanceCriterion"
import {createTest} from "./createTest"
import {connectTestToAcceptanceCriterion} from "./connectTestToAcceptanceCriterion"

export async function createTickets(data: TicketTree) {
    const createdStories = []
    const createdAcs = []
    const createdTests = []

    await updateEpic(data.epic)

    for (const story of data.epic.stories) {
        const storyId = await createStory(story)
        createdStories.push(storyId)
        await connectStoryToEpic(storyId, data.epic.jiraId)

        for (const acceptanceCriterion of story.acceptanceCriteria) {
            const acceptanceCriterionId = await createAcceptanceCriterion(acceptanceCriterion, storyId)
            createdAcs.push(acceptanceCriterionId)

            for (const test of acceptanceCriterion.tests) {
                const testId = await createTest(test)
                createdTests.push(testId)
                await connectTestToAcceptanceCriterion(testId, acceptanceCriterionId)
            }
        }
    }

    return {
        epicId: data.epic.jiraId,
        stories: createdStories,
        acceptanceCriteria: createdAcs,
        tests: createdTests,
    }
}
