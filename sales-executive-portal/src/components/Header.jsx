import React, { useState } from 'react';
import { 
  ChevronDown, 
  RotateCw, 
  Bell, 
  User, 
  LogOut, 
  Calendar, 
  ClipboardList, 
  ShoppingBag, 
  Users, 
  FileText, 
  GraduationCap, 
  BarChart2, 
  Settings,
  CheckCircle,
  X
} from 'lucide-react';

export default function Header({ currentView, setCurrentView, profile, showToast }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const notificationsList = [
    { id: 1, text: "Target Achievement: 82% reached for September", time: "10 mins ago", unread: true },
    { id: 2, text: "New Campaign Launched: HeartBeat 2026", time: "1 hour ago", unread: true },
    { id: 3, text: "ASM Rajesh Kumar approved Tour Plan for W3", time: "2 hours ago", unread: true },
    { id: 4, text: "Stock update: Nebicard 5mg replenished at C&F", time: "Yesterday", unread: false },
    { id: 5, text: "Reminder: Submit RCPA report for Bommanahalli", time: "2 days ago", unread: false },
    { id: 6, text: "Compliance training mandatory before Sep 15", time: "3 days ago", unread: false }
  ];

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showToast("Data synchronized successfully with Torrent SFA Central!", "success");
    }, 1000);
  };

  const navMenus = [
    {
      label: "Master",
      items: [
        { name: "Doctor Master", view: "doctors" },
        { name: "Chemist Master", view: "chemists" },
        { name: "Stockist Master", view: "stockists" },
        { name: "Product Catalog", view: "products" }
      ]
    },
    {
      label: "Daily Activities",
      items: [
        { name: "New Daily Reporting", view: "reporting" },
        { name: "Monthly Tour Plan (MTP)", view: "tour-plan" },
        { name: "Leave Application", view: "leave" },
        { name: "Expense Entry", view: "expenses" }
      ]
    },
    {
      label: "Sales",
      items: [
        { name: "Order Booking (POB)", view: "orders" },
        { name: "Secondary Sales Entry", view: "secondary" },
        { name: "Target vs Achievement", view: "dashboard" }
      ]
    },
    {
      label: "Marketing",
      items: [
        { name: "Campaign Master", view: "campaigns" },
        { name: "Samples & Giveaways", view: "samples" },
        { name: "Detailing Slides (e-Detailing)", view: "edetailing" }
      ]
    },
    {
      label: "HR",
      items: [
        { name: "My Profile", view: "profile" },
        { name: "Daily Attendance", view: "attendance" },
        { name: "Holiday List 2026", view: "holidays" }
      ]
    },
    {
      label: "Sales Admin",
      items: [
        { name: "Doctor Addition Request", view: "doctor-request" },
        { name: "Territory Mapping", view: "territory" },
        { name: "Manager Approvals", view: "approvals" }
      ]
    },
    {
      label: "Call Solution",
      items: [
        { name: "Doctor Call Planning", view: "reporting" },
        { name: "RCPA Entry", view: "rcpa" },
        { name: "Chemists Visited", view: "chemists-visited" }
      ]
    },
    {
      label: "Reports",
      items: [
        { name: "Executive DCR Summary", view: "reporting" },
        { name: "Coverage & Call Average", view: "dashboard" },
        { name: "Doctor Frequency Analysis", view: "doctors" }
      ]
    },
    {
      label: "Training",
      items: [
        { name: "LMS Knowledge Modules", view: "training" },
        { name: "Product Knowledge Quiz", view: "quiz" }
      ]
    }
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 flex items-center justify-between h-[58px]">
        {/* Brand Logo & SFA title */}
        <div className="flex items-center gap-6">
          <div 
            onClick={() => setCurrentView("dashboard")} 
            className="flex items-center gap-2.5 cursor-pointer select-none group"
            title="Go to SFA Dashboard"
          >
            <div className="flex flex-col">
              <span className="text-[17px] font-black tracking-tight text-[#0f2e5a] leading-none">
                TORRENT
              </span>
              <span className="text-[9px] font-bold tracking-widest text-[#00838f] leading-tight">
                PHARMA
              </span>
            </div>
            <span className="text-gray-300 text-xl font-light">|</span>
            <span className="text-[20px] font-extrabold text-[#113f7c] tracking-wide">
              SFA
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="hidden xl:flex items-center space-x-0.5 text-[12.5px] text-gray-700 font-medium">
            <button
              onClick={() => setCurrentView("dashboard")}
              className={`px-2.5 py-1.5 rounded hover:text-blue-700 transition-colors ${
                currentView === 'dashboard' ? 'text-blue-700 font-semibold bg-blue-50/60' : ''
              }`}
            >
              Dashboard
            </button>

            {navMenus.map((menu) => (
              <div 
                key={menu.label} 
                className="relative"
                onMouseEnter={() => setActiveDropdown(menu.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded transition-colors hover:text-blue-700 hover:bg-gray-50 ${
                    activeDropdown === menu.label ? 'text-blue-700 font-semibold' : ''
                  }`}
                >
                  <span>{menu.label}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {/* Submenu dropdown */}
                {activeDropdown === menu.label && (
                  <div className="absolute top-full left-0 w-52 bg-white border border-gray-200 rounded-md shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    {menu.items.map((subItem) => (
                      <button
                        key={subItem.name}
                        onClick={() => {
                          setCurrentView(subItem.view);
                          setActiveDropdown(null);
                        }}
                        className="w-full text-left px-3.5 py-2 text-[12px] text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors block border-b border-gray-50 last:border-0"
                      >
                        {subItem.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Right side utilities */}
        <div className="flex items-center gap-3">
          {/* Quick Nav Shortcuts for Mobile / Small screens */}
          <div className="flex xl:hidden items-center gap-1 text-xs">
            <button 
              onClick={() => setCurrentView("reporting")}
              className={`px-2 py-1 rounded ${currentView === 'reporting' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Reporting
            </button>
            <button 
              onClick={() => setCurrentView("profile")}
              className={`px-2 py-1 rounded ${currentView === 'profile' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Profile
            </button>
          </div>

          {/* Sync Refresh Button */}
          <button 
            onClick={handleSync}
            title="Sync offline data with server"
            className="p-1.5 text-gray-600 hover:text-blue-700 hover:bg-gray-100 rounded-full transition-colors relative"
          >
            <RotateCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-blue-600' : ''}`} />
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              title="Notifications"
              className="p-1.5 text-gray-600 hover:text-blue-700 hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                6
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50 animate-in fade-in duration-150">
                <div className="px-3.5 py-2 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-800">Notifications (6)</span>
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-gray-100">
                  {notificationsList.map(item => (
                    <div key={item.id} className={`p-3 text-xs hover:bg-gray-50 transition-colors ${item.unread ? 'bg-blue-50/40' : ''}`}>
                      <div className="text-gray-800 font-medium">{item.text}</div>
                      <div className="text-[10px] text-gray-400 mt-1">{item.time}</div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-gray-100 text-center">
                  <button 
                    onClick={() => {
                      setShowNotifications(false);
                      showToast("All notifications marked as read", "info");
                    }} 
                    className="text-[11px] text-blue-600 hover:underline font-medium"
                  >
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar with dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 pl-2 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-[#5c6bc0] text-white flex items-center justify-center font-bold text-xs shadow-xs ring-1 ring-gray-200 overflow-hidden">
                {profile.profilePhoto ? (
                  <img src={profile.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  profile.employeeName ? profile.employeeName.charAt(0) : "M"
                )}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-[11px] font-bold text-gray-800 leading-tight">
                  {profile.employeeName.split(' ')[0]}
                </span>
                <span className="text-[9.5px] text-gray-500 leading-none">
                  {profile.designation} • {profile.headQuarter}
                </span>
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-50">
                <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50/70">
                  <p className="text-xs font-bold text-gray-900">{profile.employeeName}</p>
                  <p className="text-[11px] text-gray-500 font-mono">Emp #{profile.employeeCode} | {profile.department}</p>
                  <p className="text-[10px] text-blue-600 mt-0.5">{profile.torrentEmail}</p>
                </div>
                <button
                  onClick={() => {
                    setCurrentView("profile");
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-gray-500" />
                  <span>My Profile</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentView("reporting");
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <ClipboardList className="w-3.5 h-3.5 text-gray-500" />
                  <span>New Daily Reporting</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentView("orders");
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-gray-500" />
                  <span>Order Booking</span>
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    showToast("Session reset to default user", "info");
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-500" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
