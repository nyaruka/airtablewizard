
export enum Operator {
    Equals = 1,
    EqualsIgnoreCase,
    Contains,
}

export class Condition {
    public columnName: string;
    public operator: Operator;
    public value: string;
    public numeric: boolean;

    constructor(columnName: string, operator: Operator, value: string, numeric: boolean) {
        this.columnName = columnName;
        this.operator = operator;
        this.value = value;
        this.numeric = numeric;
    }

    public render(): string {
        const columnName = /\s/.test(this.columnName) ? `{${this.columnName}}` : this.columnName;
        const value = this.numeric ? this.value : `"${this.value}"`;

        switch (this.operator) {
            case Operator.Equals:
                return `${columnName}=${value}`;
            case Operator.EqualsIgnoreCase:
                return `LOWER(${columnName})=LOWER(${value})`;
            case Operator.Contains:
                return `FIND(${value}, ${columnName})`;
        }

        throw new Error(`unknown operator: ${this.operator}`);
    }
}

export class Formula {
    public conditions: Condition[];

    constructor(conditions: Condition[]) {
        this.conditions = conditions;
    }

    public render(): string {
        const conditions = this.conditions.map((c) => c.render());

        if (conditions.length > 1) {
            return `AND(${conditions.join(", ")})`;
        } else if (conditions.length === 1) {
            return conditions[0];
        }
        return "";
    }
}

