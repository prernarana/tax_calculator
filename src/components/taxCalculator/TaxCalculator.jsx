import React from 'react';
import TaxDetails from './taxDetails/TaxDetails'
import * as endpoint from '../utils/endPoint';
import calculateTax from '../utils/taxUtil';
import './TaxCalculator.scss';


class TaxCalculator extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            year: 2019,
            yearArray: [2019, 2020],
            isLoaded: false,
            salary: 0,
            taxSlab: {},
            showTaxDetails: false,
            calculatedTax: {}
        };
    }

    componentDidMount() {
        // get the tax slab details from server
        this.getTaxSlab();
    }
    // method to open hide year drop down
    toggleDropDown = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    setSalary = (e) => {
        this.setState({
            salary: e.target.value
        });
    }
    calculateTax = () => {
        // call the calculateTax method of util class to calculate taxes
        let salary = this.state.salary;
        if (this.state.salary === "") {
            salary = 0;
            this.setState({
                salary: 0
            });
        }
        let data = calculateTax(this.state.taxSlab, parseFloat(salary));
        // display tax table
        this.setState({
            showTaxDetails: true,
            calculatedTax: data
        });
    }
    yearDropDown = (year) => {
        //get the tax slab details  if year is changed
        if (this.state.year !== year) {
            this.setState({
                dropdownOpen: !this.state.dropdownOpen,
                year: year,
                isLoaded: false
            }, this.getTaxSlab);
        } else {
            this.setState({
                dropdownOpen: !this.state.dropdownOpen,
            });
        }
    }
    getTaxSlab = () => {
        this.setState({ showTaxDetails: false });
        // get tax slab details from server
        fetch(endpoint.TAX_API + this.state.year)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    // raise exception in case of error from server
                    throw new Error('Something went wrong');
                }
            })
            .then((responseJson) => {
                this.setState({
                    isLoaded: true,
                    taxSlab: responseJson
                });
            })
            .catch((error) => {
                //if error reported retry till tax slabs are retrieved
                this.setState({
                    isLoaded: false
                });
                console.log(error);
                this.getTaxSlab();
            });
    }

    render() {
        let yeardropDownArr = this.state.yearArray.map((object) => {
            return (<li className="yearDropdown" key={object} onClick={() => {
                this.yearDropDown(object)
            }}>{object}</li>);
        });
        return (
            <>
                <section className="main" >
                    {this.state.isLoaded ?
                        <form >
                            <div className="input-group mb-3 ">
                                <div className="dropdown yearDropdownMain " >
                                    <button className="btn  dropdown-toggle yearDropdownMain " onClick={this.toggleDropDown} type="button" data-toggle="dropdown">
                                        <span className="caret"></span>{this.state.year}</button>
                                    <ul className="dropdown-menu " style={{ display: this.state.dropdownOpen ? 'block' : 'none' }}>
                                        {yeardropDownArr.map((ob) => ob)}
                                    </ul>
                                </div>
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="">Salary (CAD)</span>
                                </div>
                                <input id="salary" type="number" className="form-control" aria-label="Salary Details" aria-describedby="basic-addon2" min="0" onChange={(e) => this.setSalary(e)} value={this.state.salary} />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button" onClick={this.calculateTax}>Calculate Tax</button>
                                </div>
                            </div>
                        </form> : <div>Loading Tax Slabs...</div>}
                </section>
                {this.state.showTaxDetails ?
                    <section>
                        <TaxDetails calculatedTax={this.state.calculatedTax} />
                    </section> : ''}
            </>
        );
    }
}

export default TaxCalculator;
