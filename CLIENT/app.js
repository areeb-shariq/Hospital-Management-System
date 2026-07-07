const API_BASE = '';

const SCHEMAS = {
  patients: {
    title: 'Patients',
    subtitle: 'Manage patient records',
    pk: 'patient_id',
    columns: ['patient_id','first_name','last_name','date_of_birth','gender','phone','blood_group','address'],
    labels:  ['ID','First Name','Last Name','DOB','Gender','Phone','Blood Group','Address'],
    fields: [
      { name:'first_name',        label:'First Name',             type:'text',   required:true },
      { name:'last_name',         label:'Last Name',              type:'text',   required:true },
      { name:'date_of_birth',     label:'Date of Birth',          type:'date',   required:true },
      { name:'gender',            label:'Gender',                 type:'select', options:['Male','Female','Other'], required:true },
      { name:'phone',             label:'Phone',                  type:'text',   required:true },
      { name:'email',             label:'Email',                  type:'email' },
      { name:'address',           label:'Address',                type:'textarea', full:true },
      { name:'blood_group',       label:'Blood Group',            type:'text' },
      { name:'emergency_name',    label:'Emergency Contact Name', type:'text' },
      { name:'emergency_phone',   label:'Emergency Contact Phone',type:'text' },
    ]
  },
  doctors: {
    title: 'Doctors',
    subtitle: 'Manage doctor profiles',
    pk: 'doctor_id',
    columns: ['doctor_id','first_name','last_name','specialization','department_id','phone','status'],
    labels:  ['ID','First Name','Last Name','Specialization','Dept ID','Phone','Status'],
    fields: [
      { name:'first_name',     label:'First Name',    type:'text',   required:true },
      { name:'last_name',      label:'Last Name',     type:'text',   required:true },
      { name:'specialization', label:'Specialization',type:'text',   required:true },
      { name:'department_id',  label:'Department ID', type:'number', required:true },
      { name:'phone',          label:'Phone',         type:'text' },
      { name:'email',          label:'Email',         type:'email' },
      { name:'hire_date',      label:'Hire Date',     type:'date',   required:true },
      { name:'salary',         label:'Salary',        type:'number' },
      { name:'status',         label:'Status',        type:'select', options:['Active','On Leave','Retired'] },
    ]
  },
  nurses: {
    title: 'Nurses',
    subtitle: 'Manage nursing staff',
    pk: 'nurse_id',
    columns: ['nurse_id','first_name','last_name','department_id','phone','shift_preference','salary'],
    labels:  ['ID','First Name','Last Name','Dept ID','Phone','Shift','Salary'],
    fields: [
      { name:'first_name',       label:'First Name',       type:'text',   required:true },
      { name:'last_name',        label:'Last Name',        type:'text',   required:true },
      { name:'department_id',    label:'Department ID',    type:'number', required:true },
      { name:'phone',            label:'Phone',            type:'text' },
      { name:'email',            label:'Email',            type:'email' },
      { name:'hire_date',        label:'Hire Date',        type:'date',   required:true },
      { name:'salary',           label:'Salary',           type:'number' },
      { name:'shift_preference', label:'Shift Preference', type:'select', options:['Morning','Evening','Night','Rotating'] },
    ]
  },
  staff: {
    title: 'Staff',
    subtitle: 'Manage administrative & support staff',
    pk: 'staff_id',
    columns: ['staff_id','first_name','last_name','role','department_id','phone','salary'],
    labels:  ['ID','First Name','Last Name','Role','Dept ID','Phone','Salary'],
    fields: [
      { name:'first_name',    label:'First Name',   type:'text',   required:true },
      { name:'last_name',     label:'Last Name',    type:'text',   required:true },
      { name:'role',          label:'Role',         type:'text',   required:true },
      { name:'department_id', label:'Department ID',type:'number' },
      { name:'phone',         label:'Phone',        type:'text' },
      { name:'email',         label:'Email',        type:'email' },
      { name:'hire_date',     label:'Hire Date',    type:'date',   required:true },
      { name:'salary',        label:'Salary',       type:'number' },
    ]
  },
  departments: {
    title: 'Departments',
    subtitle: 'Manage hospital departments',
    pk: 'department_id',
    columns: ['department_id','department_name','location','phone','head_doctor_id'],
    labels:  ['ID','Name','Location','Phone','Head Doctor ID'],
    fields: [
      { name:'department_name', label:'Department Name', type:'text', required:true },
      { name:'location',        label:'Location',        type:'text' },
      { name:'phone',           label:'Phone',           type:'text' },
      { name:'head_doctor_id',  label:'Head Doctor ID',  type:'number' },
    ]
  },
  rooms: {
    title: 'Rooms',
    subtitle: 'Manage hospital rooms',
    pk: 'room_id',
    columns: ['room_id','room_number','room_type','floor','bed_count','status','daily_rate'],
    labels:  ['ID','Room No.','Type','Floor','Beds','Status','Daily Rate'],
    fields: [
      { name:'room_number', label:'Room Number', type:'text',   required:true },
      { name:'room_type',   label:'Room Type',   type:'select', options:['General','Semi-Private','Private','ICU','Emergency'], required:true },
      { name:'floor',       label:'Floor',       type:'number', required:true },
      { name:'bed_count',   label:'Bed Count',   type:'number', required:true },
      { name:'status',      label:'Status',      type:'select', options:['Available','Occupied','Maintenance','Cleaning'] },
      { name:'daily_rate',  label:'Daily Rate',  type:'number', required:true },
    ]
  },
  beds: {
    title: 'Beds',
    subtitle: 'Manage bed availability',
    pk: 'bed_id',
    columns: ['bed_id','room_id','bed_number','status'],
    labels:  ['ID','Room ID','Bed No.','Status'],
    fields: [
      { name:'room_id',    label:'Room ID',    type:'number', required:true },
      { name:'bed_number', label:'Bed Number', type:'text',   required:true },
      { name:'status',     label:'Status',     type:'select', options:['Available','Occupied','Reserved','Maintenance'] },
    ]
  },
  appointments: {
    title: 'Appointments',
    subtitle: 'Manage patient appointments',
    pk: 'appointment_id',
    columns: ['appointment_id','patient_id','doctor_id','appointment_date','status','reason'],
    labels:  ['ID','Patient ID','Doctor ID','Date','Status','Reason'],
    fields: [
      { name:'patient_id',       label:'Patient ID',       type:'number',        required:true },
      { name:'doctor_id',        label:'Doctor ID',        type:'number',        required:true },
      { name:'appointment_date', label:'Appointment Date', type:'datetime-local', required:true },
      { name:'status',           label:'Status',           type:'select', options:['Scheduled','Completed','Cancelled','No-Show'] },
      { name:'reason',           label:'Reason',           type:'text' },
      { name:'notes',            label:'Notes',            type:'textarea', full:true },
    ]
  },
  admissions: {
    title: 'Admissions',
    subtitle: 'Track patient admissions',
    pk: 'admission_id',
    columns: ['admission_id','patient_id','bed_id','doctor_id','admission_date','status','diagnosis'],
    labels:  ['ID','Patient ID','Bed ID','Doctor ID','Admission Date','Status','Diagnosis'],
    fields: [
      { name:'patient_id',     label:'Patient ID',     type:'number',        required:true },
      { name:'bed_id',         label:'Bed ID',         type:'number',        required:true },
      { name:'doctor_id',      label:'Doctor ID',      type:'number',        required:true },
      { name:'admission_date', label:'Admission Date', type:'datetime-local' },
      { name:'discharge_date', label:'Discharge Date', type:'datetime-local' },
      { name:'diagnosis',      label:'Diagnosis',      type:'textarea', full:true },
      { name:'status',         label:'Status',         type:'select', options:['Admitted','Discharged','Transferred','Deceased'] },
    ]
  },
  medical_records: {
    title: 'Medical Records',
    subtitle: 'Patient medical history',
    pk: 'record_id',
    columns: ['record_id','patient_id','doctor_id','admission_id','visit_date','diagnosis'],
    labels:  ['ID','Patient ID','Doctor ID','Admission ID','Visit Date','Diagnosis'],
    fields: [
      { name:'patient_id',   label:'Patient ID',   type:'number', required:true },
      { name:'doctor_id',    label:'Doctor ID',    type:'number', required:true },
      { name:'admission_id', label:'Admission ID', type:'number' },
      { name:'visit_date',   label:'Visit Date',   type:'datetime-local' },
      { name:'diagnosis',    label:'Diagnosis',    type:'textarea', full:true },
      { name:'symptoms',     label:'Symptoms',     type:'textarea', full:true },
      { name:'treatment',    label:'Treatment',    type:'textarea', full:true },
      { name:'notes',        label:'Notes',        type:'textarea', full:true },
    ]
  },
  lab_tests: {
    title: 'Lab Tests',
    subtitle: 'Manage laboratory tests',
    pk: 'test_id',
    columns: ['test_id','patient_id','doctor_id','ordered_date','result_date','status','remarks'],
    labels:  ['ID','Patient ID','Doctor ID','Ordered','Result Date','Status','Remarks'],
    fields: [
      { name:'patient_id',   label:'Patient ID',  type:'number', required:true },
      { name:'doctor_id',    label:'Doctor ID',   type:'number', required:true },
      { name:'record_id',    label:'Record ID',   type:'number' },
      { name:'ordered_date', label:'Ordered Date',type:'datetime-local' },
      { name:'result_date',  label:'Result Date', type:'datetime-local' },
      { name:'status',       label:'Status',      type:'select', options:['Ordered','In Progress','Completed','Cancelled'] },
      { name:'remarks',      label:'Remarks',     type:'textarea', full:true },
    ]
  },
  insurance_policies: {
    title: 'Insurance Policies',
    subtitle: 'Manage patient insurance',
    pk: 'policy_id',
    columns: ['policy_id','patient_id','provider_name','policy_number','coverage_amount','status'],
    labels:  ['ID','Patient ID','Provider','Policy No.','Coverage','Status'],
    fields: [
      { name:'patient_id',      label:'Patient ID',      type:'number', required:true },
      { name:'provider_name',   label:'Provider Name',   type:'text',   required:true },
      { name:'policy_number',   label:'Policy Number',   type:'text',   required:true },
      { name:'coverage_amount', label:'Coverage Amount', type:'number' },
      { name:'valid_from',      label:'Valid From',      type:'date',   required:true },
      { name:'valid_until',     label:'Valid Until',     type:'date',   required:true },
      { name:'status',          label:'Status',          type:'select', options:['Active','Expired','Claimed','Rejected'] },
    ]
  },
  bills: {
    title: 'Bills',
    subtitle: 'Manage patient billing',
    pk: 'bill_id',
    columns: ['bill_id','patient_id','admission_id','total_amount','discount','tax_amount','status','due_date'],
    labels:  ['ID','Patient ID','Admission ID','Total','Discount','Tax','Status','Due Date'],
    fields: [
      { name:'patient_id',         label:'Patient ID',         type:'number', required:true },
      { name:'admission_id',       label:'Admission ID',       type:'number' },
      { name:'total_amount',       label:'Total Amount',       type:'number', required:true },
      { name:'discount',           label:'Discount',           type:'number' },
      { name:'tax_amount',         label:'Tax Amount',         type:'number' },
      { name:'status',             label:'Status',             type:'select', options:['Pending','Partial','Paid','Overdue','Waived'] },
      { name:'generated_date',     label:'Generated Date',     type:'datetime-local' },
      { name:'due_date',           label:'Due Date',           type:'date' },
      { name:'insurance_claim_id', label:'Insurance Policy ID',type:'number' },
    ]
  },
  payments: {
    title: 'Payments',
    subtitle: 'Track payment transactions',
    pk: 'payment_id',
    columns: ['payment_id','bill_id','amount','payment_method','payment_date','status','transaction_ref'],
    labels:  ['ID','Bill ID','Amount','Method','Date','Status','Ref'],
    fields: [
      { name:'bill_id',         label:'Bill ID',         type:'number', required:true },
      { name:'amount',          label:'Amount',          type:'number', required:true },
      { name:'payment_method',  label:'Payment Method',  type:'select', options:['Cash','Card','Bank Transfer','Insurance','UPI'], required:true },
      { name:'payment_date',    label:'Payment Date',    type:'datetime-local' },
      { name:'transaction_ref', label:'Transaction Ref', type:'text' },
      { name:'status',          label:'Status',          type:'select', options:['Completed','Failed','Refunded','Pending'] },
    ]
  },
  medicines: {
    title: 'Medicines',
    subtitle: 'Manage medicine inventory',
    pk: 'medicine_id',
    columns: ['medicine_id','medicine_name','category','stock_quantity','unit_price','expiry_date','supplier_id'],
    labels:  ['ID','Medicine','Category','Stock','Unit Price','Expiry','Supplier ID'],
    fields: [
      { name:'medicine_name',  label:'Medicine Name',  type:'text',   required:true },
      { name:'category',       label:'Category',       type:'text' },
      { name:'stock_quantity', label:'Stock Quantity', type:'number', required:true },
      { name:'unit_price',     label:'Unit Price',     type:'number', required:true },
      { name:'expiry_date',    label:'Expiry Date',    type:'date',   required:true },
      { name:'supplier_id',    label:'Supplier ID',    type:'number', required:true },
    ]
  },
  prescriptions: {
    title: 'Prescriptions',
    subtitle: 'Manage medicine prescriptions',
    pk: 'prescription_id',
    columns: ['prescription_id','record_id','medicine_id','duration_days','quantity','status','instructions'],
    labels:  ['ID','Record ID','Medicine ID','Duration (days)','Qty','Status','Instructions'],
    fields: [
      { name:'record_id',     label:'Record ID',      type:'number', required:true },
      { name:'medicine_id',   label:'Medicine ID',    type:'number', required:true },
      { name:'duration_days', label:'Duration (days)',type:'number', required:true },
      { name:'quantity',      label:'Quantity',       type:'number', required:true },
      { name:'instructions',  label:'Instructions',   type:'textarea', full:true },
      { name:'status',        label:'Status',         type:'select', options:['Pending','Cancelled'] },
    ]
  },
  suppliers: {
    title: 'Suppliers',
    subtitle: 'Manage suppliers',
    pk: 'supplier_id',
    columns: ['supplier_id','supplier_name','contact_person','phone','email','supply_type'],
    labels:  ['ID','Supplier Name','Contact','Phone','Email','Supply Type'],
    fields: [
      { name:'supplier_name',  label:'Supplier Name',  type:'text',   required:true },
      { name:'contact_person', label:'Contact Person', type:'text' },
      { name:'phone',          label:'Phone',          type:'text',   required:true },
      { name:'email',          label:'Email',          type:'email' },
      { name:'address',        label:'Address',        type:'textarea', full:true },
      { name:'supply_type',    label:'Supply Type',    type:'select', options:['Medicines','Equipment','Both'] },
    ]
  },
  attendance: {
    title: 'Attendance',
    subtitle: 'Staff attendance records',
    pk: 'attendance_id',
    columns: ['attendance_id','staff_type','staff_id','shift_date','check_in','check_out','status','overtime_hours'],
    labels:  ['ID','Staff Type','Staff ID','Date','Check In','Check Out','Status','OT Hours'],
    fields: [
      { name:'staff_type',     label:'Staff Type',     type:'select', options:['Doctor','Nurse','Staff'], required:true },
      { name:'staff_id',       label:'Staff ID',       type:'number', required:true },
      { name:'check_in',       label:'Check In',       type:'datetime-local', required:true },
      { name:'check_out',      label:'Check Out',      type:'datetime-local' },
      { name:'shift_date',     label:'Shift Date',     type:'date',   required:true },
      { name:'status',         label:'Status',         type:'select', options:['Present','Absent','Late','On Leave','Half Day'] },
      { name:'overtime_hours', label:'Overtime Hours', type:'number' },
    ]
  },
};

