export const initialProfileData = {
  employeeCode: "148371",
  employeeName: "MONISHA BAI S",
  designation: "MR",
  department: "Delta",
  headQuarter: "BANGALORE",
  torrentEmail: "MONISHABAIS@torrentian.com",
  dob: "2001-07-23",
  doj: "2025-03-25",
  gender: "Female",
  maritalStatus: "Single",
  bloodGroup: "O+",
  personalEmail: "monisha.bai.s@gmail.com",
  personalNumber: "7406912014",
  cugNumber: "7406912014",
  emergencyContactNumber: "9845123980",
  emergencyContactName: "Shivanna B",
  // Address section
  address: "#14/1, 12TH CROSS, NGR LAYOUT, ROOPENA AGRAHARA, NR K K BAKERY, BOMMANAHALLI, 560068 - BANGALORE",
  pinCode: "560068",
  city: "BANGALORE",
  country: "India",
  mobile: "8884993318",
  telephoneNo: "7406912014",
  // Identity & docs
  panCard: "PTQPSD0711E",
  aadhaarCard: "5432 9876 1234",
  profilePhoto: null,
  signature: null,
  panDoc: null,
  aadhaarDoc: null
};

export const initialDoctors = [
  {
    id: 1,
    advaitNo: "20690",
    name: "KAPIL RANGAN",
    specialty: "CARD",
    qualification: "MBBS, MD (Cardio)",
    hospital: "Apollo Clinic, Bommanahalli",
    indication: "VIP",
    category: "A",
    brands: "Nebicard, Losar, Nikoran",
    campaign: "HeartBeat 2026",
    status: "Reported",
    planned: true,
    lastVisitDate: "2026-08-25",
    callDetails: {
      hour: "10",
      minute: "30",
      workedWithTeam: true,
      workWith: "ASM - Rajesh Kumar",
      discussion: "Detailed Nebicard 5mg efficacy in hypertensive patients with tachycardia. Doctor agreed to initiate 5 trial patients."
    }
  },
  {
    id: 2,
    advaitNo: "228442",
    name: "LACHIKARATHMAN DEWEGOWDA",
    specialty: "CARD",
    qualification: "MBBS, DM (Cardiology)",
    hospital: "Sri Jayadeva Institute / Private Clinic",
    indication: "Excel",
    category: "A",
    brands: "Chymoral, Shelcal, Nexpro",
    campaign: "GastroCare Q3",
    status: "Reported",
    planned: true,
    lastVisitDate: "2026-08-18",
    callDetails: {
      hour: "11",
      minute: "45",
      workedWithTeam: false,
      workWith: "",
      discussion: "Discussed Nexpro-RD safety profile. Given sample strips of Shelcal 500."
    }
  },
  {
    id: 3,
    advaitNo: "20588",
    name: "MANOHAR J SURANAGI",
    specialty: "NEURO",
    qualification: "MBBS, MD, DM (Neuro)",
    hospital: "Fortis Hospital, Bannerghatta",
    indication: "VIP",
    category: "A",
    brands: "Veloz, Unienzyme",
    campaign: "NeuroShield 2026",
    status: "Reported",
    planned: true,
    lastVisitDate: "2026-08-29",
    callDetails: {
      hour: "12",
      minute: "15",
      workedWithTeam: true,
      workWith: "RSM - Venkatraman Iyer",
      discussion: "Joint working with RSM. Presented comparative data against omeprazole."
    }
  },
  {
    id: 4,
    advaitNo: "278934",
    name: "MANJULA H S",
    specialty: "GYN",
    qualification: "MBBS, DGO, MS (OBG)",
    hospital: "Manjula Maternity Nursing Home",
    indication: "VIP",
    category: "B",
    brands: "Shelcal-HD, Folvite, Altraday",
    campaign: "Maternal Health Drive",
    status: "Reported",
    planned: false,
    lastVisitDate: "2026-08-12",
    callDetails: {
      hour: "14",
      minute: "20",
      workedWithTeam: false,
      workWith: "",
      discussion: "Focused on Folvite adherence during first trimester."
    }
  },
  {
    id: 5,
    advaitNo: "274973",
    name: "MURALI KRISHNA N",
    specialty: "DIAB",
    qualification: "MBBS, MD (Internal Med)",
    hospital: "Diabetes Care Center, Silk Board",
    indication: "Excel",
    category: "A",
    brands: "Azulix 2 MF, Jalra M",
    campaign: "GlucoControl Summit",
    status: "Not Reported",
    planned: false,
    lastVisitDate: "2026-08-15",
    callDetails: null
  },
  {
    id: 6,
    advaitNo: "210267",
    name: "SHIVA KUMAR D ORESWAMY",
    specialty: "ORTHO",
    qualification: "MBBS, MS (Ortho)",
    hospital: "Bone & Joint Clinic, HSR Layout",
    indication: "A",
    category: "B",
    brands: "Chymoral Forte, Osteo-Plus",
    campaign: "Mobility First",
    status: "Not Reported",
    planned: true,
    lastVisitDate: "2026-08-22",
    callDetails: null
  },
  {
    id: 7,
    advaitNo: "312450",
    name: "ANANYA RAO",
    specialty: "PED",
    qualification: "MBBS, DCH",
    hospital: "Rainbow Children Hospital",
    indication: "VIP",
    category: "A",
    brands: "Unienzyme Drops, Shelcal Syrup",
    campaign: "Junior WellCare",
    status: "Not Reported",
    planned: false,
    lastVisitDate: "2026-08-05",
    callDetails: null
  },
  {
    id: 8,
    advaitNo: "218902",
    name: "PRADEEP HEGDE",
    specialty: "ENT",
    qualification: "MBBS, MS (ENT)",
    hospital: "Bangalore ENT Care",
    indication: "B",
    category: "B",
    brands: "Veloz 20, Moxikind-CV",
    campaign: "RespiraClean",
    status: "Not Reported",
    planned: false,
    lastVisitDate: "2026-08-10",
    callDetails: null
  }
];

