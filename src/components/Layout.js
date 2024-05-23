import React from 'react';
import Sidebar from './Sidebar';
import styled from 'styled-components';

const MainContainer = styled.div`
  margin-left: 220px; /* Ensure this margin is the same as the width of the Sidebar */
  padding: 20px;
  height: 100vh; /* Ensure the main content takes the full height of the viewport */
  overflow-y: auto; /* Allow scrolling if content exceeds the viewport height */
`;

const Layout = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <MainContainer>{children}</MainContainer>
    </div>
  );
};

export default Layout;
