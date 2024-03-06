'use client'
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Link from "next/link";
import { Button, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const DeleteMealPage = () => {

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

    const deleteMeal = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/menu/${id}`);
            const result = response.data;
            console.log(result);
            setMeals((preVal) => {
                const newList = preVal.filter((item) => item._id !== id);
                console.log(newList);
                return ([...newList]);
            })
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAllMeals();
    }, [])

    return (
        <Fragment>
            <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", p: 2, paddingTop: 8 }} >
                <Typography variant="h4">
                    Meals
                </Typography>
                <Typography variant="h6">
                    <Link href="/pages/home">
                        back to home
                    </Link>
                </Typography>
            </Grid>

            <Typography variant="h6" sx={{ mb: 2, p: 2 }}>
                Menú disponible
            </Typography>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            meals.map((item, idx) => {
                                return (
                                    <TableRow key={idx}>
                                        <TableCell align="center">{item.name}</TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" color="error" onClick={() => deleteMeal(item._id)}>
                                                delete
                                            </Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Link href={`/pages/${item._id}/edit`}>
                                                <Button variant="contained" color="primary">
                                                    editar
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

export default DeleteMealPage;