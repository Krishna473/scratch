import React, { useState } from 'react';
import { Search, Filter, Stethoscope, Phone, MapPin, Calendar, CheckCircle } from 'lucide-react';

export default function DoctorMasterView({ doctors, onOpenCallModal, setCurrentView }) {
  const [search, setSearch] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const specialties = Array.from(new Set(doctors.map(d => d.specialty)));

  const filteredDoctors = doctors.filter(doc => {
    const matchSearch = !search || 
      doc.name.toLowerCase().includes(search.toLowerCase()) || 
      doc.advaitNo.includes(search) ||
      doc.hospital.toLowerCase().includes(search.toLowerCase());
    const matchSpec = specialtyFilter === 'all' || doc.specialty === specialtyFilter;
    const matchCat = categoryFilter === 'all' || doc.indication === categoryFilter;

    return matchSearch && matchSpec && matchCat;
  });

  return (
    <div className="max-w-[1700px] mx-auto p-4 md:p-6 space-y-6 pb-20">
      
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Doctor Master Directory</h1>
          <p className="text-xs text-gray-500">Bangalore Delta Territory • Approved Doctor List (ADL)</p>
        </div>

        <button 
          onClick={() => setCurrentView("reporting")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold shadow-xs"
        >
          Daily Reporting
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[220px] relative">
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search doctor by name, Advait No., or hospital..."
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-600">Specialty:</span>
            <select 
              value={specialtyFilter} 
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-xs bg-white focus:outline-none"
            >
              <option value="all">All Specialties</option>
              {specialties.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-600">Category:</span>
            <select 
              value={categoryFilter} 
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-xs bg-white focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="Excel">Excel (Core)</option>
              <option value="VIP">VIP</option>
              <option value="A">Class A</option>
              <option value="B">Class B</option>
            </select>
          </div>
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDoctors.map(doc => (
          <div key={doc.id} className="bg-white rounded-xl border border-gray-200 shadow-xs p-5 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase">Dr. {doc.name}</h3>
                  <div className="text-[11px] text-gray-500 font-medium">{doc.qualification}</div>
                </div>
                <span className="px-2 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-bold rounded">
                  {doc.specialty}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-gray-600 my-3">
                <div className="flex items-center gap-1.5 text-gray-500">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{doc.hospital}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 font-mono text-[11px]">Advait No: #{doc.advaitNo}</span>
                  <span>•</span>
                  <span className="text-amber-600 font-semibold text-[11px]">Rating: {doc.indication}</span>
                </div>
                <div className="text-[11px] text-gray-700 bg-gray-50 p-2 rounded border border-gray-100">
                  <span className="font-semibold text-gray-800">Target Brands:</span> {doc.brands}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                doc.status === 'Reported' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
              }`}>
                {doc.status === 'Reported' ? '✓ Reported Today' : 'Pending Call'}
              </span>

              <button 
                onClick={() => onOpenCallModal(doc)}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 rounded text-xs font-semibold transition-colors"
              >
                Log Call Details
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
