"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useCartStore } from "@/stores/cartStore";
import { Product } from "@/types/product";
import Header from "@/components/layout/Header";
import { useSnackbarStore } from "@/stores/useSnackbarStore";

export default function DashboardOverview() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const itemsPerPage = 15;
  const { addToCart, clearCart } = useCartStore();

  useEffect(() => {
    const generated = Array.from({ length: 50 }).map((_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
      price: Math.floor(Math.random() * 100) + 1,
      category: i % 2 === 0 ? "Electronics" : "Clothing",
    }));
    setProducts(generated);
  }, []);

  const filteredProducts = products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) &&
        (filter === "All" || p.category === filter)
    )
    .sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleCheckout = () => {
    clearCart();
    useSnackbarStore
      .getState()
      .showSnackbar("Checkout successfully", "success");
  };

  return (
    <Box>
      <Header products={products} onCheckout={handleCheckout} />

      <Box sx={{ p: 4, maxWidth: "1000px", mx: "auto" }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
          <TextField
            variant="outlined"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            displayEmpty
          >
            <MenuItem value="All">All Categories</MenuItem>
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Clothing">Clothing</MenuItem>
          </Select>

          <Select value={sort} onChange={(e) => setSort(e.target.value)}>
            <MenuItem value="asc">Price: Low to High</MenuItem>
            <MenuItem value="desc">Price: High to Low</MenuItem>
          </Select>
        </Box>

        <Grid container spacing={2}>
          {paginatedProducts.map((product) => (
            <Grid key={product.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: {product.category}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => addToCart(product.id)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 4,
          }}
        >
          <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </Button>
          <Typography>
            Page {page} of {totalPages}
          </Typography>
          <Button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
