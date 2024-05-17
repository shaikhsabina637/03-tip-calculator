import React, { useState } from 'react';
import { FiDollarSign } from "react-icons/fi";

function TipCalculator() {
    const [bill, setBill] = useState('0');
    const [people, setPeople] = useState(0);
    const [custom, setCustom] = useState("");
    const [customClicked, setCustomClicked] = useState(false);
    const [tip, setTip] = useState("$0.00");
    const [total, setTotal] = useState("$0.00");
    const [peopleAlert, setPeopleAlert] = useState(false);

    const personHandler = (e) => {
        const inputValue = e.target.value;
        if (inputValue.trim() === '') {
            setPeople(''); // Set empty string if input is cleared
            setPeopleAlert(false);
        } else {
            const parsedValue = parseFloat(inputValue);
            if (!isNaN(parsedValue)) {
                setPeople(parsedValue); // Set parsed value
                setPeopleAlert(parsedValue <= 0); // Set alert for negative numbers and zero
            }
        }
    };

    const billHandler = (e) => {
        const inputValue = e.target.value;
        if (!inputValue.trim()) {
            setBill(0);
        } else {
            setBill(parseFloat(inputValue));
        }
    };

    const tipHandler = (tip) => {
        if (people > 0) {
            let perPersonBill = bill / people;
            let tipAmount = (perPersonBill * tip) / 100;
            let newTotal = perPersonBill + tipAmount;
            setTip(formatCurrency(tipAmount));
            setTotal(formatCurrency(newTotal));
        }
    };

    const formatCurrency = (amount) => {
        return `$${amount.toFixed(2)}`;
    };

    const customHandler = (e) => {
        setCustomClicked(true);
        const customTip = parseFloat(e.target.value);
        if (!isNaN(customTip) && people > 0) {
            tipHandler(customTip);
        }
        setCustom(e.target.value);
    };

    const reset = (e) => {
        setBill(0);
        setPeople(0);
        setTip("$0.00");
        setTotal("$0.00");
        setCustom("");
        setCustomClicked(false);
        e.preventDefault();
    };

    return (
        <div className='bg-light-grayish-cyan flex flex-col justify-center items-center h-screen'>
            <div className='text-very-dark-cyan p-7 sm:mt-20 sm:pb-1 uppercase font-bold' style={{ letterSpacing: '9px' }}>
                <p>spil</p>
                <span className='mb-3'>tter</span>
            </div>

            <div className='bg-white rounded-md shadow-md flex justify-evenly items-center lg:flex-row sm:flex-col sm:w-full sm:rounded-3xl lg:w-[60vw] lg:p-4'>
                <div className='p-2 lg:w-[28vw] sm:m-4'>
                    <div className='flex flex-col'>
                        <label className='uppercase font-medium text-very-dark-cyan m-1'>bill</label>
                        <FiDollarSign className='relative top-6 left-3 text-gray-400' />
                        <input
                            className='p-1 rounded-md text-very-dark-cyan font-bold placeholder:p-2 text-right pr-2 outline-none bg-very-light-grayish-cyan hover:border-light-grayish-cyan hover:border-2 appearance-none'
                            type="text"
                            onChange={(e) => { billHandler(e) }}
                            value={bill}
                        />
                    </div>
                    <div className='mt-5 flex flex-col'>
                        <label className='uppercase font-medium text-very-dark-cyan'>select tip %</label>
                        <div className='flex flex-wrap pt-4 pb-4  items-center justify-around lg:flex-row lg:space-x-3 gap-y-3 sm:space-x-6'>
                            {[5, 10, 15, 20, 25].map((tipValue) => (
                                <button
                                    key={tipValue}
                                    className='bg-very-dark-cyan text-white p-2 rounded-md lg:w-[7vw] sm:w-[30vw] font-bold hover:bg-strong-cyan hover:text-very-dark-cyan'
                                    onClick={() => tipHandler(tipValue)}
                                >{tipValue}%
                                </button>
                            ))}
                            <input
                                className={`bg-very-light-grayish-cyan outline-none text-very-dark-cyan sm:p-2 lg:p-2 rounded-md lg:w-[7vw] sm:w-[30vw] font-bold hover:bg-very-light-grayish-cyan text-center hover:text-very-dark-cyan capitalize ${customClicked ? 'border-strong-cyan border-2' : ''}`}
                                type="text"
                                placeholder='custom'
                                onChange={customHandler}
                                value={custom}
                            />
                        </div>
                    </div>
                    <div className='mt-2 flex flex-col'>
                        <div className='flex space-x-2 items-center'>
                            <label className='capitalize font-medium text-very-dark-cyan'>number of people</label>
                            {peopleAlert ? <p className='text-red-700 capitalize text-sm'>can't be zero or negative</p> : ''}
                        </div>
                        <input
                            className={`pr-2 pt-1 pb-1 rounded-md text-right font-bold text-very-dark-cyan placeholder:p-2 outline-none bg-very-light-grayish-cyan hover:border-light-grayish-cyan hover:border-2 mt-2 ${peopleAlert ? 'border-red-700 border-2' : ''}`}
                            type="number"
                            onChange={(e) => { personHandler(e) }}
                            value={people}
                        />
                    </div>
                </div>
                <div className='bg-very-dark-cyan p-2 m-4 rounded-md lg:w-[25vw] sm:w-[80vw]'>
                    <div className='flex justify-around items-center p-5'>
                        <div className='flex flex-col'>
                            <p className='text-white font-medium capitalize'>tip amount</p>
                            <p className='text-light-grayish-cyan'>/ person</p>
                        </div>
                        <div className='text-strong-cyan font-bold text-4xl'>{tip}</div>
                    </div>
                    <div className='flex justify-around items-center p-5'>
                        <div className='flex flex-col'>
                            <p className='text-white font-medium capitalize'>total</p>
                            <p className='text-light-grayish-cyan'>/ person</p>
                        </div>
                        <div className='text-strong-cyan font-bold text-4xl'>{total}</div>
                    </div>
                    <div className='mt-5'>
                        <button className='bg-strong-cyan p-2 w-full rounded-md uppercase font-bold my-6' onClick={reset}>reset</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TipCalculator;
