"use client";
import { useEffect, useState } from 'react';
import { Typography, TableHead, TableContainer, Table, TableBody, TableCell, TableRow, Paper, Button, Grid, CircularProgress } from "@mui/material";
import Link from 'next/link';
import { Fragment } from 'react';
import axios from 'axios';

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [productNames, setProductNames] = useState({});
    
    const [error, setError] = useState(null);

    const getAllOrders = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/cart");
            const result = await response.data;
            setOrders(result);
            const productIds = result.map(order => order.productId);
            await getProductNames(productIds);
        } catch (error) {
            console.log(error);
            setError('Error al cargar los pedidos.');
        }
    };

    const getProductNames = async (productIds) => {
        try {
            const response = await axios.post("http://localhost:8000/api/menu", { productIds });
            const productNamesData = response.data.reduce((acc, curr) => {
                acc[curr._id] = curr.name;
                return acc;
            }, {});
            setProductNames(productNamesData);
        } catch (error) {
            console.error(error);
            setError('Error al cargar los nombres de los productos.');
        }
    };

    const deleteOrder = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/cart/${id}`);
            setOrders(prevOrders => prevOrders.filter(order => order._id !== id));
        } catch (error) {
            console.error(error);
            setError('Error al eliminar el pedido.');
        }
    };

    useEffect(() => {
        getAllOrders();
    }, []);

    
    return (
        <Fragment>
            <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", p: 2, paddingTop: 8 }} >
                <Typography variant="h4">
                    Orders
                </Typography>
                <Typography variant="h6">
                    <Link href="/pages/home">
                        Back to Home
                    </Link>
                </Typography>
            </Grid>

            <Typography variant="h6" sx={{ mb: 2, p: 2 }}>
                Pedidos
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
                            orders.map((order, idx) => (
                                <TableRow key={idx}>
                                    <TableCell align="center">{productNames[order.productId]}</TableCell>
                                    <TableCell align="center">
                                        <Link href={`/pages/orders/${order._id}`}>
                                            <Button variant="contained" color="primary" sx={{ mr: 2 }}>
                                                Detalles
                                            </Button>
                                        </Link>
                                        <Button variant="contained" color="error" onClick={() => deleteOrder(order._id)}>
                                            Entregar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    );
}

export default OrderPage;
