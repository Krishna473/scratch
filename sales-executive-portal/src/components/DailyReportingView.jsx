import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Calendar, 
  Search, 
  Plus, 
  Trash2, 
  Volume2, 
  CheckCircle2, 
  FileCheck, 
  Clock, 
  UserCheck, 
  RotateCcw,
  Check,
  Send,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DailyReportingView({ 
  doctors, 
  onAddDoctor, 
  onRemoveDoctor, 
  onOpenCallModal, 
  onFinalSubmitDCR,
  showToast 
}) {
  const [reportingType, setReportingType] = useState("Field");
  const [reportDate, setReportDate] = useState("2026-09-01");
  const [activeTab, setActiveTab] = useState("unplanned"); // 'planned' or 'unplanned' matching Image 4
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all"); // 'all', 'Reported', 'Not Reported'
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [isDCRSubmitted, setIsDCRSubmitted] = useState(false);

  // Available doctors to add to the table
  const unassignedDoctors = doctors.filter(d => !d.planned && d.status === 'Not Reported');

  // Filter doctors based on active tab and search
  const visibleDoctors = doctors.filter(doc => {
    // Tab match
    const tabMatch = activeTab === 'planned' ? doc.planned : true; // In unplanned, reps can add or see ad-hoc visits
    // Search match
    const searchMatch = !searchTerm || 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doc.advaitNo.includes(searchTerm) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const statusMatch = statusFilter === 'all' ? true : doc.status === statusFilter;

    return tabMatch && searchMatch && statusMatch;
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRowIds(visibleDoctors.map(d => d.id));
    } else {
      setSelectedRowIds([]);
    }
  };

  const handleToggleSelectRow = (id) => {
    if (selectedRowIds.includes(id)) {
      setSelectedRowIds(selectedRowIds.filter(rowId => rowId !== id));
    } else {
      setSelectedRowIds([...selectedRowIds, id]);
    }
  };

  const handleAddDoctorVisit = () => {
    if (!selectedDoctorId) {
      showToast("Please choose a doctor to add to today's call list!", "error");
      return;
    }
    const docToAdd = doctors.find(d => d.id === parseInt(selectedDoctorId));
    if (docToAdd) {
      onAddDoctor(docToAdd.id);
      setSelectedDoctorId("");
      showToast(`Dr. ${docToAdd.name} added to ${activeTab === 'planned' ? 'Planned' : 'Unplanned'} list!`, "success");
    }
  };

  const handleRemoveSelected = () => {
    if (selectedRowIds.length === 0) {
      showToast("Please select at least one doctor record to remove!", "error");
      return;
    }
    selectedRowIds.forEach(id => onRemoveDoctor(id));
    setSelectedRowIds([]);
    showToast("Selected visit details removed from today's list", "info");
  };

  const handleFinalSubmit = () => {
    setShowSummaryModal(true);
  };

  const confirmFinalSubmit = () => {
    setIsDCRSubmitted(true);
    setShowSummaryModal(false);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
    onFinalSubmitDCR();
    showToast("Daily Call Report (DCR) for " + reportDate + " submitted successfully to ASM & HQ!", "success");
  };

  const playName = (name) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(name);
      window.speechSynthesis.speak(u);
    }
  };

  const reportedCount = doctors.filter(d => d.status === 'Reported').length;
  const totalCount = doctors.length;

  return (
    <div className="max-w-[1700px] mx-auto p-3 sm:p-5 md:p-6 pb-24">
      
      {/* Breadcrumb Header - Exact match to Image 4 */}
      <div className="flex items-center gap-2 mb-4">
        <button 
          onClick={() => window.history.back()} 
          className="flex items-center text-gray-700 hover:text-blue-800 transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          <h1 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
            New Daily Reporting
          </h1>
        </button>
      </div>

      {/* Top Controls Card: Reporting Type, Date, Legend, Action buttons */}
      <div className="bg-white rounded border border-gray-200 shadow-xs p-4 sm:p-5 mb-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Left Inputs */}
          <div className="flex flex-wrap items-center gap-6 text-xs">
            
            {/* Reporting Type */}
            <div className="min-w-[180px]">
              <label className="sfa-label font-medium">Reporting Type *</label>
              <select 
                value={reportingType} 
                onChange={(e) => setReportingType(e.target.value)}
                className="sfa-input-underline font-semibold bg-white cursor-pointer"
              >
                <option value="Field">Field</option>
                <option value="Non-Field">Non-Field (Admin/HQ)</option>
                <option value="Meeting">Cycle Meeting</option>
                <option value="Conference">CME / Medical Conference</option>
                <option value="Leave">Leave</option>
              </select>
            </div>

            {/* Report Date */}
            <div className="min-w-[160px]">
              <label className="sfa-label font-medium">Report Date *</label>
              <div className="flex items-center gap-2">
                <input 
                  type="date" 
                  value={reportDate} 
                  onChange={(e) => setReportDate(e.target.value)}
                  className="sfa-input-underline font-mono font-medium"
                />
                <Calendar className="w-4 h-4 text-gray-500" />
              </div>
            </div>

            {/* Status Legend (Work, Leave, Holiday) matching Image 4 */}
            <div className="flex items-center gap-4 pt-4 text-xs select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                <span className="text-gray-700 font-medium">Work</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
                <span className="text-gray-700 font-medium">Leave</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
                <span className="text-gray-700 font-medium">Holiday</span>
              </div>
            </div>

          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => showToast(`Date confirmed: ${reportDate} (${reportingType})`, "info")}
              className="px-5 py-2 bg-[#205493] hover:bg-[#113f7c] text-white rounded text-xs font-semibold shadow-xs transition-colors"
            >
              Proceed
            </button>
            <button 
              onClick={() => setStatusFilter(statusFilter === 'Reported' ? 'all' : 'Reported')}
              className={`px-4 py-2 border rounded text-xs font-semibold transition-colors ${
                statusFilter === 'Reported' 
                  ? 'bg-blue-50 border-blue-500 text-blue-700' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {statusFilter === 'Reported' ? 'Show All Calls' : 'View Reported Calls'} ({reportedCount})
            </button>
          </div>

        </div>
      </div>

      {/* Main Reporting Workspace */}
      <div className="bg-white rounded border border-gray-200 shadow-xs overflow-hidden">
        
        {/* Tabs Header: Planned Visit vs Unplanned Visit - Exact Match to Image 4 */}
        <div className="border-b border-gray-200 flex">
          <button
            onClick={() => setActiveTab("planned")}
            className={`px-8 py-3.5 text-xs font-bold transition-all relative ${
              activeTab === 'planned'
                ? 'text-blue-700 border-b-2 border-blue-700 bg-blue-50/20'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Planned Visit
          </button>
          
          <button
            onClick={() => setActiveTab("unplanned")}
            className={`px-8 py-3.5 text-xs font-bold transition-all relative ${
              activeTab === 'unplanned'
                ? 'text-blue-700 border-b-2 border-blue-700 bg-blue-50/20'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Unplanned Visit
          </button>
        </div>

        {/* Doctor Search & Selection Controls - Exact match to Image 4 */}
        <div className="p-4 sm:p-5 border-b border-gray-200 bg-[#fafbfc]">
          <div className="flex flex-wrap items-center gap-4">
            
            {/* Search Doctor */}
            <div className="min-w-[200px] flex-1">
              <label className="sfa-label">Search Doctor</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Type name, Advait No., or specialty..."
                  className="sfa-input-underline pr-6"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute right-1 bottom-1.5" />
              </div>
            </div>

            {/* Select Doctor Dropdown */}
            <div className="min-w-[240px] flex-1">
              <label className="sfa-label">Select Doctor</label>
              <select 
                value={selectedDoctorId} 
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                className="sfa-input-underline bg-white cursor-pointer"
              >
                <option value="">-- Choose Doctor from Territory --</option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.advaitNo} - Dr. {d.name} ({d.specialty})
                  </option>
                ))}
              </select>
            </div>

            {/* Add & Remove buttons */}
            <div className="flex items-center gap-2 pt-3">
              <button 
                onClick={handleAddDoctorVisit}
                className="px-4 py-1.5 bg-[#0071bc] hover:bg-blue-700 text-white rounded text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
              
              <button 
                onClick={handleRemoveSelected}
                className="px-4 py-1.5 bg-[#112e51] hover:bg-slate-900 text-white rounded text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Visit Details</span>
              </button>
            </div>

          </div>

          {/* Indication Ratings & Reporting Status Radio - Exact Match to Image 4 */}
          <div className="mt-5 pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs">
            
            {/* Indication ratings */}
            <div className="flex items-center gap-6">
              <span className="font-bold text-gray-700">Indication :</span>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-medium">Excel</span>
                <span className="flex flex-col gap-0.5" title="4 Rating Dots">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-medium">VIP</span>
                <span className="flex flex-col gap-0.5" title="3 Rating Dots">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-medium">A</span>
                <span className="flex flex-col gap-0.5" title="2 Rating Dots">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-medium">B</span>
                <span className="flex flex-col gap-0.5" title="1 Rating Dot">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                </span>
              </div>
            </div>

            {/* Reporting Status Radio */}
            <div className="flex items-center gap-4">
              <span className="font-bold text-gray-700">Reporting Status:</span>
              
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input 
                  type="radio" 
                  name="reportingStatusRadio"
                  checked={statusFilter === 'Reported'} 
                  onChange={() => setStatusFilter('Reported')}
                  className="text-blue-600 focus:ring-blue-500" 
                />
                <span className="text-gray-700 font-medium">Reported</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input 
                  type="radio" 
                  name="reportingStatusRadio"
                  checked={statusFilter === 'Not Reported'} 
                  onChange={() => setStatusFilter('Not Reported')}
                  className="text-blue-600 focus:ring-blue-500" 
                />
                <span className="text-gray-700 font-medium">Not Reported</span>
              </label>

              {statusFilter !== 'all' && (
                <button 
                  onClick={() => setStatusFilter('all')}
                  className="text-[11px] text-blue-600 underline hover:text-blue-800"
                >
                  Clear filter
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Doctor Visit Table - Exact Match to Image 4 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/70 text-gray-600 font-semibold">
                <th className="p-3 w-10 text-center">
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll}
                    checked={visibleDoctors.length > 0 && selectedRowIds.length === visibleDoctors.length}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="p-3 w-28">Advait No</th>
                <th className="p-3">Doctor Name</th>
                <th className="p-3">Brands</th>
                <th className="p-3">Campaign Name</th>
                <th className="p-3 text-center w-28">Status</th>
                <th className="p-3 text-right pr-6 w-48">Option</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {visibleDoctors.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    No doctor visits found matching the selected filter.
                  </td>
                </tr>
              ) : (
                visibleDoctors.map((doc) => {
                  const isChecked = selectedRowIds.includes(doc.id);
                  const isReported = doc.status === 'Reported';

                  return (
                    <tr 
                      key={doc.id} 
                      className={`hover:bg-blue-50/30 transition-colors ${isChecked ? 'bg-blue-50/50' : ''}`}
                    >
                      {/* Checkbox */}
                      <td className="p-3 text-center">
                        <input 
                          type="checkbox" 
                          checked={isChecked}
                          onChange={() => handleToggleSelectRow(doc.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>

                      {/* Advait No */}
                      <td className="p-3 font-mono font-semibold text-gray-700">
                        {doc.advaitNo}
                      </td>

                      {/* Doctor Name with speaker icon */}
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span 
                            onClick={() => onOpenCallModal(doc)}
                            className="font-bold text-gray-900 hover:text-blue-700 cursor-pointer uppercase"
                          >
                            {doc.name}
                          </span>
                          <button 
                            onClick={() => playName(`Doctor ${doc.name}`)}
                            title="Hear pronunciation"
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-semibold ml-1">
                            {doc.specialty}
                          </span>
                        </div>
                      </td>

                      {/* Brands */}
                      <td className="p-3 text-gray-600">
                        {doc.brands || "—"}
                      </td>

                      {/* Campaign Name */}
                      <td className="p-3 text-gray-600">
                        {doc.campaign || "—"}
                      </td>

                      {/* Status */}
                      <td className="p-3 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10.5px] font-bold ${
                          isReported 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {doc.status}
                        </span>
                      </td>

                      {/* Options (Pre Call, Post Call, Call Details) */}
                      <td className="p-3 text-right pr-6">
                        <div className="flex items-center justify-end gap-1.5">
                          <button 
                            onClick={() => showToast(`Pre-Call Planning for Dr. ${doc.name}: Review prescription history and detailing slides`, "info")}
                            className="px-2 py-1 bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 rounded text-[11px] font-medium transition-colors"
                          >
                            Pre Call
                          </button>

                          <button 
                            onClick={() => onOpenCallModal(doc)}
                            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                              isReported 
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                          >
                            {isReported ? 'Edit Call' : 'Post Call'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Bar: Table summary and Red Final Submit Button - Exact Match to Image 4 */}
        <div className="p-4 sm:p-5 border-t border-gray-200 bg-white flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-gray-600">
            Total Visits in List: <span className="font-bold text-gray-900">{doctors.length}</span> | 
            Reported: <span className="font-bold text-emerald-600">{reportedCount}</span> | 
            Pending: <span className="font-bold text-amber-600">{doctors.length - reportedCount}</span>
          </div>

          <button 
            type="button"
            onClick={handleFinalSubmit}
            className="px-8 py-2.5 bg-[#e53935] hover:bg-[#d32f2f] text-white rounded text-xs font-bold shadow-md hover:shadow-lg transition-all tracking-wide flex items-center gap-2 uppercase"
          >
            <Send className="w-4 h-4" />
            <span>Final Submit</span>
          </button>
        </div>

      </div>

      {/* Final Submit Confirmation Modal */}
      {showSummaryModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 border border-gray-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-base font-bold text-gray-900">Confirm DCR Submission</h3>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              You are about to submit your <strong>Daily Call Report</strong> for <strong>{reportDate}</strong>. Once submitted, records will be locked and forwarded to your Area Sales Manager (ASM) for approval.
            </p>

            <div className="bg-gray-50 rounded p-3 mb-5 text-xs space-y-1.5 border border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600">Reporting Type:</span>
                <span className="font-bold text-gray-800">{reportingType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Doctor Calls Reported:</span>
                <span className="font-bold text-emerald-600">{reportedCount} / {doctors.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Territory:</span>
                <span className="font-bold text-gray-800">Bangalore Delta (HQ)</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button 
                onClick={() => setShowSummaryModal(false)}
                className="px-4 py-2 border border-gray-300 rounded text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Go Back & Review
              </button>
              <button 
                onClick={confirmFinalSubmit}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold shadow-xs flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Confirm & Submit</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
