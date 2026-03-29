import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const VideoNodeSpecification: NodeSpecification = {
    type: NodeType.Video,
    properties: [
        {
            name: 'video_provider',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'external_id',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'title',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'description',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'creator',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'license',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'tags',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'source',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'duration',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'thumbnail_url_l',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'thumbnail_url_m',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'thumbnail_url_s',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'thumbnail_url_xs',
            datatype: 'string',
            mandatory: false,
        },
    ],
}
