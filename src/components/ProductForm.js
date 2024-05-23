import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import styled from 'styled-components';

const FormContainer = styled.div`
  background: #e0e5ec;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 9px 9px 16px #a3b1c6, -9px -9px 16px #ffffff;
`;

const ProductForm = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [cpv, setCpv] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.error(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, 'products'), {
          title,
          category,
          cpv,
          description,
          image: downloadURL,
        });
        setProgress(0);
        setTitle('');
        setCategory('');
        setCpv('');
        setDescription('');
        setImage(null);
      }
    );
  };

  return (
    <FormContainer>
      <h2>Create New Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Cost per 1000 views (CPV)"
          value={cpv}
          onChange={(e) => setCpv(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {progress > 0 && <progress value={progress} max="100" />}
    </FormContainer>
  );
};

export default ProductForm;
