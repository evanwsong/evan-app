import React from "react";
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();

  const items = [
    { label: 'Home', command: () => navigate('/') },
    { label: 'Test', command: () => navigate('/test') },
    { label: 'About Evan', command: () => navigate('/about') }
  ];

  return (
    <Menubar model={items} />
  );
}

export default Navigation;