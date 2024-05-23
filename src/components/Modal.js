import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
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

const Content = styled.div`
  background: #e0e5ec;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 9px 9px 16px #a3b1c6, -9px -9px 16px #ffffff;
  text-align: center;
  width: 80%;
  max-width: 500px;
`;

const ImageTray = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 10px;
  margin: 20px 0;
`;

const Modal = ({ product, onClose }) => (
  <Overlay onClick={onClose}>
    <Content onClick={(e) => e.stopPropagation()}>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <ImageTray>
        {product.images.map((image, index) => (
          <img key={index} src={image} alt={`${product.title} ${index + 1}`} style={{ width: '100px' }} />
        ))}
      </ImageTray>
      <button className="buy-button">Buy</button>
    </Content>
  </Overlay>
);

export default Modal;