let currentSection = 'dashboard';
let allData = [];
let deleteId = null;
let editId   = null;

const tableHead      = document.getElementById('tableHead');
const tableBody      = document.getElementById('tableBody');
const emptyState     = document.getElementById('emptyState');
const loading        = document.getElementById('loading');
const pageTitle      = document.getElementById('pageTitle');
const pageSubtitle   = document.getElementById('pageSubtitle');
const searchInput    = document.getElementById('searchInput');
const addBtn         = document.getElementById('addBtn');
const searchWrap     = document.getElementById('searchWrap');
const dashboardPage  = document.getElementById('dashboardPage');
const tablePage      = document.getElementById('tablePage');
const modalOverlay   = document.getElementById('modalOverlay');
const modalTitle     = document.getElementById('modalTitle');
const modalBody      = document.getElementById('modalBody');
const modalClose     = document.getElementById('modalClose');
const cancelBtn      = document.getElementById('cancelBtn');
const saveBtn        = document.getElementById('saveBtn');
const confirmOverlay = document.getElementById('confirmOverlay');
const confirmClose   = document.getElementById('confirmClose');
const confirmCancel  = document.getElementById('confirmCancel');
const confirmDelete  = document.getElementById('confirmDelete');
const toast          = document.getElementById('toast');

function showToast(msg, type = 'success') {
  toast.textContent = msg;
  toast.className = `toast show ${type}`;
  setTimeout(() => { toast.className = 'toast'; }, 3000);
}

