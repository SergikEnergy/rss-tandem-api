export const GET_QUESTIONS_RESPONSE = [
    {
        id: '1876ee27-b437-4fb0-aab9-d23a4cdacf44',
        topic: 'javascript',
        subtopic: 'closures',
        questionDescription: 'What is a closure in JavaScript 2?',
        answers: [
            {
                id: 'a64c4fa2-a999-49f4-a03c-1c255a481066',
                answerText:
                    'A function that has access to variables from its outer scope even after the outer function returns',
                isCorrect: true,
            },
            {
                id: 'b868677d-99b4-41ab-b9f2-b9b9d39e76d5',
                answerText: 'A way to close the browser window',
                isCorrect: false,
            },
            {
                id: 'cab3d713-51e5-4313-bbc3-97b82bcb605a',
                answerText: 'A method to end a loop',
                isCorrect: false,
            },
            {
                id: 'e886dfc0-90d0-42b3-bc80-3a0db9b15659',
                answerText: 'A type of error handling',
                isCorrect: false,
            },
        ],
        type: 'SINGLE_CHOICE',
    },
    {
        id: '559908bf-91f8-47c8-ade7-95cc150b8a2d',
        topic: 'javascript',
        subtopic: 'closures',
        questionDescription: 'What is a closure in JavaScript?',
        answers: [
            {
                id: 'f3b45315-6ec8-4b0c-ace2-93e513196e20',
                answerText:
                    'A function that has access to variables from its outer scope even after the outer function returns',
                isCorrect: true,
            },
            {
                id: '00af700e-49f6-4b14-8506-7a6b80e21600',
                answerText: 'A way to close the browser window',
                isCorrect: false,
            },
            {
                id: 'e21e0483-bcc7-49da-89bc-ca98ca4ab533',
                answerText: 'A method to end a loop',
                isCorrect: false,
            },
            {
                id: '0e8a3104-e26c-4707-985d-03b03b569262',
                answerText: 'A type of error handling',
                isCorrect: false,
            },
        ],
        type: 'SINGLE_CHOICE',
    },
];

export const DUPLICATE_QUESTION_RESPONSE = {
    statusCode: 400,
    detail: 'Key ("questionDescription")=(What is a closure in JavaScript 4?) already exists.',
    message: 'duplicate key value violates unique constraint "UQ_6f94c5d8703d3cae2ddb3c00a09"',
};
