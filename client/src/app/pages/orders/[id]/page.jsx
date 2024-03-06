"use client"
import { useEffect, useState } from 'react';
import { Typography , Paper, Grid, CircularProgress } from "@mui/material";
import { useParams } from "next/navigation";
import axios from 'axios';

const OrderDetailsPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productName, setProductName] = useState("");

    const fetchOrderInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/cart/${id}`); 
            setOrder(response.data);
            const productResponse = await axios.get(`http://localhost:8000/api/menu/${response.data.productId}`);
            setProductName(productResponse.data.name);
        } catch (error) {
            console.error(error);
            setError('Error al cargar la información del pedido.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderInfo();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography variant="body1" color="error">{error}</Typography>;
    }
    
    return (
        <>
            <Paper elevation={3} sx={{ p: 2, maxWidth: '400px', margin: "auto", marginTop:20, backgroundColor: "orange" }}>
                <Typography variant="h4" gutterBottom>¡Producto Agregado al Carrito!</Typography>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>Comida: {productName}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>Cantidad: {order.quantity}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" gutterBottom>Ubicación: {order.location}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </>
        
    );
}

export default OrderDetailsPage;
