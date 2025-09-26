module.exports = [
    {
        type: 'input',
        name: 'startNodeType',
        message: "Type of the first node?"
    },
    {
        type: 'input',
        name: 'endNodeType',
        message: "Node type of the relationship partner?"
    },
    {
        type: 'input',
        name: 'relationshipName',
        message: "Name of the relationship?"
    },
    {
        message: "Cardinality of the relationship?",
        name: 'cardinality',
        type: 'select',
        choices: [
            '1:1',
            '1:n',
            'n:1',
            'm:n',
        ],
    },
]
