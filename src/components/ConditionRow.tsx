import * as React from 'react';
import { Operator, Condition } from '../utils/Formula';
import './ConditionRow.css';

interface Props {
    onChange: ((row: ConditionRow) => void);
}

interface State {
    columnName: string;
    operator: Operator;
    value: string;
    numeric: boolean;
}

export class ConditionRow extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { columnName: "", operator: Operator.Equals, value: "", numeric: false };

        this.handleChangeColumnName = this.handleChangeColumnName.bind(this);
        this.handleChangeOperator = this.handleChangeOperator.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleChangeNumeric = this.handleChangeNumeric.bind(this);
    }

    handleChangeColumnName(event: any) {
        this.setState({ columnName: event.target.value }, () => this.props.onChange(this));
    }

    handleChangeOperator(event: any) {
        this.setState({ operator: Number(event.target.value) }, () => this.props.onChange(this));
    }

    handleChangeValue(event: any) {
        this.setState({ value: event.target.value }, () => this.props.onChange(this));
    }

    handleChangeNumeric(event: any) {
        this.setState({ numeric: event.target.checked }, () => this.props.onChange(this));
    }

    public getCondition(): Condition {
        return new Condition(this.state.columnName, this.state.operator, this.state.value, this.state.numeric);
    }

    public render() {
        return (
            <tr>
                <td>
                    <input type="text" value={this.state.columnName} onChange={this.handleChangeColumnName} />
                </td>
                <td>
                    <select value={this.state.operator} onChange={this.handleChangeOperator} >
                        <option value={Operator.Equals}>Equals</option>
                        <option value={Operator.EqualsIgnoreCase}>Equals (case-insensitive)</option>
                        <option value={Operator.Contains}>Contains</option>
                    </select>
                </td>
                <td>
                    <input type="text" value={this.state.value} onChange={this.handleChangeValue} />
                </td>
                <td className="numeric">
                    <input type="checkbox" checked={this.state.numeric} onChange={this.handleChangeNumeric} />
                </td>
            </tr >
        );
    }
}