async function apiFetch(path, opts = {}) {
  const res = await fetch(API_BASE + path, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

function statusBadge(val) {
 if (!val) return '<span class="badge badge-gray">—</span>';
  const v = val.toLowerCase();
  if (['active','present','completed','paid','available','admitted'].includes(v))
    return `<span class="badge badge-green">${val}</span>`;
  if (['scheduled','in progress','pending','partial','ordered','reserved'].includes(v))
    return `<span class="badge badge-blue">${val}</span>`;
  if (['on leave','late','half day'].includes(v))
    return `<span class="badge badge-yellow">${val}</span>`;
  if (['cancelled','deceased','expired','rejected','overdue','failed','absent','maintenance','occupied'].includes(v))
    return `<span class="badge badge-red">${val}</span>`;
  return `<span class="badge badge-gray">${val}</span>`;
}

const MONO_COLS = ['patient_id','doctor_id','nurse_id','staff_id','room_id','bed_id','department_id',
                   'admission_id','appointment_id','record_id','test_id','policy_id','bill_id',
                   'payment_id','medicine_id','supplier_id','prescription_id','attendance_id','head_doctor_id'];

function renderCell(col, val) {
  if (val === null || val === undefined) return '<span style="color:var(--text-muted)">-</span>';
  if (col === 'status') return statusBadge(String(val));
  if (MONO_COLS.includes(col)) return `<span class="mono">${val}</span>`;
  const str = String(val);
  if (str.length > 40) return `<span title="${str}">${str.slice(0,38)}…</span>`;
  return str;
}

async function loadSection(section) {
  currentSection = section;

  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.section === section);
  });

  if (section === 'dashboard') {
    dashboardPage.style.display = 'flex';
    tablePage.style.display     = 'none';
    addBtn.style.display        = 'none';
    searchWrap.style.display    = 'none';
    pageTitle.textContent       = 'Dashboard';
    pageSubtitle.textContent    = 'Hospital analytics overview';
    loadDashboard();
    return;
  }

  dashboardPage.style.display = 'none';
  tablePage.style.display     = 'flex';
  addBtn.style.display        = '';
  searchWrap.style.display    = '';

  const schema = SCHEMAS[section];
  pageTitle.textContent    = schema.title;
  pageSubtitle.textContent = schema.subtitle;
  searchInput.value = '';

  loading.style.display   = 'flex';
  emptyState.style.display = 'none';
  tableHead.innerHTML = '';
  tableBody.innerHTML = '';

  try {
    allData = await apiFetch(`/${section}`);
    renderTable(allData);
  } catch (err) {
    showToast('Failed to load data: ' + err.message, 'error');
    loading.style.display = 'none';
  }
}

