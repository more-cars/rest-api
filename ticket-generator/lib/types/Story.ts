export type Story = {
    title: string
    userStory: string | null
    specificationList: Array<string>
    apiVerb: string
    apiPath: string
    responseOptions: string[]
}
