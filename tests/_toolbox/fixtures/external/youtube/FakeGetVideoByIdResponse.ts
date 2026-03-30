import type {YouTubeVideoItem} from "../../../../../src/db/external/youtube/types/YouTubeVideoItem"

export const FakeGetVideoByIdResponse = {
    items: [{
        kind: 'youtube#video',
        id: 'zbZ9iYWReZA',
        snippet: {
            publishedAt: '2026-03-29T23:01:00Z',
            channelId: 'UC8AMAhCRmep7VJKe1sxvHFg',
            title: 'Chris Harris on Cars: Aston Martin Valhalla',
            description: "First drive of Aston's 1000hp hybrid supercar.",
            thumbnails: {
                default: {
                    url: 'https://i.ytimg.com/vi/zbZ9iYWReZA/default.jpg',
                    width: 120,
                    height: 90
                },
                medium: {
                    url: 'https://i.ytimg.com/vi/zbZ9iYWReZA/mqdefault.jpg',
                    width: 320,
                    height: 180
                },
                high: {
                    url: 'https://i.ytimg.com/vi/zbZ9iYWReZA/hqdefault.jpg',
                    width: 480,
                    height: 360
                },
                standard: {
                    url: 'https://i.ytimg.com/vi/zbZ9iYWReZA/sddefault.jpg',
                    width: 640,
                    height: 480
                },
                maxres: {
                    url: 'https://i.ytimg.com/vi/zbZ9iYWReZA/maxresdefault.jpg',
                    width: 1280,
                    height: 720
                }
            },
            channelTitle: 'Chris Harris on Cars',
            tags: []
        },
        contentDetails: {
            duration: 'PT28M6S',
            definition: 'hd',
        },
        status: {
            license: 'youtube',
        }
    } satisfies YouTubeVideoItem]
}
