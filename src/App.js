import { Box, Button, Card, CardContent, Grid, IconButton, LinearProgress, Typography, } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove"
import AddIcon from "@mui/icons-material/Add"
import React, { useEffect, useState } from "react";


const App = () => {
    const PRODUCTS = [
        { id: 1, name: "products1", price: "285",image:"/shoes 3.jpg" },
        { id: 2, name: "products2", price: "184",image:"/shoes.jpg"  },
        { id: 3, name: "products3", price: "385",image:"/shoes5.jpg"  },
        { id: 4, name: "products4", price: "658",image:"/shoes6.jpg"  },
        { id: 5, name: "products5", price: "245",image:"/shoes6.jpg" },
        { id: 6, name: "products6", price: "445", image:"/shoes 3.jpg"},
        { id: 7, name: "products7", price: "545",image:"/shoes5.jpg" },
        { id: 8, name: "products8", price: "245" ,image:"/shoes5.jpg"},
        { id: 9, name: "products9", price: "145",image:"/shoes6.jpg" },
        { id: 10, name: "products10", price: "545" ,image:"/shoes5.jpg"},
        { id: 11, name: "products11", price: "1245",image:"/shoes6.jpg" },
        { id: 12, name: "products12", price: "1245",image:"/shoes5.jpg" },

    ]

    const [cart, setCart] = useState([])
    const [shoppingCart, setShoppingCart] = ([cart])
    console.log(shoppingCart)
    const [subTotal, setSubtotal] = useState(0)
    const FREE_GIFT = { id: 99, name: "Free Gift", price: 0 }
    const THRESHOLD = 1000



    useEffect(() => {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
        setSubtotal(total)
        if (total >= THRESHOLD && !cart.find(item => item.id === FREE_GIFT.id)) {
            setCart([...cart, { ...FREE_GIFT, quantity: 1 }])

        } else if (total < THRESHOLD) {
            setCart(cart.filter(item => item.id !== FREE_GIFT.id))

        }
    }, [cart])


    const AddToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id)
            return existing ? prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...prev, { ...product, quantity: 1 }]
        })
    }
    console.log(cart)

    const handleUpdate = (id, value) => {
        setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + value) } : item))
    }
    const handleRemoveButton = (id) => {
        setCart(prev => prev.filter(item => item.id !== id))
    }
    return (
        <>
            <Box sx={{ backgroundColor: "#CECECE",  width: "100vw", }}>
                <Box>
                    <Typography sx={{ fontFamily: "Montserrat", fontSize: "7vh", fontWeight: "bold", marginLeft: "1vh" }}>Products</Typography>
                    <Grid sx={{ display: "flex", width: "100%", flexWrap: "wrap", margin: "0.5vh", gap: "1vh", }}>
                        {PRODUCTS.map((val, index) => {
                            return (
                                <Grid item key={index} sx={{ width: "20%", }}>
                                    <Card >
                                        <CardContent sx={{ display: "flex", justifyContent: "space-between", }}>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", width: "54%" }}>
                                                {/* <Typography sx={{ fontFamily: "Montserrat", fontSize: "1.3vw" }}>{val.name}</Typography> */}
                                                <img src={val.image} style={{height:"100%",width:"100%"}}/>
                                                <Typography sx={{marginLeft:"1vh"}}>{val.price}</Typography>
                                            </Box>
                                            <Button sx={{ width:"70%",height:"12%",backgroundColor: "black", color: "#ffffff", fontFamily: "Montserrat sans-serif", marginTop: "5vh",marginLeft:"1vh" }} onClick={() => { AddToCart(val) }}>Add To Cart</Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>

                <Box>
                    <Box>
                        <Typography sx={{ fontFamily: "Montserrat", fontSize: "7vh", fontWeight: "bold", marginLeft: "1vh" }}>Shopping Cart</Typography>
                    </Box>
                    <Box sx={{ overflowY: "scroll", width: "90%", height: "30vh", gap: "1vw", display: "flex", flexDirection: "column" }}>
                        <Grid sx={{ width: "70%", marginLeft: "1vh" }}>
                            {shoppingCart.map((shopping, index) => {
                                return (
                                    <Grid item key={index}>
                                        <Card sx={{ margin: "1vh" }}>
                                            <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
                                                {/* <Typography sx={{ fontFamily: "Montserrat", fontSize: "1.5vw", marginTop: "1vh" }}>{shopping.name}</Typography> */}
                                                <img src={shopping.image} style={{height:"14vh",width:"15vw"}}/>
                                                <Typography sx={{ fontFamily: "Montserrat", fontSize: "1.5vw", marginTop: "1vh" }}>{shopping.price}*{shopping.quantity}</Typography>
                                                <Box>
                                                    {shopping.id !== FREE_GIFT.id && (
                                                        <Box sx={{display:"flex"}}>
                                                            <Box sx={{display:"flex"}}>
                                                                <IconButton onClick={() => { handleUpdate(shopping.id, -1) }}><RemoveIcon /></IconButton>
                                                                <IconButton onClick={() => { handleUpdate(shopping.id, 1) }}><AddIcon /></IconButton>
                                                            </Box>
                                                            <Button sx={{width:"70%",height:"12%", backgroundColor: "#000000", color: "#ffffff", fontFamily: "Montserrat", }} onClick={() => { handleRemoveButton(shopping.id) }}>Remove</Button>
                                                        </Box>
                                                    )}
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Box>
                </Box>
                <Box sx={{ width: "75%", margin: "1vh" }}>
                    <Typography variant="h6">subtotal:${subTotal}</Typography>
                    <LinearProgress variant="determinate" sx={{ height: "2vh", borderRadius: "1vh   " }} value={(subTotal / THRESHOLD) * 100} />
                    <Typography></Typography>
                </Box>
            </Box>
        </>
    )
}

export default App