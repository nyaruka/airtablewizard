import { Formula, Condition, Operator } from './Formula';

it('renders different formulas correctly', () => {
    const tests: { formula: Formula, rendered: string }[] = [
        {
            formula: new Formula([]),
            rendered: "",
        },
        {
            formula: new Formula([new Condition("ID", Operator.Equals, "123", true)]),
            rendered: 'ID=123',
        },
        {
            formula: new Formula([new Condition("ID Number", Operator.Equals, "123", false)]),
            rendered: '{ID Number}="123"',
        },
        {
            formula: new Formula([new Condition("ID Number", Operator.EqualsIgnoreCase, "X123", false)]),
            rendered: 'LOWER({ID Number})=LOWER("X123")',
        },
        {
            formula: new Formula([new Condition("Address", Operator.Contains, "Quito", false)]),
            rendered: 'FIND("Quito", Address)',
        },
        {
            formula: new Formula([
                new Condition("ID", Operator.Equals, "123", true),
                new Condition("Address", Operator.Contains, "Quito", false)
            ]),
            rendered: 'AND(ID=123, FIND("Quito", Address))',
        },
    ];

    for (let t = 0; t < tests.length; t++) {
        expect(tests[t].formula.render()).toBe(tests[t].rendered);
    }
});