"use client";
import { useState } from "react";
import axios from "axios";
import { Button, Stack, TextField, Typography, Box } from "@mui/material";
import { useRouter } from 'next/navigation';

const AddToCartForm = ({ productId, updateQuantity }) => {

    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [location, setLocation] = useState("");
    const [error, setError] = useState("");

    const handleAddToCart = async (e) => {
        e.preventDefault();

        if (!isNaN(quantity)) {
            const quantityNumber = parseInt(quantity, 10); 

            try {
                const response = await axios.post(
                    "http://localhost:8000/api/cart",
                    {
                        productId,
                        quantity: quantityNumber, // Utilizar la cantidad convertida
                        location,
                    }
                );
                console.log(response.data);
                updateQuantity(quantityNumber); // Pasar la cantidad del producto agregada al carrito
                router.push("/pages/home");
            } catch (error) {
                setError(error.response.data.message);
            }
        } else {
            setError("La cantidad debe ser un número válido");
        }
    };

    return (
        <>
            <Box sx={{ padding: 2, height: 200, border: "2px solid black", mt: 2 }}>
                <form onSubmit={handleAddToCart}>
                    <Typography variant="h6" sx={{ p: 2 }}>Hacer pedido</Typography>
                    <Stack direction="row" spacing={2}>
                        <Stack>
                            <TextField
                                label="Cantidad"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Ubicación"
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </Stack>
                        <Stack justifyContent="center">
                            <Button variant="contained" color="success" type="submit">
                                Hacer pedido
                            </Button>
                        </Stack>
                        {error && (
                            <Typography variant="body2" color="error">
                                {error}
                            </Typography>
                        )}
                    </Stack>
                </form>
            </Box>
        </>
    );
};

export default AddToCartForm;
