// Marketplace.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  margin-left: 220px; /* Adjusted for the sidebar */
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const Card = styled.div`
  background: #1e1e1e;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
`;

const CardInfo = styled.div`
  margin-top: 10px;
  color: #ffffff;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.2em;
`;

const CardDescription = styled.p`
  margin: 0;
  color: #b0b0b0;
  font-size: 0.9em;
`;

const CardPrice = styled.p`
  margin: 0;
  color: #00b894;
  font-size: 1em;
  font-weight: bold;
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 10px;
  border: none;
  background: #007bff;
  color: white;
  font-size: 1em;
  cursor: pointer;
  align-self: flex-end;

  &:hover {
    background: #0056b3;
  }
`;

const Marketplace = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsArray = [];
      querySnapshot.forEach((doc) => {
        productsArray.push({ id: doc.id, ...doc.data() });
      });
      setProducts(productsArray);
    };

    fetchProducts();
  }, []);

  return (
    <Container>
      <Grid>
        {products.map((product) => (
          <Card key={product.id}>
            <CardImage src={product.imageUrl} alt={product.title} />
            <CardInfo>
              <CardTitle>{product.title}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
              <CardPrice>${parseFloat(product.cost).toFixed(2)} CPV</CardPrice>
            </CardInfo>
            <Button>Select</Button>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default Marketplace;
