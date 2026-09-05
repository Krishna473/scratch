import React, { useState, useRef } from 'react';
import { Paperclip, Camera, Check, RotateCcw, User, Eye, Download } from 'lucide-react';

export default function ProfileView({ profile, onUpdateProfile, showToast }) {
  const [formData, setFormData] = useState({ ...profile });
  const [isEditing, setIsEditing] = useState(true);
  
  // File refs
  const photoInputRef = useRef(null);
  const sigInputRef = useRef(null);
  const panInputRef = useRef(null);
  const aadhaarInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [field]: reader.result }));
        showToast(`Document uploaded for ${field}`, "success");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setFormData({ ...profile });
    showToast("Profile data reset to saved state", "info");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.emergencyContactNumber || !formData.emergencyContactName) {
      showToast("Emergency contact name and number are required!", "error");
      return;
    }
    onUpdateProfile(formData);
    showToast("Employee profile updated successfully!", "success");
  };

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-6 pb-20">
      {/* Hidden File Inputs */}
      <input 
        type="file" 
        ref={photoInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={(e) => handleFileUpload(e, 'profilePhoto')} 
      />
      <input 
        type="file" 
        ref={sigInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={(e) => handleFileUpload(e, 'signature')} 
      />
      <input 
        type="file" 
        ref={panInputRef} 
        className="hidden" 
        accept="image/*,.pdf" 
        onChange={(e) => handleFileUpload(e, 'panDoc')} 
      />
      <input 
        type="file" 
        ref={aadhaarInputRef} 
        className="hidden" 
        accept="image/*,.pdf" 
        onChange={(e) => handleFileUpload(e, 'aadhaarDoc')} 
      />

      <form onSubmit={handleSubmit} className="bg-white rounded border border-gray-200 shadow-xs p-6 md:p-8">
        
        {/* Top Centered Profile Avatar */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div 
            onClick={() => photoInputRef.current.click()}
            className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-[#6b7280] text-white flex items-center justify-center cursor-pointer relative group overflow-hidden shadow-inner border-2 border-gray-200 hover:opacity-95 transition-all"
            title="Click to change profile picture"
          >
            {formData.profilePhoto ? (
              <img src={formData.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-2">
                <User className="w-12 h-12 mx-auto text-gray-300 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] text-gray-200 font-medium block mt-1">Upload Photo</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 font-medium">Employee Profile Photo</p>
        </div>

        {/* 4-Column Grid for Employee Details - Exact Layout from Image 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 text-xs">
          
          {/* Row 1 */}
          <div>
            <label className="sfa-label">Employee Code</label>
            <input 
              type="text" 
              name="employeeCode" 
              value={formData.employeeCode} 
              onChange={handleChange}
              className="sfa-input-underline font-medium"
            />
          </div>

          <div>
            <label className="sfa-label">Employee Name</label>
            <input 
              type="text" 
              name="employeeName" 
              value={formData.employeeName} 
              onChange={handleChange}
              className="sfa-input-underline font-semibold uppercase text-[#1e3a8a]"
            />
          </div>

          <div>
            <label className="sfa-label">Designation</label>
            <input 
              type="text" 
              name="designation" 
              value={formData.designation} 
              onChange={handleChange}
              className="sfa-input-underline font-medium"
            />
          </div>

          <div>
            <label className="sfa-label">Department</label>
            <input 
              type="text" 
              name="department" 
              value={formData.department} 
              onChange={handleChange}
              className="sfa-input-underline font-medium"
            />
          </div>

          {/* Row 2 */}
          <div>
            <label className="sfa-label">Head Quarter</label>
            <input 
              type="text" 
              name="headQuarter" 
              value={formData.headQuarter} 
              onChange={handleChange}
              className="sfa-input-underline uppercase font-medium"
            />
          </div>

          <div>
            <label className="sfa-label">Torrent Email</label>
            <input 
              type="email" 
              name="torrentEmail" 
              value={formData.torrentEmail} 
              onChange={handleChange}
              className="sfa-input-underline text-blue-700 font-medium lowercase"
            />
          </div>

          <div>
            <label className="sfa-label">DOB</label>
            <input 
              type="date" 
              name="dob" 
              value={formData.dob} 
              onChange={handleChange}
              className="sfa-input-underline font-medium"
            />
          </div>

          <div>
            <label className="sfa-label">DOJ</label>
            <input 
              type="date" 
              name="doj" 
              value={formData.doj} 
              onChange={handleChange}
              className="sfa-input-underline font-medium"
            />
          </div>

          {/* Row 3 */}
          <div>
            <label className="sfa-label">Gender</label>
            <select 
              name="gender" 
              value={formData.gender} 
              onChange={handleChange}
              className="sfa-input-underline bg-white cursor-pointer"
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="sfa-label">Marital Status</label>
            <select 
              name="maritalStatus" 
              value={formData.maritalStatus} 
              onChange={handleChange}
              className="sfa-input-underline bg-white cursor-pointer"
            >
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
            </select>
          </div>

          <div>
            <label className="sfa-label">Blood Group *</label>
            <select 
              name="bloodGroup" 
              value={formData.bloodGroup} 
              onChange={handleChange}
              className="sfa-input-underline bg-white font-semibold text-red-700 cursor-pointer"
            >
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          <div>
            <label className="sfa-label">Personal Email</label>
            <input 
              type="email" 
              name="personalEmail" 
              value={formData.personalEmail} 
              onChange={handleChange}
              placeholder="e.g. personal@email.com"
              className="sfa-input-underline"
            />
          </div>

          {/* Row 4 */}
          <div>
            <label className="sfa-label">Personal Number</label>
            <input 
              type="text" 
              name="personalNumber" 
              value={formData.personalNumber} 
              onChange={handleChange}
              className="sfa-input-underline font-mono"
            />
          </div>

          <div>
            <label className="sfa-label">CUG Number</label>
            <input 
              type="text" 
              name="cugNumber" 
              value={formData.cugNumber} 
              onChange={handleChange}
              className="sfa-input-underline font-mono"
            />
          </div>

          <div>
            <label className="sfa-label">Emergency Contact Number *</label>
            <input 
              type="text" 
              name="emergencyContactNumber" 
              value={formData.emergencyContactNumber} 
              onChange={handleChange}
              className="sfa-input-underline font-mono font-medium"
              required
            />
          </div>

          <div>
            <label className="sfa-label">Emergency Contact Name *</label>
            <input 
              type="text" 
              name="emergencyContactName" 
              value={formData.emergencyContactName} 
              onChange={handleChange}
              className="sfa-input-underline font-medium"
              required
            />
          </div>

        </div>

        {/* Address Section - Boxed Table Layout matching Image 2 */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <h2 className="text-base font-bold text-gray-800 mb-3">Address</h2>
          
          <div className="border border-gray-300 rounded overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200 bg-gray-50/50">
              
              {/* Address full span in col 1 */}
              <div className="p-4 md:col-span-2">
                <span className="sfa-label">Address</span>
                <textarea 
                  name="address" 
                  rows="3"
                  value={formData.address} 
                  onChange={handleChange}
                  className="w-full text-xs text-gray-700 bg-white border border-gray-200 rounded p-2 focus:ring-1 focus:ring-blue-500 focus:outline-none uppercase font-mono"
                />
                
                <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-gray-200">
                  <div>
                    <span className="sfa-label">Mobile</span>
                    <input 
                      type="text" 
                      name="mobile" 
                      value={formData.mobile} 
                      onChange={handleChange}
                      className="sfa-input-underline font-mono font-medium"
                    />
                  </div>
                  <div>
                    <span className="sfa-label">Telephone No</span>
                    <input 
                      type="text" 
                      name="telephoneNo" 
                      value={formData.telephoneNo} 
                      onChange={handleChange}
                      className="sfa-input-underline font-mono font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Pin code and city */}
              <div className="p-4">
                <div className="mb-4">
                  <span className="sfa-label">Pin Code</span>
                  <input 
                    type="text" 
                    name="pinCode" 
                    value={formData.pinCode} 
                    onChange={handleChange}
                    className="sfa-input-underline font-mono font-medium"
                  />
                </div>
                <div>
                  <span className="sfa-label">City</span>
                  <input 
                    type="text" 
                    name="city" 
                    value={formData.city} 
                    onChange={handleChange}
                    className="sfa-input-underline uppercase font-medium"
                  />
                </div>
              </div>

              {/* Country */}
              <div className="p-4">
                <span className="sfa-label">Country</span>
                <input 
                  type="text" 
                  name="country" 
                  value={formData.country} 
                  onChange={handleChange}
                  className="sfa-input-underline font-medium"
                />
              </div>

            </div>
          </div>
        </div>

        {/* Upload Signatures & Document Section - Exact match to Image 2 & 3 */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
            {/* Select Signature */}
            <div className="flex items-center justify-between border-b border-gray-300 pb-2">
              <span className="text-xs text-gray-700">Select Signature</span>
              <div className="flex items-center gap-2">
                {formData.signature && (
                  <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                    <Check className="w-3 h-3" /> Attached
                  </span>
                )}
                <button 
                  type="button"
                  onClick={() => sigInputRef.current.click()}
                  className="p-1 hover:text-blue-600 transition-colors text-gray-400"
                  title="Attach Signature file"
                >
                  <Paperclip className="w-4 h-4 transform rotate-45" />
                </button>
              </div>
            </div>

            {/* Select Profile Photo */}
            <div className="flex items-center justify-between border-b border-gray-300 pb-2">
              <span className="text-xs text-gray-700">Select Profile Photo</span>
              <div className="flex items-center gap-2">
                {formData.profilePhoto && (
                  <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                    <Check className="w-3 h-3" /> Uploaded
                  </span>
                )}
                <button 
                  type="button"
                  onClick={() => photoInputRef.current.click()}
                  className="p-1 hover:text-blue-600 transition-colors text-gray-400"
                  title="Attach Profile Photo"
                >
                  <Paperclip className="w-4 h-4 transform rotate-45" />
                </button>
              </div>
            </div>

          </div>

          {/* PAN & Aadhaar Row - Exact Match to Image 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* PAN Card */}
            <div className="space-y-1">
              <label className="sfa-label">Pan card</label>
              <div className="flex items-center gap-3">
                <input 
                  type="text" 
                  name="panCard" 
                  value={formData.panCard} 
                  onChange={handleChange}
                  className="sfa-input-underline font-mono uppercase font-semibold"
                />
                <button 
                  type="button"
                  onClick={() => panInputRef.current.click()}
                  className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-blue-700 whitespace-nowrap bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded border border-gray-200 transition-colors"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>Select PAN Card</span>
                </button>
              </div>
            </div>

            {/* Aadhaar Card */}
            <div className="space-y-1">
              <label className="sfa-label">Aadhaar Card</label>
              <div className="flex items-center gap-3">
                <input 
                  type="text" 
                  name="aadhaarCard" 
                  value={formData.aadhaarCard} 
                  onChange={handleChange}
                  className="sfa-input-underline font-mono font-semibold"
                />
                <button 
                  type="button"
                  onClick={() => aadhaarInputRef.current.click()}
                  className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-blue-700 whitespace-nowrap bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded border border-gray-200 transition-colors"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>Select Adhar Card</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Action Buttons - Exact Match to Image 3 */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <button 
            type="submit"
            className="px-8 py-2 bg-[#4285f4] hover:bg-blue-600 text-white rounded text-xs font-semibold shadow-xs hover:shadow transition-all min-w-[120px]"
          >
            Update
          </button>
          
          <button 
            type="button"
            onClick={handleReset}
            className="px-8 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded text-xs font-semibold transition-all min-w-[120px]"
          >
            Reset
          </button>
        </div>

      </form>
    </div>
  );
}