export const teamMembers = [
  "ASM - Rajesh Kumar (Area Sales Manager)",
  "RSM - Venkatraman Iyer (Regional Sales Manager)",
  "PM - Dr. Amit Sen (Product Manager)",
  "ZSM - Arvind Shastry (Zonal Sales Manager)",
  "Colleague - Suresh Babu (MR - Delta 2)"
];

export const productsCatalog = [
  { id: "P01", name: "Nebicard 5mg", pack: "10x10 Tablets", division: "Cardiology", mrp: 185.00, ptr: 132.14 },
  { id: "P02", name: "Chymoral Forte", pack: "20x10 Tablets", division: "General", mrp: 460.00, ptr: 328.57 },
  { id: "P03", name: "Shelcal 500", pack: "15 Tablets", division: "Nutra", mrp: 142.00, ptr: 101.42 },
  { id: "P04", name: "Nexpro 40", pack: "10 Tablets", division: "Gastro", mrp: 165.00, ptr: 117.85 },
  { id: "P05", name: "Azulix 2 MF", pack: "10 Tablets", division: "Diabete", mrp: 210.00, ptr: 150.00 },
  { id: "P06", name: "Veloz 20", pack: "15 Tablets", division: "Gastro", mrp: 198.00, ptr: 141.42 },
  { id: "P07", name: "Folvite 5mg", pack: "45 Tablets", division: "Women Care", mrp: 95.00, ptr: 67.85 },
  { id: "P08", name: "Losar 50", pack: "15 Tablets", division: "Cardio", mrp: 220.00, ptr: 157.14 }
];

export const chemists = [
  { id: "CH01", name: "Apollo Pharmacy - Bommanahalli", contactPerson: "Ramesh G", phone: "9880123456", outstanding: 12400 },
  { id: "CH02", name: "MedPlus Pharmacy - NGR Layout", contactPerson: "Srinivas K", phone: "9880654321", outstanding: 8900 },
  { id: "CH03", name: "Trust Chemist - Roopena Agrahara", contactPerson: "Basavaraj", phone: "9845012345", outstanding: 0 },
  { id: "CH04", name: "Sri Manjunatha Medicals - HSR Sec 2", contactPerson: "Venkatesh", phone: "9900112233", outstanding: 24500 }
];

export const sampleOrders = [
  {
    id: "ORD-9801",
    chemist: "Apollo Pharmacy - Bommanahalli",
    date: "2026-09-01",
    itemsCount: 4,
    totalAmount: 18450,
    status: "Delivered",
    stockist: "Shree Ganesh Pharma Distributors"
  },
  {
    id: "ORD-9802",
    chemist: "MedPlus Pharmacy - NGR Layout",
    date: "2026-09-02",
    itemsCount: 2,
    totalAmount: 9200,
    status: "In Transit",
    stockist: "Karnataka Pharma Link"
  },
  {
    id: "ORD-9803",
    chemist: "Trust Chemist - Roopena Agrahara",
    date: "2026-09-04",
    itemsCount: 3,
    totalAmount: 14100,
    status: "Pending Dispatch",
    stockist: "Shree Ganesh Pharma Distributors"
  }
];
