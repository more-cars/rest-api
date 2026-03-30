export type CreateYouTubeVideoInput = {
    title: string | null,
    description: string | null,
    creator: string | null,
    license: 'youtube' | 'cc by' | null,
    tags: string | null,
    source: string | null,
    duration: string | null,
    thumbnail_url_l: string | null,
    thumbnail_url_m: string | null,
    thumbnail_url_s: string | null,
    thumbnail_url_xs: string | null,
}
