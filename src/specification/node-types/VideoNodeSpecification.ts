import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const VideoNodeSpecification: NodeSpecification = {
    type: NodeType.Video,
    properties: [
        {
            name: 'video_provider',
            datatype: 'string',
            mandatory: true,
            example: 'youtube',
        },
        {
            name: 'external_id',
            datatype: 'string',
            mandatory: true,
            example: 'NqsBncRslsg',
        },
        {
            name: 'title',
            datatype: 'string',
            mandatory: false,
            example: 'P1 vs F40',
        },
        {
            name: 'description',
            datatype: 'string',
            mandatory: false,
            example: 'Drag Race - P1 vs F40',
        },
        {
            name: 'creator',
            datatype: 'string',
            mandatory: false,
            example: 'Lovecars',
        },
        {
            name: 'license',
            datatype: 'string',
            mandatory: false,
            example: 'youtube',
        },
        {
            name: 'tags',
            datatype: 'string',
            mandatory: false,
            example: 'F40, P1',
        },
        {
            name: 'source',
            datatype: 'string',
            mandatory: false,
            example: 'https://www.youtube.com/watch?v=NqsBncRslsg',
        },
        {
            name: 'duration',
            datatype: 'string',
            mandatory: false,
            example: 'PT7M24S',
        },
        {
            name: 'thumbnail_url_l',
            datatype: 'string',
            mandatory: false,
            example: 'https://i.ytimg.com/vi/NqsBncRslsg/maxresdefault.jpg',
        },
        {
            name: 'thumbnail_url_m',
            datatype: 'string',
            mandatory: false,
            example: 'https://i.ytimg.com/vi/NqsBncRslsg/sddefault.jpg',
        },
        {
            name: 'thumbnail_url_s',
            datatype: 'string',
            mandatory: false,
            example: 'https://i.ytimg.com/vi/NqsBncRslsg/mqdefault.jpg',
        },
        {
            name: 'thumbnail_url_xs',
            datatype: 'string',
            mandatory: false,
            example: 'https://i.ytimg.com/vi/NqsBncRslsg/default.jpg',
        },
    ],
}
