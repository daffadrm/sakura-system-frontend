"use client";

import {
  Box,
  Typography,
  IconButton,
  Badge,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import { Product } from "@/types/product";

interface HeaderProps {
  products: Product[];
  onCheckout: () => void;
}

export default function Header({ products, onCheckout }: HeaderProps) {
  const { cart, removeFromCart } = useCartStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleCartClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCartClose = () => {
    setAnchorEl(null);
  };
  const cartOpen = Boolean(anchorEl);
  const totalCartPrice = cart.reduce((acc, id) => {
    const product = products.find((p) => p.id === id);
    return acc + (product?.price || 0);
  }, 0);

  return (
    <Box
      component="header"
      sx={{
        backgroundColor: "primary.main",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 3,
        py: 2,
      }}
    >
      <Typography variant="h6">E-Commerce Store</Typography>
      <IconButton color="inherit" onClick={handleCartClick}>
        <Badge badgeContent={cart.length} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      <Popover
        open={cartOpen}
        anchorEl={anchorEl}
        onClose={handleCartClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box sx={{ p: 2, minWidth: 280 }}>
          <Typography variant="subtitle1" gutterBottom>
            Cart Items
          </Typography>
          {cart.length === 0 ? (
            <Typography variant="body2">Your cart is empty.</Typography>
          ) : (
            <>
              <List>
                {cart.map((id, index) => {
                  const product = products.find((p) => p.id === id);
                  return (
                    <ListItem key={`${id}-${index}`}>
                      <ListItemText
                        primary={product?.name || "Unknown Product"}
                        secondary={`$${product?.price || "-"}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => removeFromCart(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
              <Typography sx={{ mt: 2 }}>
                <strong>Total:</strong> ${totalCartPrice}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => {
                  handleCartClose();
                  onCheckout();
                }}
              >
                Checkout
              </Button>
            </>
          )}
        </Box>
      </Popover>
    </Box>
  );
}
