import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const Summary = () => {
    const [state, setState] = useState({
        tableData: []
    });

    useEffect(() => {
        const formData = JSON.parse(localStorage.getItem('formData'));
        console.log(formData);
        // const data = JSON.parse(formData)
        if (formData && formData?.length > 0) {
            setState(pre => ({
                ...pre,
                tableData: formData
            }))
        }
    }, []);

    //On delete
    const onHandleDelete = id => {
        const filterArry = state.tableData.filter(item => item.id !== id);
        console.log(filterArry);
        setState(pre => ({
            ...pre,
            tableData: filterArry
        }));
        localStorage.setItem('formData', JSON.stringify([...filterArry]))
    }

    return (
        <>
            <div className='summary-header' >
                <Link to='/'>
                    <Button variant="outlined" startIcon={<svg width="24" height="24" viewBox="0 0 24 24" fill="#007bff" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 12L3.29289 11.2929L2.58579 12L3.29289 12.7071L4 12ZM19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11V13ZM9.29289 5.29289L3.29289 11.2929L4.70711 12.7071L10.7071 6.70711L9.29289 5.29289ZM3.29289 12.7071L9.29289 18.7071L10.7071 17.2929L4.70711 11.2929L3.29289 12.7071ZM4 13H19V11H4V13Z" />
                    </svg>
                    }>Back</Button>
                </Link>
                <h1>Summary Table</h1>
            </div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Desciption</TableCell>
                            <TableCell>Diagnosed </TableCell>
                            <TableCell>Physical Trauma</TableCell>
                            <TableCell>Mental Trauma</TableCell>
                            <TableCell>Often Experience</TableCell>
                            <TableCell>Experience Problem</TableCell>
                            <TableCell>Average</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                   
                    <TableBody>
                        {state.tableData?.length > 0 &&
                            state.tableData.map((item, i) => {
                                return (<TableRow key={item.id}>
                                    <TableCell>{`${i + 1}`}</TableCell>
                                    <TableCell>{item.textInput}</TableCell>
                                    <TableCell>{item.diagnosed}</TableCell>
                                    <TableCell>{item.physical}</TableCell>
                                    <TableCell>{item.mental}</TableCell>
                                    <TableCell>{item.often}</TableCell>
                                    <TableCell>{item.experience}</TableCell>
                                    <TableCell>{item.average}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => onHandleDelete(item.id)}>
                                            <svg width="30" height="30" viewBox="0 0 26 29" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_1154_12768)"> <path fillRule="evenodd" clipRule="evenodd" d="M22.0001 6H4.00006V9C5.10463 9 6.00006 9.89543 6.00006 11V15C6.00006 17.8284 6.00006 19.2426 6.87874 20.1213C7.75742 21 9.17163 21 12.0001 21H14.0001C16.8285 21 18.2427 21 19.1214 20.1213C20.0001 19.2426 20.0001 17.8284 20.0001 15V11C20.0001 9.89543 20.8955 9 22.0001 9V6ZM11.5001 11C11.5001 10.4477 11.0523 10 10.5001 10C9.94778 10 9.50006 10.4477 9.50006 11V16C9.50006 16.5523 9.94778 17 10.5001 17C11.0523 17 11.5001 16.5523 11.5001 16V11ZM16.5001 11C16.5001 10.4477 16.0523 10 15.5001 10C14.9478 10 14.5001 10.4477 14.5001 11V16C14.5001 16.5523 14.9478 17 15.5001 17C16.0523 17 16.5001 16.5523 16.5001 16V11Z" fill="#007BFF" /><path d="M11.0681 3.37059C11.1821 3.26427 11.4332 3.17033 11.7825 3.10332C12.1318 3.03632 12.5597 3 13 3C13.4403 3 13.8682 3.03632 14.2175 3.10332C14.5668 3.17033 14.8179 3.26427 14.9319 3.37059" stroke="#007BFF" strokeWidth="2" strokeLinecap="round" /></g><defs><filter id="filter0_d_1154_12768" x="-3" y="0" width="32" height="32" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /><feOffset dy="4" /><feGaussianBlur stdDeviation="2" /><feComposite in2="hardAlpha" operator="out" /><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" /><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1154_12768" /><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1154_12768" result="shape" /></filter></defs></svg>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>)
                            })}
                    </TableBody>
                    {state.tableData?.length === 0 && <div>Not found any data</div>}
                </Table>
            </TableContainer>

        </>
    )
}

export default Summary