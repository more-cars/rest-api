import {NodeSpecification} from "../NodeSpecification"
import {NodeType} from "../NodeType"

export const RaceTrackNodeSpecification: NodeSpecification = {
    type: NodeType.RaceTrack,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
            example: 'Lausitzring',
            scope: 'user',
            validation: ['mandatory', 'string'],
        },
        {
            name: 'opened',
            datatype: 'number',
            mandatory: false,
            example: 2000,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'closed',
            datatype: 'number',
            mandatory: false,
            example: null,
            scope: 'user',
            validation: ['number'],
        },
        {
            name: 'type',
            datatype: 'string',
            mandatory: false,
            example: 'permanent-race-track',
            scope: 'user',
            validation: ['string', 'trackType'],
        },
        {
            name: 'location',
            datatype: 'string',
            mandatory: false,
            example: 'Klettwitz',
            scope: 'user',
            validation: ['string'],
        },
        {
            name: 'geo_position',
            datatype: 'string',
            mandatory: false,
            example: '51°32’0”N 13°55’10”E',
            scope: 'user',
            validation: ['string', 'geoPosition'],
        },
        {
            name: 'country_code',
            datatype: 'string',
            mandatory: false,
            example: 'DE',
            validation: ['countryCode'],
        },
    ],
}
