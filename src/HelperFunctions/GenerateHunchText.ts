import { InputMode } from "../Interfaces/Types";

export const generateHunchText = (type: InputMode, content: string, label: string) => {
    switch (type) {
        case 'categorical':
            return `The category should be ${content}`;
        case 'manipulations':
        case 'data space':
            return `The value should be ${content}`;
        case 'exclusion':
            return `${label} should not exist`;
        case 'inclusion':
            return `There should be ${label} with value of ${content}`;
        case 'range':
            const parsedRange = JSON.parse('[' + content + ']');
            return `The value should be between ${parsedRange[0]} and ${parsedRange[1]}`;
        case 'model':
            return `All values should move as ${content}`;
        case 'sketch':
            return 'A sketch';
        case 'rating':
            return `${content} Starts`;
        default: {
            return content;
        }
    }
};