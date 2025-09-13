import type {TicketTree} from "../../lib/types/TicketTree"
import {updateEpic} from "../../lib/updateEpic"
import {createStory} from "../../lib/createStory"
import {connectStoryToEpic} from "../../lib/connectStoryToEpic"
import {createAcceptanceCriterion} from "../../lib/createAcceptanceCriterion"
import {createTest} from "../../lib/createTest"
import {connectTestToAcceptanceCriterion} from "../../lib/connectTestToAcceptanceCriterion"

export async function createCreateNodeTickets(data: TicketTree) {
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
