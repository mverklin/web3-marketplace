import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: #e0e5ec;
  box-shadow: 9px 9px 16px #a3b1c6, -9px -9px 16px #ffffff;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
`;

const Image = styled.img`
  max-width: 100%;
  border-radius: 10px;
`;

const Title = styled.h2`
  font-size: 20px;
  margin: 10px 0;
`;

const Category = styled.p`
  color: #555;
`;

const Cpv = styled.p`
  color: #333;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  box-shadow: 4px 4px 6px #a3b1c6, -4px -4px 6px #ffffff;
  &:hover {
    background-color: #0056b3;
  }
`;

const ProductCard = ({ product, onSelect }) => {
  return (
    <Card>
      {product.imageUrl && <Image src={product.imageUrl} alt={product.title} />}
      <Title>{product.title}</Title>
      <Category>{product.category}</Category>
      <Cpv>${product.cpv} per 1000 views</Cpv>
      {onSelect && <Button onClick={onSelect}>Select</Button>}
    </Card>
  );
};

export default ProductCard;
