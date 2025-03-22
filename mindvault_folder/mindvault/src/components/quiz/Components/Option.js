import React, { Component } from 'react';

class Options extends Component {
    render() {
        const { options, selectedOption, onOptionChange } = this.props;

        return (
            <div className='options'>
                {options.map((option, index) => (
                    <div key={index} className="form-check">
                        <input
                            type="radio"
                            id={`option-${index}`}
                            name="option"
                            value={option}
                            checked={selectedOption === option}
                            onChange={onOptionChange}
                            className="form-check-input"
                        />
                        <label  htmlFor={`option-${index}`} className="form-check-label">{option}</label>
                    </div>
                ))}
            </div>
        );
    }
}

export default Options;