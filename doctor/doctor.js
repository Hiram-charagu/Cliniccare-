// Doctor Portal JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize portal
    initializePortal();
    
    // Navigation functionality
    initializeNavigation();
    
    // Logout functionality
    initializeLogout();
    
    // Load user data
    loadUserData();
});

function initializePortal() {
    // Check authentication
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!user.email || user.role !== 'doctor') {
        window.location.href = '../login.html';
        return;
    }
    
    console.log('Doctor portal initialized for:', user.email);
}

function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.dataset.section;
            
            // Remove active class from all nav items and sections
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked nav item and target section
            this.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
        });
    });
}

function initializeLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('isLoggedIn');
            window.location.href = '../login.html';
        });
    }
}

function loadUserData() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userName = document.getElementById('userName');
    
    if (userName && user.firstName && user.lastName) {
        userName.textContent = `Dr. ${user.firstName} ${user.lastName}`;
    }
}

// Schedule management
function addAppointment() {
    alert('Add appointment functionality would be implemented here');
}

function startConsultation(appointmentId) {
    alert(`Starting consultation for appointment ${appointmentId} - functionality would be implemented here`);
}

// Patient management
function viewPatient(patientId) {
    alert(`Viewing patient ${patientId} - functionality would be implemented here`);
}

function schedulePatientAppointment(patientId) {
    alert(`Scheduling appointment for patient ${patientId} - functionality would be implemented here`);
}

// Consultation management
function newConsultation() {
    alert('New consultation functionality would be implemented here');
}

function editConsultationNotes(consultationId) {
    alert(`Editing notes for consultation ${consultationId} - functionality would be implemented here`);
}

function printConsultationReport(consultationId) {
    alert(`Printing report for consultation ${consultationId} - functionality would be implemented here`);
}

// Prescription management
function newPrescription() {
    alert('New prescription functionality would be implemented here');
}

function editPrescription(prescriptionId) {
    alert(`Editing prescription ${prescriptionId} - functionality would be implemented here`);
}

function printPrescription(prescriptionId) {
    alert(`Printing prescription ${prescriptionId} - functionality would be implemented here`);
}

function refillPrescription(prescriptionId) {
    alert(`Refilling prescription ${prescriptionId} - functionality would be implemented here`);
}

// Profile management
function updateProfile() {
    alert('Profile update functionality would be implemented here');
}