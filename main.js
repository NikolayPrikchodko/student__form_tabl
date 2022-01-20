document.addEventListener('DOMContentLoaded', function () {

  const students = [
    { name: 'Иван Иванович Иванов', faculty: 'нейропсихологии', dateBirth: new Date('1990-08-25'), dateStart: new Date('2020-09-01') },
    { name: 'Петр Петрович Петров', faculty: 'прикладная физика', dateBirth: new Date('1989-02-21'), dateStart: new Date('2015-09-01') },
    { name: 'Иван Астахов Иванов', faculty: 'нейропсихологии', dateBirth: new Date('1990-08-25'), dateStart: new Date('2020-09-01') },
    { name: 'Евгений Евгеньевич Евгеньев', faculty: 'астронимия', dateBirth: new Date('1990-12-04'), dateStart: new Date('2017-09-01') },
    { name: 'Петр Матвиенко Петров', faculty: 'прикладная физика', dateBirth: new Date('1989-02-21'), dateStart: new Date('2015-09-01') },
    { name: 'Ян Янович Ян', faculty: 'ракетостроение', dateBirth: new Date('1990-04-13'), dateStart: new Date('2013-09-01') }
  ];

  const filters = {
  };

  const FILTER_NAMES = {
    FIO: 'fio',
    FACULTY: 'faculty',
    START_TRAINING: 'startTraining',
    FINISH_TRAINING: 'finishTraining'
  };

  console.log(1);

  function createAppTitle() {
    let appTitle = document.createElement('h1');
    appTitle.classList.add('text-center', 'mb-3');
    appTitle.innerHTML = 'База данных студентов';
    return appTitle;
  }

  console.log(2);

  function createStudentItemForm() {
    let tbodyForm = document.createElement('div');
    let form = document.createElement('form');
    let inputFio = document.createElement('input');
    let inputFaculty = document.createElement('input');
    let inputDateOfBirth = document.createElement('input');
    let inputStartOfTraining = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('form-search', 'mb-3');
    inputFio.classList.add('form-control');
    inputFio.id = 'itemsFio';
    inputFio.placeholder = 'Фамилия Имя Отчество';
    inputFio.setAttribute('required', 'required');
    inputFio.title = 'Введите Вашу Фамилию Имя и Отчество.';
    inputFaculty.classList.add('form-control');
    inputFaculty.id = 'itemsFaculty';
    inputFaculty.placeholder = 'Ваш факультет';
    inputFaculty.title = 'Введите названаие Вашего факультета.';
    inputFaculty.setAttribute('required', true);
    inputDateOfBirth.classList.add('form-control');
    inputDateOfBirth.id = 'itemsDateOfBirth';
    inputDateOfBirth.min = '1900-01-10';
    inputDateOfBirth.max = new Date().toISOString().split("T")[0];
    inputDateOfBirth.setAttribute('type', 'date');
    inputDateOfBirth.title = 'Введите дату Вашего рождения!';
    inputDateOfBirth.setAttribute('required', 'required');
    inputStartOfTraining.classList.add('form-control');
    inputStartOfTraining.id = 'itemsStartOfTraining';
    inputStartOfTraining.min = '2000-01-01';
    inputStartOfTraining.max = new Date().toISOString().split("T")[0];
    inputStartOfTraining.setAttribute('type', 'date');
    inputStartOfTraining.title = 'Введите дату начала обучения.';
    inputStartOfTraining.setAttribute('required', 'required');
    buttonWrapper.classList.add('input-group-append');
    button.id = 'add';
    button.type = 'submit';
    button.classList.add('btn', 'btn-primary', 'mt-3');
    button.textContent = 'Добавить студента';

    tbodyForm.append(form);
    form.append(inputFio);
    form.append(inputFaculty);
    form.append(inputDateOfBirth);
    form.append(inputStartOfTraining);
    form.append(buttonWrapper);
    buttonWrapper.append(button);

    button.addEventListener('click', function (e) {
      e.preventDefault();
      let newStudent = {};
      let rulesFio = inputFio.checkValidity();
      let rulesFaculty = inputFaculty.checkValidity();
      let rulesDateOfBirth = inputDateOfBirth.checkValidity();
      let rulesStartOfTraining = inputStartOfTraining.checkValidity();

      if (rulesFio === true) {
        newStudent.name = inputFio.value;
      } else {
        return;
      }

      if (rulesFaculty === true) {
        newStudent.faculty = inputFaculty.value;
      } else {
        return;
      }

      if (rulesDateOfBirth === true) {
        newStudent.dateBirth = inputDateOfBirth.value;
      } else {
        return;
      }

      if (rulesStartOfTraining === true) {
        newStudent.dateStart = inputStartOfTraining.value;
      } else {
        return;
      }

      students.push(newStudent);

      renderStudentsTable();
      inputFio.value = '';
      inputFaculty.value = '';
      inputDateOfBirth.value = '';
      inputStartOfTraining.value = '';

    });

    return tbodyForm;
  }

  console.log(3);

  function createStudentsFilterForm() {
    let heading = document.createElement('h2');
    let filterForm = document.createElement('form');
    let filterFio = document.createElement('input');
    let filterFaculty = document.createElement('input');
    let filterStartOfTraining = document.createElement('input');
    let filterEndOfTraining = document.createElement('input');

    heading.classList.add('text-center', 'mb-3');
    heading.innerHTML = 'Найти студента';
    filterForm.classList.add('form-search', 'mb-3');
    filterFio.classList.add('form-control');
    filterFio.id = 'searchFio';
    filterFio.placeholder = 'Найти студента по ФИО.';
    filterFaculty.classList.add('form-control');
    filterFaculty.id = 'searchFaculty';
    filterFaculty.placeholder = 'Наименование факультета.';
    filterStartOfTraining.classList.add('form-control');
    filterStartOfTraining.id = 'searchStartOfTraining';
    filterStartOfTraining.placeholder = 'Начало обучения.';
    filterEndOfTraining.classList.add('form-control', 'mb-3');
    filterEndOfTraining.id = 'searchEndtOfTraining';
    filterEndOfTraining.placeholder = 'Окончание обучения.';

    filterFio.addEventListener('input', () => {
      const fioFilter = filterFio.value;

      if (fioFilter.length >= 3) {
        filters[FILTER_NAMES.FIO] = fioFilter;
      } else {
        filters[FILTER_NAMES.FIO] = null;
      }

      renderStudentsTable();
    })

    filterFaculty.addEventListener('input', () => {
      const facultyFilter = filterFaculty.value;

      if (facultyFilter.length >= 3) {
        filters[FILTER_NAMES.FACULTY] = facultyFilter;
      } else {
        filters[FILTER_NAMES.FACULTY] = null;
      }

      renderStudentsTable();
    });

    filterStartOfTraining.addEventListener('input', () => {
      const startOfTrainingFilter = Number.parseInt(filterStartOfTraining.value);

      if (startOfTrainingFilter.toString().length >= 4) {
        filters[FILTER_NAMES.START_TRAINING] = startOfTrainingFilter;
      } else {
        filters[FILTER_NAMES.START_TRAINING] = null;
      }

      renderStudentsTable();
    });

    filterEndOfTraining.addEventListener('input', () => {
      const endOfTrainingFilter = Number.parseInt(filterEndOfTraining.value);

      if (endOfTrainingFilter.toString().length >= 4) {
        filters[FILTER_NAMES.FINISH_TRAINING] = endOfTrainingFilter;
      } else {
        filters[FILTER_NAMES.FINISH_TRAINING] = null;
      }

      renderStudentsTable();
    });

    filterForm.append(heading);
    filterForm.append(filterFio);
    filterForm.append(filterFaculty);
    filterForm.append(filterStartOfTraining);
    filterForm.append(filterEndOfTraining);

    return filterFio;
  }

  console.log(4);

  function createStudentsTable() {
    let tbody = document.createElement('div');
    let heading = document.createElement('h2');
    let table = document.createElement('table');
    let tableHead = document.createElement('thead');
    let tableBody = document.createElement('tbody');
    let trTableHead = document.createElement('tr');
    let thHeadFio = document.createElement('th');
    let btnFio = document.createElement('button');
    let iconFio = document.createElement('img');
    let thHeadFaculty = document.createElement('th');
    let btnFaculty = document.createElement('button');
    let iconFaculty = document.createElement('img');
    let thHeadDateOfBirth = document.createElement('th');
    let btnDateOfBirth = document.createElement('button');
    let iconDateOfBirth = document.createElement('img');
    let thHeadStartOfTraining = document.createElement('th');
    let btnStartOfTraining = document.createElement('button');
    let iconStartOfTraining = document.createElement('img');

    heading.classList.add('text-center', 'mb-3');
    heading.innerHTML = 'Таблица студентов';
    table.classList.add('table', 'table-bordered');
    table.id = 'table';
    tableHead.classList.add('table-dark');
    tableBody.classList.add('w-100');
    tableBody.id = 'table-body';
    trTableHead.classList.add('w-100', 'd-flex');
    thHeadFio.classList.add('w-50', 'text-center');
    btnFio.classList.add('btn');
    btnFio.id = 'btnFio';
    thHeadFaculty.classList.add('w-50', 'text-center');
    btnFaculty.classList.add('btn');
    btnFaculty.id = 'btnFaculty';
    thHeadDateOfBirth.classList.add('w-25', 'text-center');
    btnDateOfBirth.classList.add('btn');
    btnDateOfBirth.id = 'btnDateOfBirth';
    thHeadStartOfTraining.classList.add('w-50', 'text-center');
    btnStartOfTraining.classList.add('btn');
    btnStartOfTraining.id = 'btnStartOfTraining';
    thHeadFio.textContent = 'Ф.И.О.';
    btnFio.style.padding = '0 0 5px 5px';
    iconFio.src = 'arrow.png';
    iconFio.style.width = '20px';
    iconFio.style.height = '20px';
    thHeadFaculty.textContent = 'Наименование факультета';
    btnFaculty.style.padding = '0 0 5px 5px';
    iconFaculty.src = 'arrow.png';
    iconFaculty.style.width = '20px';
    iconFaculty.style.height = '20px';
    thHeadDateOfBirth.textContent = 'Дата рождения/возраст';
    btnDateOfBirth.style.padding = '0 0 5px 5px';
    iconDateOfBirth.src = 'arrow.png';
    iconDateOfBirth.style.width = '20px';
    iconDateOfBirth.style.height = '20px';
    thHeadStartOfTraining.textContent = 'Годы обучения';
    btnStartOfTraining.style.padding = '0 0 5px 5px';
    iconStartOfTraining.src = 'arrow.png';
    iconStartOfTraining.style.width = '20px';
    iconStartOfTraining.style.height = '20px';

    btnFio.addEventListener('click', () => {
      students.sort(function (a, b) {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      })
      renderStudentsTable();
    })

    btnFaculty.addEventListener('click', () => {
      students.sort(function (a, b) {
        if (a.faculty < b.faculty) { return -1; }
        if (a.faculty > b.faculty) { return 1; }
        return 0;
      })
      renderStudentsTable();
    })

    btnDateOfBirth.addEventListener('click', () => {
      students.sort(function (a, b) {
        if (a.dateBirth < b.dateBirth) { return -1; }
        if (a.dateBirth > b.dateBirth) { return 1; }
        return 0;
      })
      renderStudentsTable();
    })

    btnStartOfTraining.addEventListener('click', () => {
      students.sort(function (a, b) {
        if (a.dateStart < b.dateStart) { return -1; }
        if (a.dateStart > b.dateStart) { return 1; }
        return 0;
      })
      renderStudentsTable();
    })

    tbody.append(heading);
    tbody.append(table);
    table.append(tableHead);
    table.append(tableBody);
    tableHead.append(trTableHead);
    trTableHead.append(thHeadFio);
    thHeadFio.append(btnFio);
    btnFio.append(iconFio);
    trTableHead.append(thHeadFaculty);
    thHeadFaculty.append(btnFaculty);
    btnFaculty.append(iconFaculty);
    trTableHead.append(thHeadDateOfBirth);
    thHeadDateOfBirth.append(btnDateOfBirth);
    btnDateOfBirth.append(iconDateOfBirth);
    trTableHead.append(thHeadStartOfTraining);
    thHeadStartOfTraining.append(btnStartOfTraining);
    btnStartOfTraining.append(iconStartOfTraining);

    return tbody;
  }

  console.log(5);

  function createStudentItem(student) {
    let studentItem = document.createElement('tr');
    let thItemFio = document.createElement('td');
    let thItemFaculty = document.createElement('td');
    let thItemDateOfBirth = document.createElement('td');
    let thItemStartOfTraining = document.createElement('td');

    studentItem.classList.add('w-100', 'd-flex');
    thItemFio.classList.add('w-50', 'text-left');
    thItemFio.id = 'thItemFio';
    thItemFaculty.classList.add('w-50', 'text-center');
    thItemDateOfBirth.classList.add('w-25', 'text-center');
    thItemStartOfTraining.classList.add('w-50', 'text-center');

    let fio = student.name;
    let faculty = student.faculty;
    let dateBirth = student.dateBirth;
    let dateStart = student.dateStart;

    let options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }
    let timePresent = new Date();

    let birth = new Date(Date.parse(dateBirth));
    let year = birth.toLocaleString("ru", options);
    let age = timePresent.getFullYear() - birth.getFullYear();
    let ageOutput = `${year} (${age} лет)`;

    let start = new Date(Date.parse(dateStart));
    let beginStart = start.getFullYear();
    let course;
    if (beginStart + 4 >= timePresent.getFullYear()) {
      course = `${timePresent.getFullYear() - beginStart} курс`
    } else {
      course = `закончил(а)`;
    };
    let trainingData = `${beginStart} - ${beginStart + 4}(${course})`;

    thItemFio.innerHTML = fio;
    thItemFaculty.innerHTML = faculty;
    thItemDateOfBirth.innerHTML = ageOutput;
    thItemStartOfTraining.innerHTML = trainingData;

    studentItem.append(thItemFio);
    studentItem.append(thItemFaculty);
    studentItem.append(thItemDateOfBirth);
    studentItem.append(thItemStartOfTraining);

    return studentItem;
  }

  console.log(6);

  function renderStudentsTable() {

    let studentsTable = document.getElementById('table-body');

    studentsTable.innerHTML = "";

    const students = applyStudentFilters();

    for (let student of students) {
      let studentItem = createStudentItem(student);
      studentsTable.appendChild(studentItem);
    }
  }

  console.log(7);

  function applyStudentFilters() {

    let filteredStudents = students.slice();

    if (filters[FILTER_NAMES.FIO]) {
      filteredStudents = filterStudentsByFIO(filteredStudents, filters[FILTER_NAMES.FIO])
    } else if (filters[FILTER_NAMES.FACULTY]) {
      filteredStudents = filterStudentsByFaculty(filteredStudents, filters[FILTER_NAMES.FACULTY])
    } else if (filters[FILTER_NAMES.START_TRAINING]) {
      filteredStudents = filterStudentsByStartStudyingYear(filteredStudents, filters[FILTER_NAMES.START_TRAINING])
      console.log(filteredStudents);
    } else if (filters[FILTER_NAMES.FINISH_TRAINING]) {
      filteredStudents = filterStudentsByFinishStudyingYear(filteredStudents, filters[FILTER_NAMES.FINISH_TRAINING])
    }  

    return filteredStudents;
  }

  console.log("7_filter_0");

  function filterStudentsByFIO(students, fio) {
    return students.filter(student => student.name.includes(fio));
  }

  console.log("7_filter_1");

  function filterStudentsByFaculty(students, faculty) {
    return students.filter(student => student.faculty.includes(faculty));
  }

  console.log("7_filter_2");
  
  function filterStudentsByStartStudyingYear(students, startTraining) {     
    return students.filter(student => student.dateStart.getFullYear() === startTraining);
  }

  console.log("7_filter_3");

  function filterStudentsByFinishStudyingYear(students, finishTraining) {
    return students.filter(student => student.dateStart.getFullYear() + 4 === finishTraining );
  }

  console.log("7_filter_4");

  function createStudentListApp() {

    let container = document.getElementById('studentList');

    let appTitle = createAppTitle();
    let studentItemForm = createStudentItemForm();
    let studentsFilterForm = createStudentsFilterForm();
    let studentsTable = createStudentsTable();

    container.append(appTitle);
    container.append(studentItemForm);
    container.append(studentsFilterForm.form);
    container.append(studentsTable);    

    renderStudentsTable();
  }

  createStudentListApp();

  console.log(8);
})




