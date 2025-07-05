import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Templates from './pages/Templates';
import TemplateEditor from './pages/TemplateEditor';
import Events from './pages/Events';
import EventEditor from './pages/EventEditor';
import Certificates from './pages/Certificates';
import CertificateViewer from './pages/CertificateViewer';
import Verification from './pages/Verification';
import Settings from './pages/Settings';
import { CertificateProvider } from './context/CertificateContext';
import './App.css';

function App() {
  return (
    <CertificateProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="templates" element={<Templates />} />
              <Route path="templates/new" element={<TemplateEditor />} />
              <Route path="templates/:id/edit" element={<TemplateEditor />} />
              <Route path="events" element={<Events />} />
              <Route path="events/new" element={<EventEditor />} />
              <Route path="events/:id/edit" element={<EventEditor />} />
              <Route path="certificates" element={<Certificates />} />
              <Route path="certificates/:id" element={<CertificateViewer />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/verify" element={<Verification />} />
          </Routes>
        </div>
      </Router>
    </CertificateProvider>
  );
}

export default App;