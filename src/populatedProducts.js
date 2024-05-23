// populateProducts.js
import { db } from './src/firebase'; // Adjust the path to import firebase from src directory
import { collection, addDoc } from 'firebase/firestore';

const addPrepopulatedProducts = async () => {
  const products = [
    {
      title: "Product A",
      category: "Category A",
      cost: 1000,
      description: "Description for Product A",
      imageUrl: "link_to_image_A",
    },
    {
      title: "Product B",
      category: "Category B",
      cost: 1500,
      description: "Description for Product B",
      imageUrl: "link_to_image_B",
    },
    // Add more products as needed
  ];

  const productsCollection = collection(db, 'products');

  products.forEach(async (product) => {
    try {
      await addDoc(productsCollection, product);
      console.log(`Product ${product.title} added successfully!`);
    } catch (e) {
      console.error("Error adding product: ", e);
    }
  });
};

addPrepopulatedProducts();
