// Profile.js
import React, { useState, useEffect } from 'react';
import { db, storage, auth } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
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

const Profile = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name);
          setEmail(data.email);
          setWalletAddress(data.walletAddress);
          setImageUrl(data.imageUrl);
        }
      };

      fetchProfile();
    }
  }, [user]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let uploadedImageUrl = imageUrl;

    if (profileImage) {
      const storageRef = ref(storage, `profileImages/${profileImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, profileImage);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          null,
          (error) => {
            console.error('Upload failed', error);
            reject(error);
          },
          async () => {
            uploadedImageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve();
          }
        );
      });
    }

    try {
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        walletAddress,
        imageUrl: uploadedImageUrl,
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile: ', error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Wallet Address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          required
        />
        <Input type="file" accept="image/*" onChange={handleImageChange} />
        <Button type="submit">Save</Button>
      </Form>
      {imageUrl && <img src={imageUrl} alt="Profile" style={{ borderRadius: '50%', marginTop: '20px', width: '100px', height: '100px' }} />}
    </Container>
  );
};

export default Profile;
