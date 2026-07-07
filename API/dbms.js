const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();
const path = require('path');



const app = express();
app.use(express.json());
app.use(cors());


const pool = new Pool({
    connectionString : process.env.DATABASE_URL,
    ssl : {
        rejectUnauthorized : false
    }
});


// departments
 
app.get('/departments', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM departments');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.post('/departments', async (req, res) => {
    try {
        const { department_name, location, phone } = req.body;
        const result = await pool.query(
            'INSERT INTO departments (department_name, location, phone) VALUES ($1, $2, $3) RETURNING *',
            [department_name, location, phone]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.put('/departments/:id', async (req, res) => {
    try {
        const { department_name, location, phone, head_doctor_id } = req.body;
        const result = await pool.query(
            'UPDATE departments SET department_name=$1, location=$2, phone=$3, head_doctor_id=$4 WHERE department_id=$5 RETURNING *',
            [department_name, location, phone, head_doctor_id, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Department not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.delete('/departments/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM departments WHERE department_id=$1 RETURNING *',
            [req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Department not found' });
        res.json({ message: 'Department deleted', department: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
 
//  doctors
 
app.get('/doctors', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM doctors');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.post('/doctors', async (req, res) => {
    try {
        const { first_name, last_name, specialization, department_id, phone, email, hire_date, salary, status } = req.body;
        const result = await pool.query(
            `INSERT INTO doctors (first_name, last_name, specialization, department_id, phone, email, hire_date, salary, status)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
            [first_name, last_name, specialization, department_id, phone, email, hire_date, salary, status]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.put('/doctors/:id', async (req, res) => {
    try {
        const { first_name, last_name, specialization, department_id, phone, email, hire_date, salary, status } = req.body;
        const result = await pool.query(
            `UPDATE doctors SET first_name=$1, last_name=$2, specialization=$3, department_id=$4,
             phone=$5, email=$6, hire_date=$7, salary=$8, status=$9 WHERE doctor_id=$10 RETURNING *`,
            [first_name, last_name, specialization, department_id, phone, email, hire_date, salary, status, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Doctor not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.delete('/doctors/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM doctors WHERE doctor_id=$1 RETURNING *',
            [req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Doctor not found' });
        res.json({ message: 'Doctor deleted', doctor: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
 
// nurses
 
app.get('/nurses', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM nurses');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.post('/nurses', async (req, res) => {
    try {
        const { first_name, last_name, department_id, phone, email, hire_date, salary, shift_preference } = req.body;
        const result = await pool.query(
            `INSERT INTO nurses (first_name, last_name, department_id, phone, email, hire_date, salary, shift_preference)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
            [first_name, last_name, department_id, phone, email, hire_date, salary, shift_preference]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.put('/nurses/:id', async (req, res) => {
    try {
        const { first_name, last_name, department_id, phone, email, hire_date, salary, shift_preference } = req.body;
        const result = await pool.query(
            `UPDATE nurses SET first_name=$1, last_name=$2, department_id=$3, phone=$4,
             email=$5, hire_date=$6, salary=$7, shift_preference=$8 WHERE nurse_id=$9 RETURNING *`,
            [first_name, last_name, department_id, phone, email, hire_date, salary, shift_preference, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Nurse not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.delete('/nurses/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM nurses WHERE nurse_id=$1 RETURNING *',
            [req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Nurse not found' });
        res.json({ message: 'Nurse deleted', nurse: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
 
//staff
 
app.get('/staff', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM staff');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.post('/staff', async (req, res) => {
    try {
        const { first_name, last_name, role, department_id, phone, email, hire_date, salary } = req.body;
        const result = await pool.query(
            `INSERT INTO staff (first_name, last_name, role, department_id, phone, email, hire_date, salary)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
            [first_name, last_name, role, department_id, phone, email, hire_date, salary]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.put('/staff/:id', async (req, res) => {
    try {
        const { first_name, last_name, role, department_id, phone, email, hire_date, salary } = req.body;
        const result = await pool.query(
            `UPDATE staff SET first_name=$1, last_name=$2, role=$3, department_id=$4,
             phone=$5, email=$6, hire_date=$7, salary=$8 WHERE staff_id=$9 RETURNING *`,
            [first_name, last_name, role, department_id, phone, email, hire_date, salary, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Staff not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.delete('/staff/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM staff WHERE staff_id=$1 RETURNING *',
            [req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Staff not found' });
        res.json({ message: 'Staff deleted', staff: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
 
//rooms
 
app.get('/rooms', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM rooms');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.post('/rooms', async (req, res) => {
    try {
        const { room_number, room_type, floor, bed_count, status, daily_rate } = req.body;
        const result = await pool.query(
            `INSERT INTO rooms (room_number, room_type, floor, bed_count, status, daily_rate)
             VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
            [room_number, room_type, floor, bed_count, status, daily_rate]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.put('/rooms/:id', async (req, res) => {
    try {
        const { room_number, room_type, floor, bed_count, status, daily_rate } = req.body;
        const result = await pool.query(
            `UPDATE rooms SET room_number=$1, room_type=$2, floor=$3, bed_count=$4,
             status=$5, daily_rate=$6 WHERE room_id=$7 RETURNING *`,
            [room_number, room_type, floor, bed_count, status, daily_rate, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Room not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.delete('/rooms/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM rooms WHERE room_id=$1 RETURNING *',
            [req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Room not found' });
        res.json({ message: 'Room deleted', room: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
 
// beds
 
app.get('/beds', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM beds');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.post('/beds', async (req, res) => {
    try {
        const { room_id, bed_number, status } = req.body;
        const result = await pool.query(
            'INSERT INTO beds (room_id, bed_number, status) VALUES ($1,$2,$3) RETURNING *',
            [room_id, bed_number, status]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.put('/beds/:id', async (req, res) => {
    try {
        const { room_id, bed_number, status } = req.body;
        const result = await pool.query(
            'UPDATE beds SET room_id=$1, bed_number=$2, status=$3 WHERE bed_id=$4 RETURNING *',
            [room_id, bed_number, status, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Bed not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.delete('/beds/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM beds WHERE bed_id=$1 RETURNING *',
            [req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Bed not found' });
        res.json({ message: 'Bed deleted', bed: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
 
// patients
 
app.get('/patients', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM patients');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.post('/patients', async (req, res) => {
    try {
        const { first_name, last_name, date_of_birth, gender, phone, email, address, blood_group, emergency_name, emergency_phone } = req.body;
        const result = await pool.query(
            `INSERT INTO patients (first_name, last_name, date_of_birth, gender, phone, email, address, blood_group, emergency_name, emergency_phone)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
            [first_name, last_name, date_of_birth, gender, phone, email, address, blood_group, emergency_name, emergency_phone]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.put('/patients/:id', async (req, res) => {
    try {
        const { first_name, last_name, date_of_birth, gender, phone, email, address, blood_group, emergency_name, emergency_phone } = req.body;
        const result = await pool.query(
            `UPDATE patients SET first_name=$1, last_name=$2, date_of_birth=$3, gender=$4,
             phone=$5, email=$6, address=$7, blood_group=$8, emergency_name=$9, emergency_phone=$10
             WHERE patient_id=$11 RETURNING *`,
            [first_name, last_name, date_of_birth, gender, phone, email, address, blood_group, emergency_name, emergency_phone, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Patient not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.delete('/patients/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM patients WHERE patient_id=$1 RETURNING *',
            [req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Patient not found' });
        res.json({ message: 'Patient deleted', patient: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
 
// admissions
 
app.get('/admissions', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM admissions');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.post('/admissions', async (req, res) => {
    try {
        const { patient_id, bed_id, doctor_id, admission_date, discharge_date, diagnosis, status } = req.body;
        const result = await pool.query(
            `INSERT INTO admissions (patient_id, bed_id, doctor_id, admission_date, discharge_date, diagnosis, status)
             VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
            [patient_id, bed_id, doctor_id, admission_date, discharge_date, diagnosis, status]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.put('/admissions/:id', async (req, res) => {
    try {
        const { patient_id, bed_id, doctor_id, admission_date, discharge_date, diagnosis, status } = req.body;
        const result = await pool.query(
            `UPDATE admissions SET patient_id=$1, bed_id=$2, doctor_id=$3, admission_date=$4,
             discharge_date=$5, diagnosis=$6, status=$7 WHERE admission_id=$8 RETURNING *`,
            [patient_id, bed_id, doctor_id, admission_date, discharge_date, diagnosis, status, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Admission not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.delete('/admissions/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM admissions WHERE admission_id=$1 RETURNING *',
            [req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Admission not found' });
        res.json({ message: 'Admission deleted', admission: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
 
// apointments
 
app.get('/appointments', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM appointments');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.post('/appointments', async (req, res) => {
    try {
        const { patient_id, doctor_id, appointment_date, status, reason, notes } = req.body;
        const result = await pool.query(
            `INSERT INTO appointments (patient_id, doctor_id, appointment_date, status, reason, notes)
             VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
            [patient_id, doctor_id, appointment_date, status, reason, notes]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.put('/appointments/:id', async (req, res) => {
    try {
        const { patient_id, doctor_id, appointment_date, status, reason, notes } = req.body;
        const result = await pool.query(
            `UPDATE appointments SET patient_id=$1, doctor_id=$2, appointment_date=$3,
             status=$4, reason=$5, notes=$6 WHERE appointment_id=$7 RETURNING *`,
            [patient_id, doctor_id, appointment_date, status, reason, notes, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Appointment not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.delete('/appointments/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM appointments WHERE appointment_id=$1 RETURNING *',
            [req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Appointment not found' });
        res.json({ message: 'Appointment deleted', appointment: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
 
// medical records
 
app.get('/medical_records', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM medical_records');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.post('/medical_records', async (req, res) => {
    try {
        const { patient_id, doctor_id, admission_id, visit_date, diagnosis, symptoms, treatment, notes } = req.body;
        const result = await pool.query(
            `INSERT INTO medical_records (patient_id, doctor_id, admission_id, visit_date, diagnosis, symptoms, treatment, notes)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
            [patient_id, doctor_id, admission_id, visit_date, diagnosis, symptoms, treatment, notes]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.put('/medical_records/:id', async (req, res) => {
    try {
        const { patient_id, doctor_id, admission_id, visit_date, diagnosis, symptoms, treatment, notes } = req.body;
        const result = await pool.query(
            `UPDATE medical_records SET patient_id=$1, doctor_id=$2, admission_id=$3, visit_date=$4,
             diagnosis=$5, symptoms=$6, treatment=$7, notes=$8 WHERE record_id=$9 RETURNING *`,
            [patient_id, doctor_id, admission_id, visit_date, diagnosis, symptoms, treatment, notes, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Medical record not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.delete('/medical_records/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM medical_records WHERE record_id=$1 RETURNING *',
            [req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Medical record not found' });
        res.json({ message: 'Medical record deleted', record: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
 
// lab tests
 
app.get('/lab_tests', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM lab_tests');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.post('/lab_tests', async (req, res) => {
    try {
        const { patient_id, doctor_id, record_id, ordered_date, result_date, status, remarks } = req.body;
        const result = await pool.query(
            `INSERT INTO lab_tests (patient_id, doctor_id, record_id, ordered_date, result_date, status, remarks)
             VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
            [patient_id, doctor_id, record_id, ordered_date, result_date, status, remarks]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.put('/lab_tests/:id', async (req, res) => {
    try {
        const { patient_id, doctor_id, record_id, ordered_date, result_date, status, remarks } = req.body;
        const result = await pool.query(
            `UPDATE lab_tests SET patient_id=$1, doctor_id=$2, record_id=$3, ordered_date=$4,
             result_date=$5, status=$6, remarks=$7 WHERE test_id=$8 RETURNING *`,
            [patient_id, doctor_id, record_id, ordered_date, result_date, status, remarks, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Lab test not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.delete('/lab_tests/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM lab_tests WHERE test_id=$1 RETURNING *',
            [req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Lab test not found' });
        res.json({ message: 'Lab test deleted', lab_test: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
 
// suppliers
 
app.get('/suppliers', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM suppliers');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.post('/suppliers', async (req, res) => {
    try {
        const { supplier_name, contact_person, phone, email, address, supply_type } = req.body;
        const result = await pool.query(
            `INSERT INTO suppliers (supplier_name, contact_person, phone, email, address, supply_type)
             VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
            [supplier_name, contact_person, phone, email, address, supply_type]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.put('/suppliers/:id', async (req, res) => {
    try {
        const { supplier_name, contact_person, phone, email, address, supply_type } = req.body;
        const result = await pool.query(
            `UPDATE suppliers SET supplier_name=$1, contact_person=$2, phone=$3,
             email=$4, address=$5, supply_type=$6 WHERE supplier_id=$7 RETURNING *`,
            [supplier_name, contact_person, phone, email, address, supply_type, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Supplier not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.delete('/suppliers/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM suppliers WHERE supplier_id=$1 RETURNING *',
            [req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Supplier not found' });
        res.json({ message: 'Supplier deleted', supplier: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
 
//medicines
 
app.get('/medicines', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM medicines');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.post('/medicines', async (req, res) => {
    try {
        const { medicine_name, category, stock_quantity, unit_price, expiry_date, supplier_id } = req.body;
        const result = await pool.query(
            `INSERT INTO medicines (medicine_name, category, stock_quantity, unit_price, expiry_date, supplier_id)
             VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
            [medicine_name, category, stock_quantity, unit_price, expiry_date, supplier_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.put('/medicines/:id', async (req, res) => {
    try {
        const { medicine_name, category, stock_quantity, unit_price, expiry_date, supplier_id } = req.body;
        const result = await pool.query(
            `UPDATE medicines SET medicine_name=$1, category=$2, stock_quantity=$3,
             unit_price=$4, expiry_date=$5, supplier_id=$6 WHERE medicine_id=$7 RETURNING *`,
            [medicine_name, category, stock_quantity, unit_price, expiry_date, supplier_id, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Medicine not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.delete('/medicines/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM medicines WHERE medicine_id=$1 RETURNING *',
            [req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Medicine not found' });
        res.json({ message: 'Medicine deleted', medicine: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
 
// prescriptions
 
app.get('/prescriptions', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM prescriptions');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.post('/prescriptions', async (req, res) => {
    try {
        const { record_id, medicine_id, duration_days, quantity, instructions, status } = req.body;
        const result = await pool.query(
            `INSERT INTO prescriptions (record_id, medicine_id, duration_days, quantity, instructions, status)
             VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
            [record_id, medicine_id, duration_days, quantity, instructions, status]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.put('/prescriptions/:id', async (req, res) => {
    try {
        const { record_id, medicine_id, duration_days, quantity, instructions, status } = req.body;
        const result = await pool.query(
            `UPDATE prescriptions SET record_id=$1, medicine_id=$2, duration_days=$3,
             quantity=$4, instructions=$5, status=$6 WHERE prescription_id=$7 RETURNING *`,
            [record_id, medicine_id, duration_days, quantity, instructions, status, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Prescription not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.delete('/prescriptions/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM prescriptions WHERE prescription_id=$1 RETURNING *',
            [req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Prescription not found' });
        res.json({ message: 'Prescription deleted', prescription: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
 
// insurance policies
 
app.get('/insurance_policies', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM insurance_policies');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.post('/insurance_policies', async (req, res) => {
    try {
        const { patient_id, provider_name, policy_number, coverage_amount, valid_from, valid_until, status } = req.body;
        const result = await pool.query(
            `INSERT INTO insurance_policies (patient_id, provider_name, policy_number, coverage_amount, valid_from, valid_until, status)
             VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
            [patient_id, provider_name, policy_number, coverage_amount, valid_from, valid_until, status]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.put('/insurance_policies/:id', async (req, res) => {
    try {
        const { patient_id, provider_name, policy_number, coverage_amount, valid_from, valid_until, status } = req.body;
        const result = await pool.query(
            `UPDATE insurance_policies SET patient_id=$1, provider_name=$2, policy_number=$3,
             coverage_amount=$4, valid_from=$5, valid_until=$6, status=$7 WHERE policy_id=$8 RETURNING *`,
            [patient_id, provider_name, policy_number, coverage_amount, valid_from, valid_until, status, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Insurance policy not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.delete('/insurance_policies/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM insurance_policies WHERE policy_id=$1 RETURNING *',
            [req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Insurance policy not found' });
        res.json({ message: 'Insurance policy deleted', policy: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
 
// bills
 
app.get('/bills', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM bills');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.post('/bills', async (req, res) => {
    try {
        const { patient_id, admission_id, total_amount, discount, tax_amount, status, generated_date, due_date, insurance_claim_id } = req.body;
        const result = await pool.query(
            `INSERT INTO bills (patient_id, admission_id, total_amount, discount, tax_amount, status, generated_date, due_date, insurance_claim_id)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
            [patient_id, admission_id, total_amount, discount, tax_amount, status, generated_date, due_date, insurance_claim_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.put('/bills/:id', async (req, res) => {
    try {
        const { patient_id, admission_id, total_amount, discount, tax_amount, status, generated_date, due_date, insurance_claim_id } = req.body;
        const result = await pool.query(
            `UPDATE bills SET patient_id=$1, admission_id=$2, total_amount=$3, discount=$4,
             tax_amount=$5, status=$6, generated_date=$7, due_date=$8, insurance_claim_id=$9
             WHERE bill_id=$10 RETURNING *`,
            [patient_id, admission_id, total_amount, discount, tax_amount, status, generated_date, due_date, insurance_claim_id, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Bill not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.delete('/bills/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM bills WHERE bill_id=$1 RETURNING *',
            [req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Bill not found' });
        res.json({ message: 'Bill deleted', bill: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
 
// payments
 
app.get('/payments', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM payments');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.post('/payments', async (req, res) => {
    try {
        const { bill_id, amount, payment_method, payment_date, transaction_ref, status } = req.body;
        const result = await pool.query(
            `INSERT INTO payments (bill_id, amount, payment_method, payment_date, transaction_ref, status)
             VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
            [bill_id, amount, payment_method, payment_date, transaction_ref, status]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.put('/payments/:id', async (req, res) => {
    try {
        const { bill_id, amount, payment_method, payment_date, transaction_ref, status } = req.body;
        const result = await pool.query(
            `UPDATE payments SET bill_id=$1, amount=$2, payment_method=$3,
             payment_date=$4, transaction_ref=$5, status=$6 WHERE payment_id=$7 RETURNING *`,
            [bill_id, amount, payment_method, payment_date, transaction_ref, status, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Payment not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.delete('/payments/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM payments WHERE payment_id=$1 RETURNING *',
            [req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Payment not found' });
        res.json({ message: 'Payment deleted', payment: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
 
// attendance
 
app.get('/attendance', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM attendance');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.post('/attendance', async (req, res) => {
    try {
        const { staff_type, staff_id, check_in, check_out, shift_date, status, overtime_hours } = req.body;
        const result = await pool.query(
            `INSERT INTO attendance (staff_type, staff_id, check_in, check_out, shift_date, status, overtime_hours)
             VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
            [staff_type, staff_id, check_in, check_out, shift_date, status, overtime_hours]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.put('/attendance/:id', async (req, res) => {
    try {
        const { staff_type, staff_id, check_in, check_out, shift_date, status, overtime_hours } = req.body;
        const result = await pool.query(
            `UPDATE attendance SET staff_type=$1, staff_id=$2, check_in=$3, check_out=$4,
             shift_date=$5, status=$6, overtime_hours=$7 WHERE attendance_id=$8 RETURNING *`,
            [staff_type, staff_id, check_in, check_out, shift_date, status, overtime_hours, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Attendance record not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
app.delete('/attendance/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM attendance WHERE attendance_id=$1 RETURNING *',
            [req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Attendance record not found' });
        res.json({ message: 'Attendance record deleted', attendance: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
 
 // analytical and statistical 
 app.get('/analytics/totalPatients', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) AS total_patients FROM patients');
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/analytics/totalDoctors', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) AS total_doctors FROM doctors');
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/analytics/totalAppointments', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) AS total_appointments FROM appointments');
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/analytics/totalMedicines', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) AS total_medicines FROM medicines');
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/analytics/totalRevenue', async (req, res) => {
    try {
        const result = await pool.query('SELECT COALESCE(SUM(amount),0) AS total_revenue FROM payments');
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/analytics/totalAdmissions', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) AS total_admissions FROM admissions');
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/analytics/appointmentStatus', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT status, COUNT(*) AS count
            FROM appointments
            GROUP BY status
            ORDER BY status
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/analytics/admissionStatus', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT status, COUNT(*) AS count
            FROM admissions
            GROUP BY status
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/analytics/billPaymentStatus', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT status, COUNT(*) AS count
            FROM bills
            GROUP BY status
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/analytics/medicineStockLevel', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT medicine_name, stock_quantity
            FROM medicines
            ORDER BY stock_quantity DESC
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/analytics/paymentOverTime', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                TO_CHAR(payment_date, 'Mon YYYY') AS month,
                SUM(amount) AS total_amount
            FROM payments
            GROUP BY DATE_TRUNC('month', payment_date),
                     TO_CHAR(payment_date, 'Mon YYYY')
            ORDER BY DATE_TRUNC('month', payment_date)
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/analytics/doctorsByDepartment', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                d.department_name,
                COUNT(doc.doctor_id) AS total_doctors
            FROM departments d
            LEFT JOIN doctors doc
            ON d.department_id = doc.department_id
            GROUP BY d.department_name
            ORDER BY d.department_name
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/analytics/bedAvailability', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT status, COUNT(*) AS beds
            FROM beds
            GROUP BY status
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/analytics/labTestResults', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT status, COUNT(*) AS total
            FROM lab_tests
            GROUP BY status
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/analytics/staffAttendanceStatus', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT status, COUNT(*) AS total
            FROM attendance
            GROUP BY status
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/analytics/insurancePolicyStatus', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT status, COUNT(*) AS total
            FROM insurance_policies
            GROUP BY status
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



app.use(express.static(path.join(__dirname, '../CLIENT')));

app.listen(3000,()=>{
    
    console.log('SERVER IS RUNNING ON PORT 3000');
});

