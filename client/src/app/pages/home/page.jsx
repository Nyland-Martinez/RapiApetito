'use client'
import { Typography, TableHead, TableContainer, Table, TableBody, TableCell, TableRow, Paper, Button } from "@mui/material";
import axios from "axios";
import Link from 'next/link';
import { Fragment, useEffect, useState } from "react";


const Home = () => {

    const [meals, setMeals] = useState([]);

    const getAllMeals = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/menu");
            const result = await response.data;
            setMeals(result);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getAllMeals();
    }, [])

    return (
        <Fragment>   
            <Typography variant="h4" sx={{ paddingTop: 8, p:2}}>
                Menú disponible
            </Typography>      
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Menú</TableCell>
                            <TableCell align="center">Actividades</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            meals.map((item, idx) => {
                                return (
                                    <TableRow key={idx}>
                                        <TableCell align="center">{item.name}</TableCell>
                                        <TableCell align="center"> 
                                            <Link href={`/pages/${item._id}`}>
                                                <Button variant="contained" color="primary">
                                                    detalles
                                                </Button>
                                            </Link>                                                                                      
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    );
}

export default Home;