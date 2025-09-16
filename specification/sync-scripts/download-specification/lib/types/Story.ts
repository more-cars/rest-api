export type Story = {
    id: string
    parent_id: string
    title: string
    user_story: string
    api_verb: string | null
    api_path: string | null
    response_options: string[]
    description: string
    release_versions: string[]
    created_at: string
    updated_at: string
}
