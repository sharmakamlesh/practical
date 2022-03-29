import React, { useState, useRef } from 'react';
import FormGroup from '../UI/formGroup';
import Button from '../UI/button';
import Label from '../UI/label';
import RadioGroup from '../UI/radioGroup';
import { numArray, threeOption, oftenOption, experienceoption } from '../../common';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const Form = () => {
    const [state, setState] = useState({
        diagnosed: '',
        physical: '',
        mental: '',
        often: '',
        average: '',
        experience: '',
        expError: false,
        backCount: 0
    });

    //Grab this function to generate random id
    const idGenerator = () => {
        let S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    //clear state
    const emptyState = () => {
        setState(pre => ({
            ...pre,
            diagnosed: '',
            physical: '',
            mental: '',
            often: '',
            experience: '',
            average: '',
            backCount: 0
        }));
        inputRef.current.value = ''
    }

    const inputRef = useRef()
    //On Form Submit
    const onHandleSubmit = e => {
        e.preventDefault();
        const { diagnosed, physical, mental, often, experience, average, id } = state;
        if (!experience) return setState(pre => ({ ...pre, expError: true }));
        const formData = JSON.parse(localStorage.getItem('formData'));
        const dataObj = {
            id: idGenerator(),
            diagnosed,
            physical,
            mental,
            often,
            experience,
            average,
            textInput: inputRef.current.value
        }
        //If existing field is editable
        if(id){
            const filterArry = formData.filter(localData => localData.id !== id);
            console.log(filterArry)
            localStorage.setItem('formData', JSON.stringify([...filterArry, { ...dataObj }]));
            emptyState()
            return;
        }
        
        //if first time data is submit
        if (!formData) {
           localStorage.setItem('formData', JSON.stringify([{ ...dataObj }]));
           emptyState()
           return;
        }
        //new data submitting to existing data
        localStorage.setItem('formData', JSON.stringify([...formData, { ...dataObj }]));
        emptyState()
        
    }


    //On Change Radio and Checkbox
    const onHandleRadio = e => {
        const { name, value } = e.target;
        if (name === 'experience') setState(pre => ({ ...pre, expError: false }))
        setState(pre => ({
            ...pre,
            [name]: value
        }));
    }

    //On Back Button Click
    const onBack = (count) => {
        const formData = JSON.parse(localStorage.getItem('formData'));
        if(!formData) return;
        if(formData[formData.length - count]){
            const { average, diagnosed, experience, mental, often, physical, textInput, id } = formData[formData.length - count];
            setState(pre => ({
                ...pre,
                average,
                diagnosed,
                experience,
                mental,
                often,
                physical,
                backCount: count,
                id
            }));
            inputRef.current.value = textInput
            console.log(formData[formData.length - count]);
        }
    }
    return (
        <form onSubmit={onHandleSubmit}>
            <FormGroup>
                <Label>If you have problems with pain/aches, stiffness, weakness or functional problems, describe
                    this/these below. (List the symptoms in descending order with the most troublesome first)
                </Label>
                <textarea name="" id="" rows="3" minLength={5} ref={inputRef} required></textarea>
            </FormGroup>
            <FormGroup className='flex'>
                <Label>Have you been diagnosed with this problem?</Label>
                <div className='form-left' >
                    {threeOption?.length > 0 && threeOption.map(item => {
                        return (<RadioGroup key={item}>
                            <label htmlFor={`${item}2`}>
                                <input type="radio" name="diagnosed" id={`${item}2`} value={item} onChange={onHandleRadio} checked={item === state.diagnosed} required />
                                {item}
                            </label>
                        </RadioGroup>)
                    })}

                </div>
            </FormGroup>
            <FormGroup className='flex'>
                <Label>Did the problem start after a physical trauma?</Label>
                <div className='form-left' >
                    {threeOption?.length > 0 && threeOption.map(item => {
                        return (<RadioGroup key={item}>
                            <label htmlFor={`${item}3`}>
                                <input type="radio" name="physical" id={`${item}3`} value={item} onChange={onHandleRadio} checked={item === state.physical} required />
                                {item}
                            </label>
                        </RadioGroup>)
                    })}
                </div>
            </FormGroup>
            <FormGroup className='flex'>
                <Label>Did the problem start after a mental trauma?</Label>
                <div className='form-left' >
                    {threeOption?.length > 0 && threeOption.map(item => {
                        return (<RadioGroup key={item}>
                            <label htmlFor={`${item}4`}>
                                <input type="radio" name="mental" id={`${item}4`} value={item} onChange={onHandleRadio} checked={item === state.mental} required />
                                {item}
                            </label>
                        </RadioGroup>)
                    })}
                </div>
            </FormGroup>
            <FormGroup className='flex-col'>
                <Label>How often do you experience the problem?
                </Label>
                <div className='flex'>
                    {oftenOption?.length > 0 && oftenOption.map(item => {
                        return (<RadioGroup key={item}>
                            <label htmlFor={`${item}5`}>
                                <input type="radio" name="often" id={`${item}5`} value={item} onChange={onHandleRadio} checked={item === state.often} required />
                                {item}
                            </label>
                        </RadioGroup>)
                    })}
                </div>

            </FormGroup>
            <FormGroup className='flex-col'>
                <Label>When do you experience the problem?</Label>
                <div className='flex-column'>
                    {experienceoption?.length > 0 && experienceoption.map(item => {
                        return (<RadioGroup key={item}>

                            <label htmlFor={`${item}6`}>
                                <input type="checkbox" name="experience" id={`${item}6`} value={item} onChange={onHandleRadio} checked={item === state.experience} />
                                {item}
                            </label>
                        </RadioGroup>)
                    })}
                    {state.expError && <div className='expError'> * Please select one of these ☝️</div>}
                </div>
            </FormGroup>
            <FormGroup className='flex-col'>
                <Label>How intense is the experience of the problem on average on a 0-10 scale? </Label>
                <div className='flex'>
                    {numArray?.length > 0 && numArray.map(num => {
                        return (<RadioGroup key={num}>
                            <label htmlFor={`${num}7`}>
                                <input type="radio" name="average" id={`${num}7`} value={num} onChange={onHandleRadio} checked={num === state.average} required />
                                {num}
                            </label>
                        </RadioGroup>)
                    })}
                </div>
            </FormGroup>
            <div className='break-line' >
                <IconButton type='submit' size='small' style={{ position: 'absolute', background: '#fff' }}>
                    <svg width="35" height="35" viewBox="0 0 24 24" fill="#007bff" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM12 18C11.4477 18 11 17.5523 11 17V13H7C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H11V7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7V11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H13V17C13 17.5523 12.5523 18 12 18Z" />
                    </svg>
                </IconButton>
            </div>
            <div className='btn-wrapper'>
                <Button onClick={() => onBack(state.backCount + 1)} type='button' variant="contained">Back</Button>
                <Link to="/summary">
                <Button type='button' variant="contained">Next</Button>
                </Link>
            </div>
        </form>
    )
}

export default Form