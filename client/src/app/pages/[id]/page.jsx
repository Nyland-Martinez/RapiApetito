"use client";
import { useParams } from "next/navigation";
import { Stack, Typography, Grid, Box } from "@mui/material";
import Link from "next/link";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import AddToCartForm from "@/components/forms/AddToCartForm";

const DetailsMealPage = () => {
    const { id } = useParams(); 
    const [meal, setMeal] = useState({});

    const getMealById = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/menu/${id}`);
            const result = response.data;
            setMeal(result);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getMealById();
    }, []);

    const updateQuantity = async (addedQuantity) => {
        const newQuantity = meal.quantity - addedQuantity;
        try {
            await axios.put(`http://localhost:8000/api/menu/${id}`, { quantity: newQuantity });
            setMeal(prevMeal => ({ ...prevMeal, quantity: newQuantity }));
        } catch (error) {
            console.error(error);
        }
    };

	return (
		<Fragment>
			<Grid
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					paddingTop: 8,
				}}
			>
				<Typography variant="h6" sx={{ p: 2 }}>
					<Link href="/pages/home">Inicio</Link>
				</Typography>
				<Typography variant="h4" sx={{ p: 2 }}>
					Detalles del menú
				</Typography>
			</Grid>
			<Grid
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					p: 2,
				}}
			>
				<Typography variant="h6" sx={{ mb: 2, backgroundColor: "pink", p: 2, borderRadius: '12px' }}>
					Detalles acerca de: {meal && meal.name}
				</Typography>
			</Grid>
			{meal && (
				<Box
					sx={{
						maxWidth: "96%",
						border: "2px solid black",
						margin: "auto",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						p: 2,
						backgroundColor: "white",
					}}
				>
					<Stack direction="row" mt={2}>
						<Stack
							direction="column"
							spacing={2}
							sx={{ marginRight: 6 }}
						>
							<Typography variant="h6">Description:</Typography>
							<Typography variant="h6">Precio:</Typography>
							<Typography variant="h6">
								Cantidad disponible:
							</Typography>
						</Stack>
						<Stack
							direction="column"
							spacing={2}
							sx={{ marginLeft: 6 }}
						>
							<>
								<Typography variant="h6">
									{" "}
									{meal.description}
								</Typography>
								<Typography variant="h6">
									{" "}
									{meal.price} ₲
								</Typography>
								<Typography variant="h6">
									{" "}
									{meal.quantity}
								</Typography>
							</>
						</Stack>
					</Stack>
				</Box>
			)}
			<AddToCartForm productId={id} updateQuantity={updateQuantity} />
		</Fragment>
	);
};

export default DetailsMealPage;

