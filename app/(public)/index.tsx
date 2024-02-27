import { Redirect } from 'expo-router';
import { useIsUserAuthenticated } from '@/src/hooks/useIsUserAthenticated';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useIsUserAuthenticated();

  if (isAuthenticated) return <Redirect href='/(auth)/dashboard' />;

  return <Redirect href='/sign-in' />;
};

export default HomePage;
