import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/dashboard/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Username: {data.username}</p>
      <p>Number of Posts: {data.media_count}</p>
      <p>Account Type: {data.account_type}</p>
      <img src={data.profile_picture_url} alt="Profile" />
    </div>
  );
};

export default Dashboard;