function renderTable(data) {
  const schema = SCHEMAS[currentSection];
  loading.style.display = 'none';

  if (!data.length) {
    emptyState.style.display = 'block';
    return;
  }
  emptyState.style.display = 'none';

  const thCells = schema.labels.map(l => `<th>${l}</th>`).join('') + '<th style="text-align:right">Actions</th>';
  tableHead.innerHTML = `<tr>${thCells}</tr>`;

  tableBody.innerHTML = data.map(row => {
    const cells = schema.columns.map(col => `<td>${renderCell(col, row[col])}</td>`).join('');
    const pk = row[schema.pk];
    return `<tr>
      ${cells}
      <td class="actions-cell">
      <button class="btn-icon edit" onclick="openEdit(${pk})" title="Edit">✏️</button>
<button class="btn-icon delete" onclick="openDelete(${pk})" title="Delete">🗑️</button>
      </td>
    </tr>`;
  }).join('');
}

searchInput.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase();
  if (!q) { renderTable(allData); return; }
  const filtered = allData.filter(row =>
    Object.values(row).some(v => v && String(v).toLowerCase().includes(q))
  );
  renderTable(filtered);
});

function buildForm(fields, data = {}) {
  return `<div class="form-grid">${fields.map(f => {
    const val  = data[f.name] ?? '';
    const full = f.full ? ' full' : '';
    let input;
    if (f.type === 'select') {
      const opts = f.options.map(o =>
        `<option value="${o}" ${val === o ? 'selected' : ''}>${o}</option>`
      ).join('');
     input = `<select name="${f.name}" ${f.required ? 'required' : ''}><option value="">— select —</option>${opts}</select>`;
    } else if (f.type === 'textarea') {
      input = `<textarea name="${f.name}" rows="2" placeholder="${f.label}">${val}</textarea>`;
    } else {
      let fval = val;
      if (f.type === 'datetime-local' && val) fval = val.replace(' ','T').slice(0,16);
      input = `<input type="${f.type}" name="${f.name}" value="${fval}" placeholder="${f.label}" ${f.required ? 'required' : ''} />`;
    }
    return `<div class="form-group${full}"><label>${f.label}${f.required ? ' *' : ''}</label>${input}</div>`;
  }).join('')}</div>`;
}

