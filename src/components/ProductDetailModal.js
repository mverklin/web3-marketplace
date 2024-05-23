// ProductDetailModal.js
import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #1c1c1c;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 20px 20px 60px #171717, -20px -20px 60px #353535;
  width: 80%;
  max-width: 600px;
`;

const CloseButton = styled.button`
  background: #007bff;
  color: #fff;
  padding: 8px 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const ProductDetailModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <img src={product.imageUrl} alt={product.title} style={{ width: '100%' }} />
        <p>Category: {product.category}</p>
        <p>Cost per 1000 views: ${(product.cost / 1000).toFixed(2)} CPV</p>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProductDetailModal;
