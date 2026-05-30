import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import { HomePage } from './pages/HomePage';
import { ModulePage } from './pages/ModulePage';
import { LearnPage } from './pages/LearnPage';
import { PlayPage } from './pages/PlayPage';
import { ReferencePage } from './pages/ReferencePage';
import { SummaryPage } from './pages/SummaryPage';
import { AboutPage } from './pages/AboutPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { Footer } from './components/Footer';
import styles from './App.module.css';

function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <div className={styles.app}>
          <div className={styles.content}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/module/:moduleId" element={<ModulePage />} />
              <Route path="/learn/:levelId" element={<LearnPage />} />
              <Route path="/play/:levelId" element={<PlayPage />} />
              <Route path="/reference" element={<ReferencePage />} />
              <Route path="/summary" element={<SummaryPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/roadmap" element={<RoadmapPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </GameProvider>
    </BrowserRouter>
  );
}

export default App;
