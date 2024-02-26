import 'text-encoding-polyfill';
// import Joi from '@hapi/joi';

import { Redirect } from 'expo-router';

const HomePage: React.FC = () => {
  return <Redirect href='/sign-in' />;
};

export default HomePage;
