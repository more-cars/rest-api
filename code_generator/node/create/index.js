module.exports = {
    prompt: async ({inquirer}) => {
        const questions = [{
            message: "Name of the new node type?",
            name: 'nodeType',
            type: 'input'
        }, {
            message: 'Node properties that the user is allowed to modify (comma-separated list):',
            name: 'properties',
            type: 'list',
        }]

        return inquirer
            .prompt(questions)
            .then(answers => {
                const {properties} = answers
                const questions = []

                properties.forEach((prop) => {
                    questions.push({
                        message: `Is the property "${prop}" a mandatory field?`,
                        name: 'properties.' + prop + '.mandatory',
                        type: 'confirm',
                    })

                    questions.push({
                        message: `Data type of property "${prop}"?`,
                        name: 'properties.' + prop + '.datatype',
                        type: 'select',
                        choices: ['string', 'number', 'boolean'],
                    })

                    questions.push({
                        message: `Example of property "${prop}"?`,
                        name: 'properties.' + prop + '.example',
                        type: 'input',
                    })
                })

                return inquirer
                    .prompt(questions)
                    .then(nextAnswers => {
                        console.log(Object.assign({}, answers, nextAnswers))
                        return Object.assign({}, answers, nextAnswers)
                    })
            })
    }
}
