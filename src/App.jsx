import Hero from './components/Hero';
import FeatureHighlights from './components/FeatureHighlights';
import PredictionForm from './components/PredictionForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Hero />
      <FeatureHighlights />
      <PredictionForm />
      <Footer />
    </div>
  );
}

export default App;
