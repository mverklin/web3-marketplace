import React, { useState } from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import { db, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const FormContainer = styled.div`
  display: flex;
  gap: 40px;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: #e0e5ec;
  box-shadow: 9px 9px 16px #a3b1c6, -9px -9px 16px #ffffff;
  border-radius: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: inset 4px 4px 6px #a3b1c6, inset -4px -4px 6px #ffffff;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: inset 4px 4px 6px #a3b1c6, inset -4px -4px 6px #ffffff;
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

const CreateProductPage = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [cpv, setCpv] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setImageUrl(url);
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, 'products'), {
      title,
      category,
      cpv,
      description,
      imageUrl
    });
    console.log('Document written with ID: ', docRef.id);
  };

  return (
    <Layout>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <h1>Create New Product</h1>
          <Input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
          <Input type="number" placeholder="Cost per 1000 views (CPV)" value={cpv} onChange={(e) => setCpv(e.target.value)} />
          <TextArea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Input type="file" onChange={handleImageUpload} />
          <Button type="submit">Submit</Button>
        </Form>
        <div>
          <h2>Preview Product</h2>
          <ProductCard product={{ title, category, cpv, imageUrl }} />
        </div>
      </FormContainer>
    </Layout>
  );
};

export default CreateProductPage;
