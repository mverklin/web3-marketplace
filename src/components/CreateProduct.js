// CreateProduct.js
import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  margin-left: 220px; /* Adjusted for the sidebar */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 400px;
  background: #1e1e1e;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 10px;
  border: none;
  background: #2e2e2e;
  color: white;
  font-size: 1em;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 10px;
  border: none;
  background: #2e2e2e;
  color: white;
  font-size: 1em;
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 10px;
  border: none;
  background: #007bff;
  color: white;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const CreateProduct = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image) {
      const storageRef = ref(storage, `productImages/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          console.error('Upload failed', error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          try {
            const docRef = await addDoc(collection(db, 'products'), {
              title,
              category,
              cost: parseFloat(cost).toFixed(2), // Ensure cost is formatted to two decimal places
              description,
              imageUrl: downloadURL,
            });
            console.log('Product added with ID: ', docRef.id);
            alert('Product created successfully!');
            // Reset form fields
            setTitle('');
            setCategory('');
            setCost('');
            setDescription('');
            setImage(null);
          } catch (error) {
            console.error('Error adding product: ', error);
          }
        }
      );
    } else {
      alert('Please upload an image');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Comedy">Comedy</option>
          <option value="Gaming">Gaming</option>
          <option value="News">News</option>
          <option value="Politics">Politics</option>
          <option value="Sports">Sports</option>
          <option value="Beauty">Beauty</option>
          <option value="Fashion">Fashion</option>
          <option value="Markets">Markets</option>
          <option value="Business">Business</option>
          <option value="Startup">Startup</option>
          <option value="Entrepreneur">Entrepreneur</option>
          <option value="Tech">Tech</option>
          <option value="Family">Family</option>
          <option value="Bitcoin">Bitcoin</option>
          <option value="Crypto">Crypto</option>
          <option value="Finance">Finance</option>
          <option value="Media">Media</option>
          <option value="Content Creation">Content Creation</option>
          <option value="Movies">Movies</option>
          <option value="Entertainment">Entertainment</option>
        </Select>
        <Input
          type="number"
          placeholder="Cost per 1k Imps"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Input type="file" accept="image/*" onChange={handleImageChange} required />
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default CreateProduct;
