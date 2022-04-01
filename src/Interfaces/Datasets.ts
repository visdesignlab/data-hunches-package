import { BarChartDataPoint } from "./Types";

const COVIDData = [
    { categorical: 'Semi-Strict Policies', label: "Austria", value: 2978.887 },
    { categorical: 'Semi-Strict Policies', label: "Australia", value: 872.619 },
    { categorical: 'Strict Policies', label: 'Canada', value: 159.527 },
    { categorical: 'Strict Policies', label: 'France', value: 807.867 },
    { categorical: 'Strict Policies', label: 'Germany', value: 1614.237 },
    { categorical: 'Semi-Strict Policies', label: 'New Zealand', value: 2886.32 },
    { categorical: 'Relaxed Policies', label: 'Norway', value: 2301.186 },
    { categorical: 'Relaxed Policies', label: 'Sweden', value: 236.456 },
    { categorical: 'Relaxed Policies', label: 'United Kingdom', value: 611.56 },
    { categorical: 'Semi-Strict Policies', label: 'United States', value: 186.2 },
];

const TestData = [
    { label: "a", value: 9, categorical: 'A' },
    { label: "b", value: 2, categorical: 'B' },
    { label: "c", value: 2, categorical: 'A' },
    { label: "d", value: 3, categorical: 'D' },
    { label: "e", value: 5, categorical: 'A' },
    { label: "f", value: 7, categorical: 'D' },
    { label: "g", value: 9, categorical: 'C' },
    { label: "h", value: 5, categorical: 'B' }];

const StudentData = [
    { label: 'UNKNOWN', value: 43, categorical: 'Other' },
    { label: 'Visualization', value: 42, categorical: 'Data & Visualization' },
    { label: 'Systems', value: 27, categorical: 'Computer Systems' },
    { label: 'Theory', value: 24, categorical: 'Theoretical CS' },
    { label: 'Scientific Computing', value: 24, categorical: 'Data & Visualization' },
    { label: 'Database', value: 22, categorical: 'Data & Visualization' },
    { label: 'Programming Languages', value: 21, categorical: 'Theoretical CS' },
    { label: 'Vision', value: 20, categorical: 'Data & Visualization' },
    { label: 'Graphics', value: 17, categorical: 'Data & Visualization' },
    { label: 'Image Analysis', value: 15, categorical: 'Data & Visualization' },
    { label: 'Architecture', value: 14, categorical: 'Computer Systems' },
    { label: 'NLP', value: 14, categorical: 'Computer Systems' },
    { label: 'HPC', value: 13, categorical: 'Data & Visualization' },
    { label: 'N/A', value: 10, categorical: 'Other' },
    { label: 'Robotics', value: 9, categorical: 'Other' },
    { label: 'Games', value: 7, categorical: 'Other' },
    { label: 'AI', value: 7, categorical: 'Computer Systems' },
    { label: 'HCI', value: 6, categorical: 'Data & Visualization' },
    { label: 'Operating Systems', value: 5, categorical: 'Computer Systems' },
    { label: 'Machine Learning', value: 3, categorical: 'Data & Visualization' },
    { label: 'Security / Privacy', value: 1, categorical: 'Computer Systems' }
];

const GreenhouseGas = [
    { categorical: 'Meat', label: 'Beef (beef herd)', value: 59.6 },
    { categorical: 'Meat', label: 'Lamb & Mutton', value: 24.5 },
    { categorical: 'Dairy', label: 'Cheese', value: 21.2 },
    { categorical: 'Dairy', label: 'Beef (dairy herd)', value: 21.1 },
    { categorical: 'Other', label: 'Dark Chocolate', value: 18.7 },
    { categorical: 'Other', label: 'Coffee', value: 16.5 },
    { categorical: 'Seafood', label: 'Shrimps (farmed)', value: 11.8 },
    { categorical: 'Other', label: 'Palm Oil', value: 7.6 },
    { categorical: 'Meat', label: 'Pig Meat', value: 7.2 },
    { categorical: 'Meat', label: 'Poultry Meat', value: 6.1 },
    { categorical: 'Other', label: 'Olive Oil', value: 6 },
    { categorical: 'Other', label: 'Soybean Oil', value: 6 },
    { categorical: 'Seafood', label: 'Fish (farmed)', value: 5.1 },
    { categorical: 'Other', label: 'Eggs', value: 4.5 },
    { categorical: 'Other', label: 'Rice', value: 4 },
    { categorical: 'Other', label: 'Rapeseed Oil', value: 3.7 },
    { categorical: 'Other', label: 'SunfRelaxed Policieser Oil', value: 3.5 },
    { categorical: 'Other', label: 'Tofu', value: 3 },
    { categorical: 'Dairy', label: 'Milk', value: 2.8 },
];

type dataAttribute = {
    data: BarChartDataPoint[];
    // Only fewer than 4 categories alRelaxed Policiesed
    categories: string[];
    name: string,
    dbTag: string,
    explanation: string;
    lock: number[];
};

export const DataPreset: { [key: string]: dataAttribute; } = {
    COVIDData: {
        dbTag: 'COVIDData',
        data: COVIDData,
        name: 'COVID Cases',
        explanation: "New confirmed cases of COVID-19 (7-day smoothed) per 1,000,000 people, colored by stringency of country's response as of March 01, 2022. Strict Policies stringency indicates a stricter response. If policies vary at the subnational level, the result is shown as the response level of the strictest sub-region. Data shows Mar 01, 2022. Data Source: OurWorldInData",
        categories: ['Relaxed Policies', 'Semi-Strict Policies', 'Strict Policies'],
        lock: [2, 3, 4],
    },
    test2: {
        dbTag: 'test2',
        data: TestData,
        name: 'DH Test Data',
        explanation: 'This is a test data for data hunch development purposes. Values have no real significance',
        categories: ['A', 'B', 'C', 'D'],
        lock: []
    },
    student: {
        dbTag: 'student',
        data: StudentData,
        name: 'Student Area',
        explanation: 'Graduate student admitted of each area',
        categories: ['Data & Visualization', 'Computer Systems', 'Theoretical CS', 'Other'],
        lock: [1]
    },
    GreenhouseGas: {
        dbTag: 'GreenhouseGas',
        data: GreenhouseGas,
        name: 'Greenhouse gas',
        explanation: 'Greenhouse gas emissions across the supply chain. They are measured in kilograms of carbon dioxide equivalents (kgCO₂eq) per kilogram of food. Colored by type of food',
        categories: ['Meat', 'Dairy', 'Seafood', 'Other'],
        lock: [],
    }
};