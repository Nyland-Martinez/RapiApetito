"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Button, Stack, TextField, Typography, Box, Grid } from "@mui/material";

const EditMeal = () => {

    const router = useRouter();

    const { id } = useParams();
    const [meal, setMeal] = useState({
        name: "",
        description: "",
        price: 0,
        quantity: 0
    });

    useEffect(() => {
        getMealById();
    }, []);

    const getMealById = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/menu/${id}`);
            const result = response.data;
            setMeal(result);
        } catch (error) {
            console.error(error);
        }
    };

    const updateMeal = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8000/api/menu/${id}`, meal);
            const result = await response.data;
            console.log(result);
            router.push("/pages/home");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
        <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", p: 2, paddingTop: 8 }}>
                <Typography variant="h4">Meals</Typography>
                <Typography variant="h6">
                    <Link href="/pages/home">back to home</Link>
                </Typography>
            </Grid>
            <Typography variant="h6" sx={{ p: 2 }}>
                Add meal
            </Typography>
        <Box sx={{ padding: 2, height: 350, border: "2px solid black", backgroundColor: "white" }}>
            <form onSubmit={updateMeal}>
                <Stack direction="row" spacing={2}>
                    <Stack direction="column" spacing={2}>
                        <Typography variant="h6" component="label" htmlFor="nameInput">
                            Meal Name:
                        </Typography>
                        <TextField
                            variant="outlined"
                            id="nameInput"
                            type="text"
                            autoComplete="off"
                            value={meal.name}
                            onChange={(e) => setMeal({...meal, name: e.target.value})}
                        />
                        <Typography variant="h6" component="label" htmlFor="descriptionInput">
                            Meal Description:
                        </Typography>
                        <TextField
                            variant="outlined"
                            id="descriptionInput"
                            type="text"
                            autoComplete="off"
                            value={meal.description}
                            onChange={(e) => setMeal({...meal, description: e.target.value})}
                        />
                        <Stack>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ width: "fit-content" }}
                            >
                                Edit
                            </Button>
                        </Stack>
                    </Stack>
                    <Stack direction="column" spacing={2}>
                        <Typography variant="h6" component="label" htmlFor="priceInput">
                            Price:
                        </Typography>
                        <TextField
                            variant="outlined"
                            id="priceInput"
                            type="number"
                            autoComplete="off"
                            value={meal.price}
                            onChange={(e) => setMeal({...meal, price: e.target.value})}
                        />
                        <Typography variant="h6" component="label" htmlFor="quantityInput">
                            Quantity:
                        </Typography>
                        <TextField
                            variant="outlined"
                            id="quantityInput"
                            type="number"
                            autoComplete="off"
                            value={meal.quantity}
                            onChange={(e) => setMeal({...meal, quantity: e.target.value})}
                        />
                    </Stack>
                </Stack>
            </form>
        </Box>
        </>
    );
};

export default EditMeal;
