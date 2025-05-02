
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Just render the Dashboard component directly
    // No need to navigate since we're already at the root path
  }, []);

  return <Dashboard />;
};

export default Index;
