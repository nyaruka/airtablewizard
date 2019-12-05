import * as React from 'react';
import { ConditionRow } from './ConditionRow';
import { Condition, Operator } from '../utils/Formula';

interface Props {
    onChange: ((filtering: Filtering) => void);
}

interface State {
    condition1: Condition;
    condition2: Condition;
    condition3: Condition;
}

export class Filtering extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            condition1: new Condition("", Operator.Equals, "", false),
            condition2: new Condition("", Operator.Equals, "", false),
            condition3: new Condition("", Operator.Equals, "", false),
        };

        this.handleChangeCondition1 = this.handleChangeCondition1.bind(this);
        this.handleChangeCondition2 = this.handleChangeCondition2.bind(this);
        this.handleChangeCondition3 = this.handleChangeCondition3.bind(this);
    }

    handleChangeCondition1(row: ConditionRow) {
        this.setState({ condition1: row.getCondition() }, () => this.props.onChange(this));
    }

    handleChangeCondition2(row: ConditionRow) {
        this.setState({ condition2: row.getCondition() }, () => this.props.onChange(this));
    }

    handleChangeCondition3(row: ConditionRow) {
        this.setState({ condition3: row.getCondition() }, () => this.props.onChange(this));
    }

    public getConditions(): Condition[] {
        const allConditions = [this.state.condition1, this.state.condition2, this.state.condition3];
        return allConditions.filter((c) => (c.columnName !== ""));
    }

    public render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Column name</th>
                        <th></th>
                        <th>Value</th>
                        <th>Numeric</th>
                    </tr>
                </thead>
                <tbody>
                    <ConditionRow onChange={this.handleChangeCondition1} />
                    <ConditionRow onChange={this.handleChangeCondition2} />
                    <ConditionRow onChange={this.handleChangeCondition3} />
                </tbody>
            </table>
        );
    }
}