function getFormData(fields) {
  const out = {};
  fields.forEach(f => {
    const el = modalBody.querySelector(`[name="${f.name}"]`);
    if (!el) return;
    const v = el.value.trim();
    if (v === '') { out[f.name] = null; return; }
    if (f.type === 'number') { out[f.name] = Number(v); return; }
    out[f.name] = v;
  });
  return out;
}

addBtn.addEventListener('click', () => {
  editId = null;
  const schema = SCHEMAS[currentSection];
  modalTitle.textContent = `Add ${schema.title.slice(0,-1)}`;
  modalBody.innerHTML = buildForm(schema.fields);
  modalOverlay.classList.add('open');
});

window.openEdit = function(pk) {
  const schema = SCHEMAS[currentSection];
  const row = allData.find(r => r[schema.pk] === pk);
  if (!row) return;
  editId = pk;
  modalTitle.textContent = `Edit ${schema.title.slice(0,-1)}`;
  modalBody.innerHTML = buildForm(schema.fields, row);
  modalOverlay.classList.add('open');
};

saveBtn.addEventListener('click', async () => {
  const schema  = SCHEMAS[currentSection];
  const body    = getFormData(schema.fields);
  const missing = schema.fields.filter(f => f.required && !body[f.name]);
  if (missing.length) {
    showToast(`Required: ${missing.map(f => f.label).join(', ')}`, 'error');
    return;
  }
  saveBtn.disabled    = true;
saveBtn.textContent = 'Saving…';
  try {
    if (editId) {
      await apiFetch(`/${currentSection}/${editId}`, { method:'PUT', body: JSON.stringify(body) });
      showToast('Record updated');
    } else {
      await apiFetch(`/${currentSection}`, { method:'POST', body: JSON.stringify(body) });
      showToast('Record created');
    }
    closeModal();
    loadSection(currentSection);
  } catch (err) {
    showToast(err.message, 'error');
  } finally {
    saveBtn.disabled    = false;
    saveBtn.textContent = 'Save';
  }
});

