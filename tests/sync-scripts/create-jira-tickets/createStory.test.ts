import {expect, test} from "vitest"
import {createStory} from "../../../specification/sync-scripts/create-jira-tickets/createStory"

test('Creating a ticket of type "story" in Jira',
    async () => {
        const key = createStory({})

        expect(key).toEqual('MCA-1234')
    }
)
