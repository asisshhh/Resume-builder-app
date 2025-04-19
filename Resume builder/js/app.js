// regex for validation
const strRegex =  /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
/* supports following number formats - (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725 */
const digitRegex = /^\d+$/;

const mainForm = document.getElementById('cv-form');
const validType = {
    TEXT: 'text',
    TEXT_EMP: 'text_emp',
    EMAIL: 'email',
    DIGIT: 'digit',
    PHONENO: 'phoneno',
    ANY: 'any',
}

// user inputs elements
let firstnameElem = mainForm.firstname,
    middlenameElem = mainForm.middlename,
    lastnameElem = mainForm.lastname,
    imageElem = mainForm.image,
    designationElem = mainForm.designation,
    addressElem = mainForm.address,
    emailElem = mainForm.email,
    phonenoElem = mainForm.phoneno,
    summaryElem = mainForm.summary;

// display elements
let nameDsp = document.getElementById('fullname_dsp'),
    imageDsp = document.getElementById('image_dsp'),
    phonenoDsp = document.getElementById('phoneno_dsp'),
    emailDsp = document.getElementById('email_dsp'),
    addressDsp = document.getElementById('address_dsp'),
    designationDsp = document.getElementById('designation_dsp'),
    summaryDsp = document.getElementById('summary_dsp'),
    projectsDsp = document.getElementById('projects_dsp'),
    achievementsDsp = document.getElementById('achievements_dsp'),
    skillsDsp = document.getElementById('skills_dsp'),
    educationsDsp = document.getElementById('educations_dsp'),
    experiencesDsp = document.getElementById('experiences_dsp');

// first value is for the attributes and second one passes the nodelists
const fetchValues = (attrs, ...nodeLists) => {
    let elemsAttrsCount = nodeLists.length;
    let elemsDataCount = nodeLists[0].length;
    let tempDataArr = [];

    // first loop deals with the no of repeaters value
    for(let i = 0; i < elemsDataCount; i++){
        let dataObj = {}; // creating an empty object to fill the data
        // second loop fetches the data for each repeaters value or attributes 
        for(let j = 0; j < elemsAttrsCount; j++){
            // setting the key name for the object and fill it with data
            dataObj[`${attrs[j]}`] = nodeLists[j][i].value;
        }
        tempDataArr.push(dataObj);
    }

    return tempDataArr;
}

const getUserInputs = () => {

    // achivements 
    let achievementsTitleElem = document.querySelectorAll('.achieve_title'),
    achievementsDescriptionElem = document.querySelectorAll('.achieve_description');

    // experiences
    let expTitleElem = document.querySelectorAll('.exp_title'),
    expOrganizationElem = document.querySelectorAll('.exp_organization'),
    expLocationElem = document.querySelectorAll('.exp_location'),
    expStartDateElem = document.querySelectorAll('.exp_start_date'),
    expEndDateElem = document.querySelectorAll('.exp_end_date'),
    expDescriptionElem = document.querySelectorAll('.exp_description');

    // education
    let eduSchoolElem = document.querySelectorAll('.edu_school'),
    eduDegreeElem = document.querySelectorAll('.edu_degree'),
    eduCityElem = document.querySelectorAll('.edu_city'),
    eduStartDateElem = document.querySelectorAll('.edu_start_date'),
    eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date'),
    eduDescriptionElem = document.querySelectorAll('.edu_description');

    let projTitleElem = document.querySelectorAll('.proj_title'),
    projLinkElem = document.querySelectorAll('.proj_link'),
    projDescriptionElem = document.querySelectorAll('.proj_description');

    let skillElem = document.querySelectorAll('.skill');

    // event listeners for form validation
    firstnameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'First Name'));
    middlenameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT_EMP, 'Middle Name'));
    lastnameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Last Name'));
    phonenoElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.PHONENO, 'Phone Number'));
    emailElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.EMAIL, 'Email'));
    addressElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Address'));
    designationElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Designation'));

    achievementsTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    achievementsDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    expTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    expOrganizationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Organization')));
    expLocationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, "Location")));
    expStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'End Date')));
    expEndDateElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'End Date')));
    expDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    eduSchoolElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'School')));
    eduDegreeElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Degree')));
    eduCityElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'City')));
    eduStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Start Date')));
    eduGraduationDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Graduation Date')));
    eduDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    projTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    projLinkElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Link')));
    projDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    skillElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'skill')));

    return {
        firstname: firstnameElem.value,
        middlename: middlenameElem.value,
        lastname: lastnameElem.value,
        designation: designationElem.value,
        address: addressElem.value,
        email: emailElem.value,
        phoneno: phonenoElem.value,
        summary: summaryElem.value,
        achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem),
        experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
        educations: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
        projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
        skills: fetchValues(['skill'], skillElem)
    }
};