window.openDelete = function(pk) {
  deleteId = pk;
  confirmOverlay.classList.add('open');
};

confirmDelete.addEventListener('click', async () => {
  confirmDelete.disabled    = true;
confirmDelete.textContent = 'Deleting…';
  try {
    await apiFetch(`/${currentSection}/${deleteId}`, { method:'DELETE' });
    showToast('Record deleted');
    closeConfirm();
    loadSection(currentSection);
  } catch (err) {
    showToast(err.message, 'error');
  } finally {
    confirmDelete.disabled    = false;
    confirmDelete.textContent = 'Delete';
  }
});

function closeModal() {
  modalOverlay.classList.remove('open');
  modalBody.innerHTML = '';
  editId = null;
}

function closeConfirm() {
  confirmOverlay.classList.remove('open');
  deleteId = null;
}

modalClose.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
confirmClose.addEventListener('click', closeConfirm);
confirmCancel.addEventListener('click', closeConfirm);
confirmOverlay.addEventListener('click', e => { if (e.target === confirmOverlay) closeConfirm(); });

document.querySelectorAll('.nav-item').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    loadSection(el.dataset.section);
  });
});

const CHART_COLORS = {
  blue:   '#3b82f6',
  green:  '#10b981',
  yellow: '#f59e0b',
  red:    '#ef4444',
  purple: '#8b5cf6',
  teal:   '#14b8a6',
  pink:   '#ec4899',
  orange: '#f97316',
  indigo: '#6366f1',
  lime:   '#84cc16',
};
const PALETTE = Object.values(CHART_COLORS);

Chart.defaults.color       = '#8896b3';
Chart.defaults.borderColor = '#2a3450';
Chart.defaults.font.family = 'Inter, sans-serif';
Chart.defaults.font.size   = 12;
Chart.defaults.plugins.legend.labels.boxWidth = 12;
Chart.defaults.plugins.legend.labels.padding  = 16;

const chartInstances = {};

function destroyChart(id) {
  if (chartInstances[id]) { chartInstances[id].destroy(); delete chartInstances[id]; }
}

