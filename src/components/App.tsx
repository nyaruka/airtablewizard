import * as React from 'react';
import { Filtering } from './Filtering';
import { Condition, Formula } from '../utils/Formula';
import './App.css';

interface Props { }

interface State {
  baseID: string;
  tableName: string;
  conditions: Condition[];
  maxRecords: number;
  formula: string;
  url: string;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { baseID: "", tableName: "", conditions: [], maxRecords: 0, formula: "", url: "" };

    this.handleChangeBaseID = this.handleChangeBaseID.bind(this);
    this.handleChangeTableName = this.handleChangeTableName.bind(this);
    this.handleChangeFiltering = this.handleChangeFiltering.bind(this);
    this.handleChangeMaxRecords = this.handleChangeMaxRecords.bind(this);
  }

  handleChangeBaseID(event: any) {
    this.setState({ baseID: event.target.value }, this.updateURL);
    console.log(event.target.value);
  }

  handleChangeTableName(event: any) {
    this.setState({ tableName: event.target.value }, this.updateURL);
  }

  handleChangeFiltering(filtering: Filtering) {
    this.setState({ conditions: filtering.getConditions() }, this.updateURL);
  }

  handleChangeMaxRecords(event: any) {
    this.setState({ maxRecords: event.target.value }, this.updateURL);
  }

  updateURL() {
    const formula = new Formula(this.state.conditions);
    const renderedFormula = formula.render();

    let encodedFormula = encodeURIComponent(renderedFormula)
    encodedFormula = encodedFormula.replace("%40", "@") // put @ back so expressions work

    let url = `https://api.airtable.com/v0/${this.state.baseID}/${this.state.tableName}?filterByFormula=${encodedFormula}`;

    if (this.state.maxRecords > 0) {
      url += `&maxRecords=${this.state.maxRecords}`
    }

    this.setState({ formula: renderedFormula, url: url });
  }

  public render() {
    return (
      <div className="App">
        <div className="App-header"><h1><span role="img" aria-label="Wizard">🧙</span> Airtable Webhook Wizard</h1></div>
        <form>
          <div className="section">
            <label htmlFor="baseid"><span role="img" aria-label="Key">🔑</span> Base ID</label>
            <input type="text" value={this.state.baseID} onChange={this.handleChangeBaseID} style={{ width: "400px" }} />
            <p>You can find the base ID on the API page. It begins with 'app'.</p>
          </div>
          <div className="section">
            <label htmlFor="tablename"><span role="img" aria-label="Book">📖</span> Table Name</label>
            <input type="text" value={this.state.tableName} onChange={this.handleChangeTableName} style={{ width: "400px" }} />
          </div>
          <div className="section">
            <label><span role="img" aria-label="Dial">🎛️</span> Filtering</label>
            <Filtering onChange={this.handleChangeFiltering} />
          </div>
          <div className="section">
            <label><span role="img" aria-label="Number">#️⃣</span> Max Records</label>
            <input type="number" value={this.state.maxRecords} onChange={this.handleChangeMaxRecords} />
          </div>
          <div className="section">
            <label htmlFor="formula"><span role="img" aria-label="Lightning">⚡</span> Formula</label>
            <input type="text" value={this.state.formula} style={{ width: "800px" }} readOnly />
          </div>
          <div className="section">
            <label htmlFor="url"><span role="img" aria-label="World">🌐</span> Webhook URL</label>
            <input type="text" value={this.state.url} style={{ width: "800px" }} readOnly />
          </div>
        </form>
      </div>
    );
  }
}

export default App;
