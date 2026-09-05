import React, { useState } from 'react';
import { 
  X, 
  Volume2, 
  Clock, 
  ChevronUp, 
  ChevronDown, 
  CheckSquare, 
  Square, 
  UserCheck, 
  Pill, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { teamMembers, productsCatalog } from '../data/mockData';

export default function DoctorCallModal({ doctor, onClose, onSaveCall, showToast }) {
  const [callDetailsOpen, setCallDetailsOpen] = useState(true);
  const [showDoctorProfile, setShowDoctorProfile] = useState(false);
  
  // Call form state initialized from doctor if already reported
  const existingCall = doctor.callDetails || {};
  const [hour, setHour] = useState(existingCall.hour || "11");
  const [minute, setMinute] = useState(existingCall.minute || "45");
  const [workedWithTeam, setWorkedWithTeam] = useState(existingCall.workedWithTeam || false);
  const [workWith, setWorkWith] = useState(existingCall.workWith || "");
  const [discussion, setDiscussion] = useState(existingCall.discussion || "");
  const [selectedProducts, setSelectedProducts] = useState(
    doctor.brands ? doctor.brands.split(',').map(b => b.trim()) : ["Chymoral Forte", "Shelcal 500"]
  );
  const [sampleGiven, setSampleGiven] = useState("2 Packs");
  const [submitted, setSubmitted] = useState(false);

  const isWorkWithInvalid = workedWithTeam && !workWith;

  const handleSave = () => {
    setSubmitted(true);
    if (isWorkWithInvalid) {
      showToast("Please select whom you worked with!", "error");
      return;
    }

    const updatedCall = {
      hour: hour.padStart(2, '0'),
      minute: minute.padStart(2, '0'),
      workedWithTeam,
      workWith: workedWithTeam ? workWith : "",
      discussion,
      detailedBrands: selectedProducts,
      sampleGiven,
      timestamp: new Date().toLocaleTimeString()
    };

    onSaveCall(doctor.id, updatedCall);
    showToast(`Call details recorded for Dr. ${doctor.name}!`, "success");
    onClose();
  };

  const handleVoicePlay = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`Doctor ${doctor.name}`);
      window.speechSynthesis.speak(utterance);
    } else {
      showToast(`Pronunciation: Dr. ${doctor.name}`, "info");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-gray-300">
        
        {/* Modal Header - Exact replica of Image 5 */}
        <div className="p-4 sm:p-6 border-b border-gray-200 relative bg-white">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-base font-bold text-gray-900 mb-2">Doctor Details</h2>

          <div className="flex flex-wrap items-center justify-between gap-2 mt-1">
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-bold text-blue-900 tracking-wide">
                {doctor.name}
              </span>
              <button 
                onClick={handleVoicePlay} 
                title="Listen to Doctor's Name"
                className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition-colors"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[11px] font-bold rounded">
                {doctor.specialty}
              </span>
              <button 
                onClick={() => setShowDoctorProfile(!showDoctorProfile)}
                className="px-3 py-1 border border-gray-300 rounded text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Profile
              </button>
            </div>
          </div>

          <div className="text-xs text-gray-500 mt-1">
            <span>Advait No.: </span>
            <span className="font-semibold text-gray-700 font-mono">{doctor.advaitNo}</span>
          </div>

          {/* Collapsible Doctor Quick Profile */}
          {showDoctorProfile && (
            <div className="mt-3 p-3 bg-blue-50/70 border border-blue-200 rounded text-xs text-gray-700 space-y-1 animate-in fade-in">
              <p><span className="font-semibold">Hospital/Clinic:</span> {doctor.hospital}</p>
              <p><span className="font-semibold">Qualification:</span> {doctor.qualification}</p>
              <p><span className="font-semibold">Category:</span> Indication {doctor.indication} | Class {doctor.category}</p>
              <p><span className="font-semibold">Last Visit:</span> {doctor.lastVisitDate}</p>
            </div>
          )}
        </div>

        {/* Modal Body: Call Details Accordion - Exact match to Image 5 */}
        <div className="p-4 sm:p-6 space-y-5 bg-[#fafbfc]">
          
          <div className="bg-white border border-gray-200 rounded-md shadow-xs overflow-hidden">
            {/* Accordion Toggle Header */}
            <div 
              onClick={() => setCallDetailsOpen(!callDetailsOpen)}
              className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between cursor-pointer select-none hover:bg-gray-100/80 transition-colors"
            >
              <span className="text-xs font-bold text-gray-800">Call Details</span>
              {callDetailsOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
            </div>

            {callDetailsOpen && (
              <div className="p-5 space-y-5">
                
                {/* Hour and Minute inputs with clock */}
                <div className="flex items-center gap-4">
                  <div className="w-24">
                    <label className="sfa-label">Hour *</label>
                    <input 
                      type="number" 
                      min="0" 
                      max="23"
                      value={hour}
                      onChange={(e) => setHour(e.target.value)}
                      placeholder="00-23"
                      className="sfa-input-underline font-mono text-center font-bold"
                    />
                    <span className="text-[10px] text-gray-400 block text-center mt-0.5">00-23</span>
                  </div>

                  <span className="text-lg font-bold text-gray-400 mt-2">:</span>

                  <div className="w-24">
                    <label className="sfa-label">Minute *</label>
                    <input 
                      type="number" 
                      min="0" 
                      max="59"
                      value={minute}
                      onChange={(e) => setMinute(e.target.value)}
                      placeholder="00-59"
                      className="sfa-input-underline font-mono text-center font-bold"
                    />
                    <span className="text-[10px] text-gray-400 block text-center mt-0.5">00-59</span>
                  </div>

                  <div className="flex items-center pt-2">
                    <Clock className="w-5 h-5 text-gray-500 ml-2" />
                  </div>
                </div>

                {/* Worked with Team checkbox */}
                <div className="pt-2">
                  <label 
                    onClick={() => setWorkedWithTeam(!workedWithTeam)}
                    className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-gray-800"
                  >
                    <input 
                      type="checkbox" 
                      checked={workedWithTeam} 
                      onChange={(e) => setWorkedWithTeam(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Worked with Team</span>
                  </label>
                </div>

                {/* Work With dropdown (conditionally rendered or styled with red validation like Image 5) */}
                {workedWithTeam && (
                  <div className="pt-1">
                    <label className="sfa-label text-red-600">Work With *</label>
                    <select 
                      value={workWith} 
                      onChange={(e) => setWorkWith(e.target.value)}
                      className={`sfa-input-underline bg-white cursor-pointer ${
                        isWorkWithInvalid ? 'border-red-500' : ''
                      }`}
                    >
                      <option value="">-- Select Joint Worker --</option>
                      {teamMembers.map((tm) => (
                        <option key={tm} value={tm}>{tm}</option>
                      ))}
                    </select>
                    {isWorkWithInvalid && (
                      <span className="text-[11px] text-red-600 mt-1 block font-medium">
                        Value is required
                      </span>
                    )}
                  </div>
                )}

                {/* Discussion */}
                <div className="pt-2">
                  <label className="sfa-label">Discussion</label>
                  <textarea 
                    rows="3"
                    value={discussion}
                    onChange={(e) => setDiscussion(e.target.value)}
                    placeholder="Enter key discussion points, doctor commitment, feedback on scientific literature..."
                    className="w-full text-xs p-2.5 bg-white border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Brands Promoted / Detailing */}
                <div className="pt-2 border-t border-gray-100">
                  <label className="sfa-label">Brands Promoted (e-Detailing)</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {productsCatalog.slice(0, 6).map((product) => {
                      const isSelected = selectedProducts.includes(product.name);
                      return (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setSelectedProducts(selectedProducts.filter(p => p !== product.name));
                            } else {
                              setSelectedProducts([...selectedProducts, product.name]);
                            }
                          }}
                          className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                            isSelected 
                              ? 'bg-blue-600 text-white shadow-xs' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {isSelected && "✓ "} {product.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Samples Handed */}
                <div>
                  <label className="sfa-label">Samples / Inputs Given</label>
                  <input 
                    type="text" 
                    value={sampleGiven} 
                    onChange={(e) => setSampleGiven(e.target.value)}
                    placeholder="e.g. 2 strips Nebicard 5mg, 1 LBL brochure"
                    className="sfa-input-underline text-xs"
                  />
                </div>

              </div>
            )}
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
          <button 
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 rounded text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          
          <button 
            type="button"
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold shadow-xs transition-colors"
          >
            Save Call Details
          </button>
        </div>

      </div>
    </div>
  );
}
