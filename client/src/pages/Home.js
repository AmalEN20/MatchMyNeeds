import '../../src/App.css';
import HeroSection from '../../src/components/HeroSection/HeroSection';
import Footer from '../components/Footer/Footer';

function Home() {
  const divStyles = {
    boxShadow: 'inset 0 0 0 1000px rgba(0, 0, 0, 0.2)',

  };

  return (
    <div style={divStyles}>
    <>
      <HeroSection />
      <Footer />
      
    </>
    </div>
  );
}

export default Home;