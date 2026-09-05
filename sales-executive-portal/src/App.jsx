import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProfileView from './components/ProfileView';
import DailyReportingView from './components/DailyReportingView';
import DoctorCallModal from './components/DoctorCallModal';
import DashboardView from './components/DashboardView';
import OrderBookingView from './components/OrderBookingView';
import DoctorMasterView from './components/DoctorMasterView';
import Toast from './components/Toast';
import { initialProfileData, initialDoctors, sampleOrders } from './data/mockData';

export default function App() {
  // Navigation view: 'reporting', 'profile', 'dashboard', 'orders', 'doctors'
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('sfa_current_view') || 'reporting'; // Start on reporting to showcase screenshots
  });

  // State with LocalStorage persistence
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('sfa_profile');
    return saved ? JSON.parse(saved) : initialProfileData;
  });

  const [doctors, setDoctors] = useState(() => {
    const saved = localStorage.getItem('sfa_doctors');
    return saved ? JSON.parse(saved) : initialDoctors;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('sfa_orders');
    return saved ? JSON.parse(saved) : sampleOrders;
  });

  const [selectedDoctorForModal, setSelectedDoctorForModal] = useState(null);
  const [toast, setToast] = useState(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('sfa_current_view', currentView);
  }, [currentView]);

  useEffect(() => {
    localStorage.setItem('sfa_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('sfa_doctors', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('sfa_orders', JSON.stringify(orders));
  }, [orders]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Handlers
  const handleUpdateProfile = (updatedData) => {
    setProfile(updatedData);
  };

  const handleAddDoctorToDaily = (doctorId) => {
    setDoctors(prev => prev.map(doc => {
      if (doc.id === doctorId) {
        return { ...doc, planned: false }; // Added to unplanned list
      }
      return doc;
    }));
  };

  const handleRemoveDoctorFromDaily = (doctorId) => {
    setDoctors(prev => prev.filter(doc => doc.id !== doctorId));
  };

  const handleSaveDoctorCall = (doctorId, callDetails) => {
    setDoctors(prev => prev.map(doc => {
      if (doc.id === doctorId) {
        return {
          ...doc,
          status: "Reported",
          callDetails
        };
      }
      return doc;
    }));
  };

  const handleAddOrder = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
  };

  const handleFinalSubmitDCR = () => {
    // Mark all planned calls as completed or submitted
    setDoctors(prev => prev.map(doc => ({
      ...doc,
      status: "Reported"
    })));
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* SFA Global Header matching Torrent SFA screenshots */}
      <Header 
        currentView={currentView}
        setCurrentView={setCurrentView}
        profile={profile}
        showToast={showToast}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentView === 'reporting' && (
          <DailyReportingView 
            doctors={doctors}
            onAddDoctor={handleAddDoctorToDaily}
            onRemoveDoctor={handleRemoveDoctorFromDaily}
            onOpenCallModal={(doc) => setSelectedDoctorForModal(doc)}
            onFinalSubmitDCR={handleFinalSubmitDCR}
            showToast={showToast}
          />
        )}

        {currentView === 'profile' && (
          <ProfileView 
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            showToast={showToast}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardView 
            profile={profile}
            doctors={doctors}
            orders={orders}
            setCurrentView={setCurrentView}
            onOpenCallModal={(doc) => setSelectedDoctorForModal(doc)}
          />
        )}

        {currentView === 'orders' && (
          <OrderBookingView 
            orders={orders}
            onAddOrder={handleAddOrder}
            showToast={showToast}
          />
        )}

        {currentView === 'doctors' && (
          <DoctorMasterView 
            doctors={doctors}
            onOpenCallModal={(doc) => setSelectedDoctorForModal(doc)}
            setCurrentView={setCurrentView}
          />
        )}
      </main>

      {/* Doctor Details Call Modal (Image 5) */}
      {selectedDoctorForModal && (
        <DoctorCallModal 
          doctor={selectedDoctorForModal}
          onClose={() => setSelectedDoctorForModal(null)}
          onSaveCall={handleSaveDoctorCall}
          showToast={showToast}
        />
      )}

      {/* Toast feedback */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Floating Bottom Quick Switcher */}
      <footer className="fixed bottom-3 left-1/2 transform -translate-x-1/2 z-30 bg-slate-900/90 text-white backdrop-blur-md px-4 py-2 rounded-full shadow-2xl border border-white/20 flex items-center gap-1 sm:gap-3 text-xs">
        <span className="text-gray-400 font-semibold text-[11px] hidden sm:inline mr-1">View:</span>
        
        <button
          onClick={() => setCurrentView('reporting')}
          className={`px-3 py-1 rounded-full transition-all ${
            currentView === 'reporting' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'text-gray-300 hover:text-white'
          }`}
        >
          Daily Reporting
        </button>

        <button
          onClick={() => setCurrentView('profile')}
          className={`px-3 py-1 rounded-full transition-all ${
            currentView === 'profile' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'text-gray-300 hover:text-white'
          }`}
        >
          My Profile
        </button>

        <button
          onClick={() => setCurrentView('dashboard')}
          className={`px-3 py-1 rounded-full transition-all ${
            currentView === 'dashboard' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'text-gray-300 hover:text-white'
          }`}
        >
          Dashboard
        </button>

        <button
          onClick={() => setCurrentView('orders')}
          className={`px-3 py-1 rounded-full transition-all ${
            currentView === 'orders' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'text-gray-300 hover:text-white'
          }`}
        >
          Order POB
        </button>

        <button
          onClick={() => setCurrentView('doctors')}
          className={`px-3 py-1 rounded-full transition-all ${
            currentView === 'doctors' ? 'bg-blue-600 text-white font-bold shadow-xs' : 'text-gray-300 hover:text-white'
          }`}
        >
          Doctor Master
        </button>
      </footer>
    </div>
  );
}
