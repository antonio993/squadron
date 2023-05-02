import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export const Home = () => {
  const { t } = useTranslation();

  return (
    <div style={{ textAlign: 'center', padding: '25px' }}>
      {t('welcomeMessage')}
      <NavLink to='/connector'> TO CONNECTOR</NavLink>;
    </div>
  );
};

export default Home;