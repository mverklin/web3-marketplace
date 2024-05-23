import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaUser, FaPlus, FaChartBar } from 'react-icons/fa';

const SidebarContainer = styled.div`
  width: 200px;
  height: 100vh;
  background-color: #333;
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
`;

const SidebarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  margin-bottom: 10px;
  text-decoration: none;
  color: #fff;
  font-weight: bold;

  &.active {
    background-color: #007bff;
    color: white;
  }

  &:hover {
    background-color: #575757;
  }
`;

const Icon = styled.div`
  margin-right: 10px;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarLink to="/marketplace">
        <Icon>
          <FaHome />
        </Icon>
        Marketplace
      </SidebarLink>
      <SidebarLink to="/profile">
        <Icon>
          <FaUser />
        </Icon>
        Profile
      </SidebarLink>
      <SidebarLink to="/create-product">
        <Icon>
          <FaPlus />
        </Icon>
        Create Product
      </SidebarLink>
      <SidebarLink to="/dashboard">
        <Icon>
          <FaChartBar />
        </Icon>
        Dashboard
      </SidebarLink>
    </SidebarContainer>
  );
};

export default Sidebar;
