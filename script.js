// Array to store student objects
let studentsArray = [];

// DOM elements
const studentForm = document.querySelector('.student-form');
const addBtn = document.getElementById('addStudentBtn');
const searchInput = document.getElementById('searchInput');
const studentTableBody = document.getElementById('studentTableBody');

// Add event listener to the add student button
addBtn.addEventListener('click', function (event) {
  event.preventDefault();
  addStudent();
});

// Function to add a student
function addStudent() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const gpa = document.getElementById('gpa').value;
  const age = document.getElementById('age').value;
  const degree = document.getElementById('degree').value;

  // Form validation
  if (!name || !email || !gpa || !age || !degree) {
    alert('Please fill in all fields');
    return;
  }

  // Create a new student object
  const student = {
    ID: studentsArray.length + 1,
    name: name,
    email: email,
    gpa: gpa,
    age: age,
    degree: degree
  };

  // Add the student to the array
  studentsArray.push(student);

  // Clear the form inputs
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('gpa').value = '';
  document.getElementById('age').value = '';
  document.getElementById('degree').value = '';

  // Render the updated students table
  renderStudentsTable();
}


// Function to render the students table
function renderStudentsTable() {
  studentTableBody.innerHTML = '';

  // Filter students based on search input
  const searchTerm = searchInput.value.toLowerCase();
  const filteredStudents = studentsArray.filter(function (student) {
    return (
      student.name.toLowerCase().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm) ||
      student.degree.toLowerCase().includes(searchTerm)
    );
  });

  // Iterate over the filtered students and create table rows
  filteredStudents.forEach(function (student) {
    const row = document.createElement('tr');

    // Create table cells for each student property
    const idCell = createTableCell(student.ID);
    const nameCell = createTableCell(student.name);
    const emailCell = createTableCell(student.email);
    const ageCell = createTableCell(student.age);
    const gpaCell = createTableCell(student.gpa);
    const degreeCell = createTableCell(student.degree);

    // Create edit icon
    const editIcon = document.createElement('i');
    editIcon.classList.add('fas', 'fa-edit', 'edit-icon');
    editIcon.addEventListener('click', function () {
      fillFormInputs(student);
    });

    // Create delete icon
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-icon');
    deleteIcon.addEventListener('click', function () {
      deleteStudent(student);
    });

    // Append edit and delete icons to the degree cell
    degreeCell.appendChild(editIcon);
    degreeCell.appendChild(deleteIcon);

    // Append cells to the row
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(emailCell);
    row.appendChild(ageCell);
    row.appendChild(gpaCell);
    row.appendChild(degreeCell);

    // Append the row to the table body
    studentTableBody.appendChild(row);
  });
}


// Function to create a table cell
function createTableCell(value) {
  const cell = document.createElement('td');
  cell.textContent = value;
  return cell;
}

// Function to delete a student
function deleteStudent(student) {
  const studentIndex = studentsArray.findIndex(function (item) {
    return item.ID === student.ID;
  });

  if (studentIndex !== -1) {
    studentsArray.splice(studentIndex, 1);
    renderStudentsTable();
  }
}

// Function to fill form inputs with student data for editing
function fillFormInputs(student) {
  document.getElementById('name').value = student.name;
  document.getElementById('email').value = student.email;
  document.getElementById('gpa').value = student.gpa;
  document.getElementById('age').value = student.age;
  document.getElementById('degree').value = student.degree;
  addBtn.textContent = 'Edit Student';
  addBtn.removeEventListener('click', addStudent);
  addBtn.addEventListener('click', function (event) {
    event.preventDefault();
    editStudent(student);
  });
}

// Function to edit a student
function editStudent(student) {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const gpa = document.getElementById('gpa').value;
  const age = document.getElementById('age').value;
  const degree = document.getElementById('degree').value;

  student.name = name;
  student.email = email;
  student.gpa = gpa;
  student.age = age;
  student.degree = degree;

  // Clear the form inputs and reset button text
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('gpa').value = '';
  document.getElementById('age').value = '';
  document.getElementById('degree').value = '';
  addBtn.textContent = 'Add Student';

  // Render the updated students table
  renderStudentsTable();
}

// Add event listener to the search input
searchInput.addEventListener('input', renderStudentsTable);

// Initial rendering of the students table
renderStudentsTable();
