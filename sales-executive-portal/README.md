# Torrent Pharma - Sales Force Automation (SFA) Portal

An enterprise-grade **Sales Executive (Medical Representative) Portal** built with **React JS**, **Tailwind CSS**, and **Lucide Icons**, replicated directly from Torrent Pharmaceuticals SFA enterprise workflows.

---

## 🚀 How to Run in VS Code

### Step 1: Open the Project in VS Code
1. Launch **Visual Studio Code**.
2. Click **File** > **Open Folder...** (or press `Ctrl + K, Ctrl + O`).
3. Select this directory:
   ```text
   C:\Users\ganes\.gemini\antigravity\scratch\sales-executive-portal
   ```
   *(Or from PowerShell / Command Prompt: `code C:\Users\ganes\.gemini\antigravity\scratch\sales-executive-portal`)*

### Step 2: Open VS Code Integrated Terminal
- Press `` Ctrl + ` `` (Backtick) or go to **Terminal** > **New Terminal**.

### Step 3: Run the Development Server
Dependencies are already pre-installed, so you can immediately start the server:
```bash
npm run dev
```

### Step 4: Open in Browser
- Click on the local URL shown in the terminal:
  👉 **http://localhost:3000**

---

## 📱 Features Included (From Sample Screenshots)

### 1. SFA Header & Global Navigation (Images 1–5)
- **Torrent Pharma | SFA** branding.
- Full hierarchy menus:
  - **Master** (Doctor Master, Chemist Master, Stockist, Products)
  - **Daily Activities** (New Daily Reporting / DCR, Tour Plan, Leave, Expenses)
  - **Sales** (Order Booking / POB, Secondary Sales, Target vs Achievement)
  - **Marketing** (Campaigns, Samples & Detailing)
  - **HR** (My Profile, Attendance, Holidays)
  - **Sales Admin**, **Call Solution**, **Reports**, **Training**
- Sync/Refresh action with animation and feedback toast.
- Notification drawer with 6 active field notifications.
- Medical Representative user avatar dropdown.

### 2. Medical Representative Profile (Images 1, 2, 3)
- **Top Profile Photo Avatar**: Preview with live file upload replacement.
- **4-Column Form Grid**:
  - Employee Code (`148371`), Employee Name (`MONISHA BAI S`), Designation (`MR`), Department (`Delta`)
  - Head Quarter (`BANGALORE`), Torrent Email (`MONISHABAIS@torrentian.com`), DOB (`23/07/2001`), DOJ (`25/03/2025`)
  - Gender (`Female`), Marital Status (`Single`), Blood Group (`O+`), Personal Email
  - Personal Number (`7406912014`), CUG Number (`7406912014`), Emergency Contact Number (`9845123980`), Emergency Contact Name (`Shivanna B`)
- **Address Details Grid**:
  - Full address, Pin Code (`560068`), City (`BANGALORE`), Country (`India`), Mobile, Telephone No.
- **Document Attachments**:
  - Select Signature (file attachment)
  - Select Profile Photo (file attachment)
  - PAN Card number (`PTQPSD0711E`) + attachment
  - Aadhaar Card number + attachment
- **Update** & **Reset** buttons with instant feedback.

### 3. New Daily Reporting / DCR (Image 4)
- **Top Bar**:
  - Reporting Type (`Field`, `Non-Field`, `Meeting`, `Holiday`)
  - Report Date picker (`01/09/2026`)
  - Color Legend: `● Work` (Green), `● Leave` (Red), `● Holiday` (Blue)
  - `[ Proceed ]` and `[ View Reported Calls ]`
- **Visit Tabs**:
  - `[ Planned Visit ]`
  - `[ Unplanned Visit ]` (highlighted active tab)
- **Doctor Search & Territory Selector**:
  - Search Doctor input, Select Doctor dropdown, `[ + Add ]`, `[ Remove Visit Details ]`
- **Indications & Ratings**:
  - `Excel` (4 dots), `VIP` (3 dots), `A` (2 dots), `B` (1 dot)
  - Reporting Status: `(●) Reported` `( ) Not Reported`
- **Doctor Table**:
  - Checkbox, Advait No (`20690`, `228442`, `20588`, `278934`, `274973`, `210267`), Doctor Name (with audio pronunciation button), Brands, Campaign Name, `Pre Call`, `Post Call` / `Call Details` buttons.
- **Final Submit Button**:
  - Prominent red `[ Final Submit ]` button with confirmation summary dialog and celebration confetti!

### 4. Doctor Call Details Modal (Image 5)
- Doctor Header: Dr. Name (e.g. `LACHIKARATHMAN DEWEGOWDA`), `CARD` specialty badge, `Advait No.: 228442`, `[ Profile ]` button.
- Call Details Accordion:
  - Time inputs: `Hour *` (00–23) and `Minute *` (00–59) with clock icon.
  - `Worked with Team` checkbox toggle.
  - `Work With *` dropdown (ASM, RSM, Colleague) with validation message `Value is required`.
  - Discussion notes.
  - Interactive brands promoted selector (Nebicard, Chymoral Forte, Shelcal 500, Nexpro 40, etc.).
  - Samples handed over.

### 5. Bonus Sales Executive Modules
- **Executive KPI Dashboard**: Call coverage %, Call average (MTD), POB value, monthly secondary target tracker.
- **Chemist Order Booking (POB)**: Select chemist, add products, auto-calculate PTR, GST, and totals.
- **Doctor Master Directory**: Full territory list with specialty and category filtering.

---

## 🔮 Later Backend Integration Guide
The app is built with standard state handlers in `src/App.jsx`. When ready to connect a backend (Node.js/Express, Python/FastAPI, Spring Boot, or Firebase/Supabase):
1. Replace `mockData.js` imports with API calls:
   ```javascript
   // Example in App.jsx:
   useEffect(() => {
     fetch('/api/doctors').then(res => res.json()).then(data => setDoctors(data));
   }, []);
   ```
2. In `handleSaveDoctorCall`, send a `POST /api/calls` or `PATCH /api/doctors/:id`.
3. In `handleFinalSubmitDCR`, send a `POST /api/dcr/submit`.
