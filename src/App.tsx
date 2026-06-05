import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Workspace from './pages/Workspace';
import ExamPrep from './pages/ExamPrep';
import Profile from './pages/Profile';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="learn" element={<Learn />} />
        <Route path="workspace" element={<Workspace />} />
        <Route path="exam" element={<ExamPrep />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
