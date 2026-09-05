import React from 'react';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  ShoppingBag, 
  Calendar, 
  FileText, 
  Award, 
  ArrowRight,
  Stethoscope,
  Target
} from 'lucide-react';

export default function DashboardView({ profile, doctors, orders, setCurrentView, onOpenCallModal }) {
  const reportedCalls = doctors.filter(d => d.status === 'Reported').length;
  const totalCalls = doctors.length;
  const coveragePercent = Math.round((reportedCalls / totalCalls) * 100) || 0;
  const totalPOB = orders.reduce((sum, ord) => sum + ord.totalAmount, 0);

  return (
    <div className="max-w-[1700px] mx-auto p-4 md:p-6 space-y-6 pb-20">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#113f7c] to-[#1e5bb0] rounded-xl p-6 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-200 text-xs font-semibold tracking-wide uppercase">
            <span>Torrent Pharmaceuticals Ltd</span>
            <span>•</span>
            <span>SFA Field Force Portal</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight">
            Welcome back, {profile.employeeName}!
          </h1>
          <p className="text-xs text-blue-100">
            Headquarter: <strong>{profile.headQuarter}</strong> | Division: <strong>{profile.department}</strong> | Employee Code: <strong>{profile.employeeCode}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCurrentView("reporting")}
            className="px-4 py-2.5 bg-white text-[#113f7c] rounded-lg text-xs font-bold hover:bg-blue-50 shadow-sm transition-all flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Open Today's DCR</span>
          </button>
          
          <button 
            onClick={() => setCurrentView("orders")}
            className="px-4 py-2.5 bg-blue-500/30 hover:bg-blue-500/40 text-white border border-white/30 rounded-lg text-xs font-semibold backdrop-blur-xs transition-all flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Book Order (POB)</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Today's Calls */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="sfa-label uppercase tracking-wider font-semibold">Today's Doctor Calls</span>
            <div className="text-2xl font-black text-gray-900 mt-1">
              {reportedCalls} <span className="text-sm font-normal text-gray-400">/ {totalCalls}</span>
            </div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{coveragePercent}% Target achieved</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Stethoscope className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Call Average */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="sfa-label uppercase tracking-wider font-semibold">Call Average (MTD)</span>
            <div className="text-2xl font-black text-gray-900 mt-1">
              10.8 <span className="text-sm font-normal text-gray-400">calls/day</span>
            </div>
            <div className="text-[11px] text-blue-600 font-medium mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>HQ Benchmark: 10.0</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Secondary Sales / POB */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="sfa-label uppercase tracking-wider font-semibold">Total POB Booked</span>
            <div className="text-2xl font-black text-gray-900 mt-1">
              ₹{totalPOB.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-gray-500 font-medium mt-1">
              {orders.length} Chemist Orders logged
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Compliance & Frequency */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="sfa-label uppercase tracking-wider font-semibold">Core Doctor Coverage</span>
            <div className="text-2xl font-black text-gray-900 mt-1">
              94.2%
            </div>
            <div className="text-[11px] text-amber-600 font-medium mt-1 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span>Top 10% in Bangalore Zone</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Main Content Grid: Today's Call Schedule + Monthly Target Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Doctor Visits Quick List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Today's Doctor Call List</h2>
              <p className="text-xs text-gray-500">Quick view of scheduled visits for Bangalore Delta territory</p>
            </div>
            <button 
              onClick={() => setCurrentView("reporting")}
              className="text-xs text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1"
            >
              <span>Manage Full DCR</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {doctors.slice(0, 5).map((doc) => (
              <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                    doc.status === 'Reported' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {doc.specialty}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-900">Dr. {doc.name}</span>
                      <span className="text-[10px] text-gray-400 font-mono">#{doc.advaitNo}</span>
                      <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-gray-100 text-gray-600 font-semibold">
                        Indication: {doc.indication}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-500 mt-0.5">
                      Brands: {doc.brands}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10.5px] px-2 py-0.5 rounded font-bold ${
                    doc.status === 'Reported' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {doc.status}
                  </span>
                  <button 
                    onClick={() => onOpenCallModal(doc)}
                    className="px-2.5 py-1 bg-white hover:bg-blue-50 text-blue-700 border border-blue-300 rounded text-xs font-medium"
                  >
                    {doc.status === 'Reported' ? 'Details' : 'Log Call'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Monthly Sales Target Tracker & Quick Shortcuts */}
        <div className="space-y-6">
          
          {/* Target Progress Box */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-xs p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
              September Sales Target
            </h3>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-gray-600">Secondary Sales</span>
                <span className="text-blue-700">₹4,82,000 / ₹6,00,000</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '80.3%' }}></div>
              </div>
              <span className="text-[10.5px] text-gray-500 mt-1 block">80.3% achieved (18 days remaining)</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-gray-600">Core Doctor Visits (Target: 180)</span>
                <span className="text-emerald-700">142 Visits</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '78.8%' }}></div>
              </div>
            </div>

            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-900">
              <span className="font-bold">Focus Brand for Q3:</span> Nebicard 5mg & Chymoral Forte have special incentive rewards!
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-xs p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3">
              Field Force Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button 
                onClick={() => setCurrentView("reporting")}
                className="p-3 bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 text-left transition-colors"
              >
                <FileText className="w-4 h-4 text-blue-600 mb-1" />
                <div className="font-bold text-gray-800">Daily Report</div>
                <div className="text-[10px] text-gray-500">File doctor calls</div>
              </button>

              <button 
                onClick={() => setCurrentView("orders")}
                className="p-3 bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 text-left transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-purple-600 mb-1" />
                <div className="font-bold text-gray-800">Book POB</div>
                <div className="text-[10px] text-gray-500">Chemist orders</div>
              </button>

              <button 
                onClick={() => setCurrentView("doctors")}
                className="p-3 bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 text-left transition-colors"
              >
                <Users className="w-4 h-4 text-emerald-600 mb-1" />
                <div className="font-bold text-gray-800">Doctor Master</div>
                <div className="text-[10px] text-gray-500">Territory directory</div>
              </button>

              <button 
                onClick={() => setCurrentView("profile")}
                className="p-3 bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 text-left transition-colors"
              >
                <Award className="w-4 h-4 text-amber-600 mb-1" />
                <div className="font-bold text-gray-800">My Profile</div>
                <div className="text-[10px] text-gray-500">View credentials</div>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
