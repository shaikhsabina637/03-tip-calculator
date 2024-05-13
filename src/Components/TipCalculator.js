import React, { useState } from 'react';
import { FiDollarSign } from "react-icons/fi";

function TipCalculator() {
    const [tipPercent, setTipPercent] = useState(0);
    const [bill, setBill] = useState('0');
    const [people, setPeople] = useState('0');
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
    }
    
    
    
    
    

    const billHandler = (e) => {
        const inputValue = e.target.value;
        if (!inputValue.trim()) {
            setBill(0);
        } else if (parseFloat(inputValue) < 0) {
            setBill(parseFloat(inputValue));
        }
        else {
            setBill(parseFloat(inputValue));
        }
    }
    
    const tipHandler = (tip) => {
        setTipPercent(tip);
        let halftotal = (bill / people);
        let tips = halftotal * tip / 100;
        let newTotal = halftotal + tips;
        setTip(formatCurrency(tips));
        setTotal(formatCurrency(newTotal));
    };

    const formatCurrency = (amount) => {
        return `$${amount.toFixed(2)}`
    }

    const customHandler = (e) => {
        setCustomClicked(true);
        setCustom(e.target.value);
    };

    const reset = (e) => {
        setBill(0);
        setPeople(0);
        setTipPercent(0);
        setTip("$0.00");
        setTotal("$0.00");
        e.preventDefault();
    }

    return (
        <div className='bg-light-grayish-cyan flex flex-col justify-center items-center h-screen'>
            <div className='text-very-dark-cyan p-7 uppercase font-bold' style={{ letterSpacing: '9px' }}>
                <p>spil</p>
                <span className='mb-3'>tter</span>
            </div>

            <div className='bg-white p-4 rounded-md shadow-md flex justify-around items-center'>
                <div className='p-2'>
                    <div className='flex flex-col'>
                        <label className='uppercase font-medium text-very-dark-cyan m-1'>bill</label>
                        <FiDollarSign className='relative top-6 left-3 text-gray-400' />
                        <input
                            className='p-1 rounded-md  text-very-dark-cyan font-bold placeholder:p-2 text-right pr-2 outline-none bg-very-light-grayish-cyan hover:border-light-grayish-cyan hover:border-2 appearance-none'
                            type="text"
                            onChange={(e) => { billHandler(e) }}
                            value={bill}
                        />
                    </div>
                    <div className='mt-5 flex flex-col p-1'>
                        <label className='uppercase font-medium text-very-dark-cyan'>select tip %</label>
                        <div className='flex flex-wrap w-[20vw] h-[15vh] justify-between items-center pt-1 pr-2'>
                            {[5, 10, 15, 25, 50].map((percentage) => (
                                <button
                                    key={percentage}
                                    className='bg-very-dark-cyan text-white p-2 rounded-md w-[5vw] font-bold hover:bg-strong-cyan hover:text-very-dark-cyan'
                                    onClick={() => tipHandler(percentage)}
                                >
                                    {percentage}%
                                </button>
                            ))}
                            <input
                                className={`bg-very-light-grayish-cyan outline-none text-white p-2 rounded-md w-[5vw] font-bold hover:bg-very-light-grayish-cyan text-center hover:text-very-dark-cyan capitalize ${customClicked ? 'border-strong-cyan border-2' : ''}`}
                                type="text"
                                placeholder='custom'
                                onChange={customHandler}
                                value={custom}
                            />
                        </div>
                    </div>
                    <div className='mt-2 flex flex-col p-1'>
                        <div className='flex space-x-2 items-center'>
                        <label className='capitalize font-medium text-very-dark-cyan'>number of people</label>
                        {peopleAlert ? <p className='text-red-700 capitalize text-sm'>can't be zero or negative </p> : ''}

                        </div>
                       
                        <input
                            className={`pr-2 pt-1 pb-1 rounded-md text-right font-bold text-very-dark-cyan placeholder:p-2 outline-none bg-very-light-grayish-cyan hover:border-light-grayish-cyan hover:border-2 mt-2 ${peopleAlert ? 'border-red-700 border-2 ' : ''}`}
                            type="number"
                            onChange={(e) => { personHandler(e) }}
                            value={people}
                        />
                    </div>
                </div>
                <div className='bg-very-dark-cyan p-2 m-4 rounded-md w-[25vw]'>
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