function validateFormData(elem, elemType, elemName){
    // checking for text string and non empty string
    if(elemType == validType.TEXT){
        if(!strRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for only text string
    if(elemType == validType.TEXT_EMP){
        if(!strRegex.test(elem.value)) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for email
    if(elemType == validType.EMAIL){
        if(!emailRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for phone number
    if(elemType == validType.PHONENO){
        if(!phoneRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for only empty
    if(elemType == validType.ANY){
        if(elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // Add trim to all text inputs
    elem.value = elem.value.trim();
    
    // Prevent XSS
    function sanitizeInput(input) {
        return input.replace(/[<>]/g, '');
    }
    
    elem.value = sanitizeInput(elem.value);
    
    // Add maxlength validation
    if (elem.value.length > 500) {
        addErrMsg(elem, `${elemName} is too long (maximum 500 characters)`);
        return false;
    }
    
    return true;
}

// adding the invalid text
function addErrMsg(formElem, formElemName){
    formElem.nextElementSibling.innerHTML = `${formElemName} is invalid`;
}

// removing the invalid text 
function removeErrMsg(formElem){
    formElem.nextElementSibling.innerHTML = "";
}

// show the list data
const showListData = (listData, listContainer) => {
    listContainer.innerHTML = "";
    listData.forEach(listItem => {
        let itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');
        
        for(const key in listItem){
            let subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerHTML = `${listItem[key]}`;
            itemElem.appendChild(subItemElem);
        }

        listContainer.appendChild(itemElem);
    })
}

const displayCV = (userData) => {
    nameDsp.innerHTML = userData.firstname + " " + userData.middlename + " " + userData.lastname;
    phonenoDsp.innerHTML = userData.phoneno;
    emailDsp.innerHTML = userData.email;
    addressDsp.innerHTML = userData.address;
    designationDsp.innerHTML = userData.designation;
    summaryDsp.innerHTML = userData.summary;
    showListData(userData.projects, projectsDsp);
    showListData(userData.achievements, achievementsDsp);
    showListData(userData.skills, skillsDsp);
    showListData(userData.educations, educationsDsp);
    showListData(userData.experiences, experiencesDsp);
}

// Update the validateDates function
function validateDates(startDate, endDate) {
    // If either date is empty, consider it valid
    if (!startDate || !endDate) return true;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Check if dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return true; // Skip invalid date formats
    }
    
    return end >= start;
}

// Update the generateCV function's date validation
const generateCV = () => {
    try {
        let userData = getUserInputs();
        
        // Validate required fields
        if (!userData.firstname || !userData.lastname || !userData.email) {
            alert('Please fill in all required fields (First Name, Last Name, and Email)');
            return;
        }
        
        // Validate dates in experiences
        let hasDateError = false;
        userData.experiences.forEach(exp => {
            if (!validateDates(exp.exp_start_date, exp.exp_end_date)) {
                hasDateError = true;
                alert(`Experience "${exp.exp_title}": End date cannot be earlier than start date`);
            }
        });
        
        // Validate dates in education
        userData.educations.forEach(edu => {
            if (!validateDates(edu.edu_start_date, edu.edu_graduation_date)) {
                hasDateError = true;
                alert(`Education at "${edu.edu_school}": Graduation date cannot be earlier than start date`);
            }
        });
        
        if (hasDateError) return;
        
        displayCV(userData);
        autoSave(); // Save after successful generation
    } catch (error) {
        console.error('Error generating CV:', error);
        alert('An error occurred while generating your CV. Please try again.');
    }
}

// Improve image preview function
function previewImage(){
    const file = imageElem.files[0];
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    
    if (!file) return;
    
    // Validate file type
    if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG)');
        imageElem.value = '';
        return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        imageElem.value = '';
        return;
    }
    
    let oFReader = new FileReader();
    oFReader.readAsDataURL(file);
    
    oFReader.onload = function(ofEvent){
        imageDsp.src = ofEvent.target.result;
    }
    
    oFReader.onerror = function(){
        alert('Error loading image');
        imageElem.value = '';
    }
}

// Improve print function
function printCV(){
    // Save current scroll position
    const scrollPos = window.scrollY;
    
    // Add print-specific styles
    const style = document.createElement('style');
    style.innerHTML = `
        @media print {
            body { margin: 0; padding: 0; }
            .preview-cnt { box-shadow: none; }
            .preview-image { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
            @page { margin: 0.5cm; }
        }
    `;
    document.head.appendChild(style);
    
    // Print
    window.print();
    
    // Remove print styles and restore scroll position
    setTimeout(() => {
        style.remove();
        window.scrollTo(0, scrollPos);
    }, 100);
}

// Update autoSave function with validation
function autoSave() {
    try {
        const formData = getUserInputs();
        
        // Basic validation before saving
        if (formData.firstname || formData.lastname || formData.email) {
            localStorage.setItem('resumeData', JSON.stringify(formData));
            console.log('Form data auto-saved');
        }
    } catch (error) {
        console.error('Error auto-saving form data:', error);
    }
}

// Load saved data
function loadSavedData() {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
        try {
            const formData = JSON.parse(savedData);
            // Populate form fields with saved data
            populateFormFields(formData);
            generateCV();
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    }
}

// Add auto-save event listeners
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('change', () => {
        autoSave();
    });
});

// Load saved data when page loads
document.addEventListener('DOMContentLoaded', loadSavedData);

// Add this function to populate form fields from saved data
function populateFormFields(formData) {
    // Populate basic information
    firstnameElem.value = formData.firstname || '';
    middlenameElem.value = formData.middlename || '';
    lastnameElem.value = formData.lastname || '';
    designationElem.value = formData.designation || '';
    addressElem.value = formData.address || '';
    emailElem.value = formData.email || '';
    phonenoElem.value = formData.phoneno || '';
    summaryElem.value = formData.summary || '';

    // Trigger the repeater plugin to create necessary fields
    // Achievements
    if (formData.achievements && formData.achievements.length > 0) {
        $('.repeater[data-repeater-list="group-a"]').repeater('setList', formData.achievements);
    }
    
    // Experiences
    if (formData.experiences && formData.experiences.length > 0) {
        $('.repeater[data-repeater-list="group-b"]').repeater('setList', formData.experiences);
    }
    
    // Education
    if (formData.educations && formData.educations.length > 0) {
        $('.repeater[data-repeater-list="group-c"]').repeater('setList', formData.educations);
    }
    
    // Projects
    if (formData.projects && formData.projects.length > 0) {
        $('.repeater[data-repeater-list="group-d"]').repeater('setList', formData.projects);
    }
    
    // Skills
    if (formData.skills && formData.skills.length > 0) {
        $('.repeater[data-repeater-list="group-e"]').repeater('setList', formData.skills);
    }
}