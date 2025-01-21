import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@heroui/react';

const HomePage = () => {
    return (
      <div>
        <Helmet>
          <title>PrimeScope News | Home</title>
        </Helmet>
        Home page is Here
        <Button
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
          radius="full"
        >
          Button
        </Button>
      </div>
    );
};

export default HomePage;