
import React, { Component } from "react";

class dropdown extends Component
{
    state =
    {
        selectedOption : null
    }

    handleChange = (e) => {
        this.setState({ selectedOption: e.target.value });
        window.location.href = this.props.paths[this.props.options.indexOf(e.target.value)];
    }

    render()
    {
        return(
            <div>
                <select value={this.state.selectedOption} onChange={this.handleChange}>
                    {this.props.options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
            </div>
        )
    }
}

export default dropdown;
