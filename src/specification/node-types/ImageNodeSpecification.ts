import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const ImageNodeSpecification: NodeSpecification = {
    type: NodeType.Image,
    properties: [
        {
            name: 'image_provider',
            datatype: 'string',
            mandatory: true,
            example: 'flickr',
        },
        {
            name: 'external_id',
            datatype: 'string',
            mandatory: true,
            example: '54671993116',
        },
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
            example: 'Chevrolet Corvette ZR-1 (C4)',
        },
        {
            name: 'description',
            datatype: 'string',
            mandatory: false,
            example: null,
        },
        {
            name: 'creator',
            datatype: 'string',
            mandatory: true,
            example: 'More Cars',
        },
        {
            name: 'license',
            datatype: 'string',
            mandatory: true,
            example: 'CC-BY 4.0',
        },
        {
            name: 'tags',
            datatype: 'string',
            mandatory: false,
            example: 'Chevrolet, Corvette, C4',
        },
        {
            name: 'source',
            datatype: 'string',
            mandatory: true,
            example: 'https://www.flickr.com/photos/more-cars/54671993116/',
        },
        {
            name: 'image_url_original',
            datatype: 'string',
            mandatory: true,
            example: 'https://www.flickr.com/photos/more-cars/54671993116/sizes/o/',
        },
        {
            name: 'image_url_xxl',
            datatype: 'string',
            mandatory: false,
            example: 'https://www.flickr.com/photos/more-cars/54671993116/sizes/4k/',
        },
        {
            name: 'image_url_xl',
            datatype: 'string',
            mandatory: false,
            example: null,
        },
        {
            name: 'image_url_l',
            datatype: 'string',
            mandatory: false,
            example: null,
        },
        {
            name: 'image_url_m',
            datatype: 'string',
            mandatory: false,
            example: null,
        },
        {
            name: 'image_url_s',
            datatype: 'string',
            mandatory: false,
            example: null,
        },
        {
            name: 'image_url_xs',
            datatype: 'string',
            mandatory: false,
            example: null,
        },
    ],
}
