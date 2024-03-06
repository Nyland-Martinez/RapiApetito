'use client'
import { useState, Fragment } from "react";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const CreateNewMeal = () => {

    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const [errors, setErrors] = useState({
        name: false,
        description: false,
        price: false,
        quantity: false,
    });

    const createMeal = async (e) => {
        e.preventDefault();

        if (!validateFields()) {
            return;
        }

        const data = {
            name,
            description,
            price,
            quantity,
        };

        try {
            const response = await axios.post("http://localhost:8000/api/menu", data);
            console.log(response.data);
            resetForm();
            router.push("/pages/home");
        } catch (error) {
            console.error(error);
        }
    };

    const validateFields = () => {
        const newErrors = {
            name: name.length < 3,
            description: description.length < 3,
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error);
    };

    const resetForm = () => {
        setName("");
        setDescription("");
        setPrice(0);
        setQuantity(0);
        setErrors({
            name: false,
            description: false,
            price: false,
            quantity: false,
        });
    };

    return (
        <Fragment>
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
                <form onSubmit={createMeal}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Stack direction="column" spacing={2}>
                                <Typography variant="h6" component="label" htmlFor="nameInput">
                                    Meal Name:
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    id="nameInput"
                                    type="text"
                                    autoComplete="off"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    error={errors.name}
                                    helperText={errors.name ? 'Meal name must be at least 2 characters or more' : ""}
                                />
                                <Typography variant="h6" component="label" htmlFor="descriptionInput">
                                    Meal Description:
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    id="descriptionInput"
                                    type="text"
                                    autoComplete="off"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    error={errors.description}
                                    helperText={errors.description ? 'Meal description must be at least 2 characters or more' : ""}
                                />
                                <Stack>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        sx={{ width: "fit-content" }}
                                    >
                                        Add meal
                                    </Button>
                                </Stack>
                            </Stack>
                        </Grid>
                        <Grid item xs={6} >
                            <Stack direction="column" spacing={2}>
                                <Typography variant="h6" component="label" htmlFor="priceInput">
                                        Price:
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    id="priceInput"
                                    type="number"
                                    autoComplete="off"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    />
                                <Typography variant="h6" component="label" htmlFor="quantityInput">
                                    Quantity:
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    id="quantityInput"
                                    type="number"
                                    autoComplete="off"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    />
                            </Stack>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Fragment>
    );
};

export default CreateNewMeal;
