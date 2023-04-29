import '../../src/App.css';
import HeroSection from '../../src/components/HeroSection/HeroSection';
import RequestPosts from '../components/AllRequests';
import { useQuery } from '@apollo/client';
import { QUERY_REQUESTS } from '../utils/queries';
import RequestForm from '../components/RequestForm';

function Home() {
  const { loading, data } = useQuery(QUERY_REQUESTS);
  const requests = data?.requests || [];

  return (
    <>
      <HeroSection />
      <RequestForm />
      {loading ? (
        <div>Loading...</div>
      ) : (
      <RequestPosts
      requests={requests}/>
      )}
    </>
  );
}

export default Home;