function countBy(arr, key) {
  return arr.reduce((acc, item) => {
    const val = item[key] || 'Unknown';
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
}

function fmt(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'K';
  return String(Math.round(n));
}

async function loadDashboard() {
  try {
    const [
      patients, doctors, admissions, appointments,
      medicines, bills, payments, beds,
      lab_tests, attendance, insurance_policies, departments
    ] = await Promise.all([
      fetch('/patients').then(r => r.json()),
      fetch('/doctors').then(r => r.json()),
      fetch('/admissions').then(r => r.json()),
      fetch('/appointments').then(r => r.json()),
      fetch('/medicines').then(r => r.json()),
      fetch('/bills').then(r => r.json()),
      fetch('/payments').then(r => r.json()),
      fetch('/beds').then(r => r.json()),
      fetch('/lab_tests').then(r => r.json()),
      fetch('/attendance').then(r => r.json()),
      fetch('/insurance_policies').then(r => r.json()),
      fetch('/departments').then(r => r.json()),
    ]);

    document.getElementById('statPatients').textContent     = patients.length;
    document.getElementById('statDoctors').textContent      = doctors.length;
    document.getElementById('statAdmissions').textContent   = admissions.length;
    document.getElementById('statAppointments').textContent = appointments.length;
    document.getElementById('statMedicines').textContent    = medicines.length;

    const totalRevenue = payments
      .filter(p => p.status === 'Completed')
      .reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
    document.getElementById('statRevenue').textContent = fmt(totalRevenue);

    renderAppointmentBar(appointments);
    renderAdmissionDoughnut(admissions);
    renderBillPie(bills);
    renderMedicineBar(medicines);
    renderPaymentLine(payments);
    renderDeptDoughnut(doctors, departments);
    renderBedPie(beds);
    renderLabDoughnut(lab_tests);
    renderBillArea(bills);
    renderAttendanceBar(attendance);
    renderInsurancePie(insurance_policies);

  } catch (err) {
    console.error('Dashboard load error:', err);
  }
}

function renderAppointmentBar(appointments) {
  destroyChart('appointmentBarChart');
  const counts = countBy(appointments, 'status');
  chartInstances['appointmentBarChart'] = new Chart(document.getElementById('appointmentBarChart'), {
    type: 'bar',
    data: {
      labels: Object.keys(counts),
      datasets: [{
        label: 'Appointments',
        data: Object.values(counts),
        backgroundColor: [CHART_COLORS.blue, CHART_COLORS.green, CHART_COLORS.red, CHART_COLORS.yellow],
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: '#2a3450' } },
        y: { grid: { color: '#2a3450' }, beginAtZero: true, ticks: { precision: 0 } }
      }
    }
  });
}

function renderAdmissionDoughnut(admissions) {
  destroyChart('admissionDoughnutChart');
  const counts = countBy(admissions, 'status');
  chartInstances['admissionDoughnutChart'] = new Chart(document.getElementById('admissionDoughnutChart'), {
    type: 'doughnut',
    data: {
      labels: Object.keys(counts),
      datasets: [{ data: Object.values(counts), backgroundColor: PALETTE, borderWidth: 2, borderColor: '#1c2333' }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '65%',
      plugins: { legend: { position: 'bottom' } }
    }
  });
}

function renderBillPie(bills) {
  destroyChart('billPieChart');
  const counts = countBy(bills, 'status');
  chartInstances['billPieChart'] = new Chart(document.getElementById('billPieChart'), {
    type: 'pie',
    data: {
      labels: Object.keys(counts),
      datasets: [{ data: Object.values(counts), backgroundColor: PALETTE, borderWidth: 2, borderColor: '#1c2333' }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom' } }
    }
  });
}

function renderMedicineBar(medicines) {
  destroyChart('medicineBarChart');
  chartInstances['medicineBarChart'] = new Chart(document.getElementById('medicineBarChart'), {
    type: 'bar',
    data: {
      labels: medicines.map(m => m.medicine_name),
      datasets: [{
        label: 'Stock Qty',
        data: medicines.map(m => m.stock_quantity),
        backgroundColor: CHART_COLORS.teal,
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: '#2a3450' } },
        y: { grid: { color: '#2a3450' }, beginAtZero: true }
      }
    }
  });
}

function renderPaymentLine(payments) {
  destroyChart('paymentLineChart');
  const byDate = {};
  payments.forEach(p => {
    if (!p.payment_date) return;
    const d = p.payment_date.slice(0, 10);
    byDate[d] = (byDate[d] || 0) + parseFloat(p.amount || 0);
  });
  const sorted  = Object.keys(byDate).sort();
  const amounts = sorted.map(d => byDate[d]);
  chartInstances['paymentLineChart'] = new Chart(document.getElementById('paymentLineChart'), {
    type: 'line',
    data: {
      labels: sorted,
      datasets: [{
        label: 'Payment Amount (PKR)',
        data: amounts,
        borderColor: CHART_COLORS.blue,
        backgroundColor: 'rgba(59,130,246,0.1)',
        fill: true, tension: 0.4,
        pointBackgroundColor: CHART_COLORS.blue,
        pointRadius: 5, pointHoverRadius: 7,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: '#2a3450' } },
        y: { grid: { color: '#2a3450' }, beginAtZero: true }
      }
    }
  });
}

function renderDeptDoughnut(doctors, departments) {
  destroyChart('deptDoughnutChart');
  const deptMap = {};
  departments.forEach(d => { deptMap[d.department_id] = d.department_name; });
  const counts = {};
  doctors.forEach(doc => {
    const name = deptMap[doc.department_id] || `Dept ${doc.department_id}`;
    counts[name] = (counts[name] || 0) + 1;
  });
  chartInstances['deptDoughnutChart'] = new Chart(document.getElementById('deptDoughnutChart'), {
    type: 'doughnut',
    data: {
      labels: Object.keys(counts),
      datasets: [{ data: Object.values(counts), backgroundColor: PALETTE, borderWidth: 2, borderColor: '#1c2333' }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '65%',
      plugins: { legend: { position: 'bottom' } }
    }
  });
}

function renderBedPie(beds) {
  destroyChart('bedPieChart');
  const counts = countBy(beds, 'status');
  const colorMap = {
    Available: CHART_COLORS.green, Occupied: CHART_COLORS.red,
    Reserved: CHART_COLORS.yellow, Maintenance: CHART_COLORS.orange,
  };
  chartInstances['bedPieChart'] = new Chart(document.getElementById('bedPieChart'), {
    type: 'pie',
    data: {
      labels: Object.keys(counts),
      datasets: [{ data: Object.values(counts), backgroundColor: Object.keys(counts).map(k => colorMap[k] || CHART_COLORS.blue), borderWidth: 2, borderColor: '#1c2333' }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom' } }
    }
  });
}

function renderLabDoughnut(lab_tests) {
  destroyChart('labDoughnutChart');
  const counts = countBy(lab_tests, 'status');
  chartInstances['labDoughnutChart'] = new Chart(document.getElementById('labDoughnutChart'), {
    type: 'doughnut',
    data: {
      labels: Object.keys(counts),
      datasets: [{ data: Object.values(counts), backgroundColor: PALETTE, borderWidth: 2, borderColor: '#1c2333' }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '65%',
      plugins: { legend: { position: 'bottom' } }
    }
  });
}

function renderBillArea(bills) {
  destroyChart('billAreaChart');
  chartInstances['billAreaChart'] = new Chart(document.getElementById('billAreaChart'), {
    type: 'line',
    data: {
      labels: bills.map((_, i) => `Bill #${i + 1}`),
      datasets: [
        {
          label: 'Total Amount',
          data: bills.map(b => parseFloat(b.total_amount) || 0),
          borderColor: CHART_COLORS.blue,
          backgroundColor: 'rgba(59,130,246,0.15)',
          fill: true, tension: 0.4, pointRadius: 4,
        },
        {
          label: 'Discount',
          data: bills.map(b => parseFloat(b.discount) || 0),
          borderColor: CHART_COLORS.green,
          backgroundColor: 'rgba(16,185,129,0.1)',
          fill: true, tension: 0.4, pointRadius: 4,
        },
        {
          label: 'Tax',
          data: bills.map(b => parseFloat(b.tax_amount) || 0),
          borderColor: CHART_COLORS.yellow,
          backgroundColor: 'rgba(245,158,11,0.1)',
          fill: true, tension: 0.4, pointRadius: 4,
        },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top' } },
      scales: {
        x: { grid: { color: '#2a3450' } },
        y: { grid: { color: '#2a3450' }, beginAtZero: true }
      }
    }
  });
}

function renderAttendanceBar(attendance) {
  destroyChart('attendanceBarChart');
  const counts = countBy(attendance, 'status');
  const colorMap = {
    Present: CHART_COLORS.green, Absent: CHART_COLORS.red,
    Late: CHART_COLORS.yellow, 'On Leave': CHART_COLORS.blue, 'Half Day': CHART_COLORS.orange,
  };
  chartInstances['attendanceBarChart'] = new Chart(document.getElementById('attendanceBarChart'), {
    type: 'bar',
    data: {
      labels: Object.keys(counts),
      datasets: [{
        label: 'Staff Count',
        data: Object.values(counts),
        backgroundColor: Object.keys(counts).map(k => colorMap[k] || CHART_COLORS.purple),
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: '#2a3450' } },
        y: { grid: { color: '#2a3450' }, beginAtZero: true, ticks: { precision: 0 } }
      }
    }
  });
}

function renderInsurancePie(insurance_policies) {
  destroyChart('insurancePieChart');
  const counts = countBy(insurance_policies, 'status');
  const colorMap = {
    Active: CHART_COLORS.green, Expired: CHART_COLORS.red,
    Claimed: CHART_COLORS.blue, Rejected: CHART_COLORS.orange,
  };
  chartInstances['insurancePieChart'] = new Chart(document.getElementById('insurancePieChart'), {
    type: 'pie',
    data: {
      labels: Object.keys(counts),
      datasets: [{ data: Object.values(counts), backgroundColor: Object.keys(counts).map(k => colorMap[k] || CHART_COLORS.purple), borderWidth: 2, borderColor: '#1c2333' }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom' } }
    }
  });
}

loadSection('dashboard');