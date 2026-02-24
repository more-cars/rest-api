import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const ImageNodeSpecification: NodeSpecification = {
    type: NodeType.Image,
    properties: [
        {
            name: 'image_provider',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'external_id',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'description',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'creator',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'license',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'tags',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'source',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'image_url_original',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'image_url_xxl',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'image_url_xl',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'image_url_l',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'image_url_m',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'image_url_s',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'image_url_xs',
            datatype: 'string',
            mandatory: false,
        },
    ],
}
