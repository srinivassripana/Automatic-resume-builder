// regex for validation
const strRegex = /^[a-zA-Z\s]*$/; // containing only letters
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
};

// user inputs elements
const {
    firstname: firstnameElem,
    middlename: middlenameElem,
    lastname: lastnameElem,
    image: imageElem,
    designation: designationElem,
    address: addressElem,
    email: emailElem,
    phoneno: phonenoElem,
    summary: summaryElem,
} = mainForm;

// display elements
const nameDsp = document.getElementById('fullname_dsp');
const imageDsp = document.getElementById('image_dsp');
const phonenoDsp = document.getElementById('phoneno_dsp');
const emailDsp = document.getElementById('email_dsp');
const addressDsp = document.getElementById('address_dsp');
const designationDsp = document.getElementById('designation_dsp');
const summaryDsp = document.getElementById('summary_dsp');
const projectsDsp = document.getElementById('projects_dsp');
const achievementsDsp = document.getElementById('achievements_dsp');
const skillsDsp = document.getElementById('skills_dsp');
const educationsDsp = document.getElementById('educations_dsp');
const experiencesDsp = document.getElementById('experiences_dsp');

// first value is for the attributes and second one passes the nodelists
const fetchValues = (attrs, ...nodeLists) => {
    return nodeLists[0].map((_, i) => {
        let dataObj = {};
        attrs.forEach((attr, j) => dataObj[attr] = nodeLists[j][i].value);
        return dataObj;
    });
};

const getUserInputs = () => {
    // achievements 
    const achievementsTitleElem = document.querySelectorAll('.achieve_title');
    const achievementsDescriptionElem = document.querySelectorAll('.achieve_description');

    // experiences
    const expTitleElem = document.querySelectorAll('.exp_title');
    const expOrganizationElem = document.querySelectorAll('.exp_organization');
    const expLocationElem = document.querySelectorAll('.exp_location');
    const expStartDateElem = document.querySelectorAll('.exp_start_date');
    const expEndDateElem = document.querySelectorAll('.exp_end_date');
    const expDescriptionElem = document.querySelectorAll('.exp_description');

    // education
    const eduSchoolElem = document.querySelectorAll('.edu_school');
    const eduDegreeElem = document.querySelectorAll('.edu_degree');
    const eduCityElem = document.querySelectorAll('.edu_city');
    const eduStartDateElem = document.querySelectorAll('.edu_start_date');
    const eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date');
    const eduDescriptionElem = document.querySelectorAll('.edu_description');

    const projTitleElem = document.querySelectorAll('.proj_title');
    const projLinkElem = document.querySelectorAll('.proj_link');
    const projDescriptionElem = document.querySelectorAll('.proj_description');

    const skillElem = document.querySelectorAll('.skill');

    // event listeners for form validation
    const addValidationListener = (elem, type, name) => {
        elem.addEventListener('keyup', e => validateFormData(e.target, type, name));
    };

    addValidationListener(firstnameElem, validType.TEXT, 'First Name');
    addValidationListener(middlenameElem, validType.TEXT_EMP, 'Middle Name');
    addValidationListener(lastnameElem, validType.TEXT, 'Last Name');
    addValidationListener(phonenoElem, validType.PHONENO, 'Phone Number');
    addValidationListener(emailElem, validType.EMAIL, 'Email');
    addValidationListener(addressElem, validType.ANY, 'Address');
    addValidationListener(designationElem, validType.TEXT, 'Designation');

    achievementsTitleElem.forEach(item => addValidationListener(item, validType.ANY, 'Title'));
    achievementsDescriptionElem.forEach(item => addValidationListener(item, validType.ANY, 'Description'));
    expTitleElem.forEach(item => addValidationListener(item, validType.ANY, 'Title'));
    expOrganizationElem.forEach(item => addValidationListener(item, validType.ANY, 'Organization'));
    expLocationElem.forEach(item => addValidationListener(item, validType.ANY, "Location"));
    expStartDateElem.forEach(item => item.addEventListener('blur', e => validateFormData(e.target, validType.ANY, 'Start Date')));
    expEndDateElem.forEach(item => addValidationListener(item, validType.ANY, 'End Date'));
    expDescriptionElem.forEach(item => addValidationListener(item, validType.ANY, 'Description'));
    eduSchoolElem.forEach(item => addValidationListener(item, validType.ANY, 'School'));
    eduDegreeElem.forEach(item => addValidationListener(item, validType.ANY, 'Degree'));
    eduCityElem.forEach(item => addValidationListener(item, validType.ANY, 'City'));
    eduStartDateElem.forEach(item => item.addEventListener('blur', e => validateFormData(e.target, validType.ANY, 'Start Date')));
    eduGraduationDateElem.forEach(item => item.addEventListener('blur', e => validateFormData(e.target, validType.ANY, 'Graduation Date')));
    eduDescriptionElem.forEach(item => addValidationListener(item, validType.ANY, 'Description'));
    projTitleElem.forEach(item => addValidationListener(item, validType.ANY, 'Title'));
    projLinkElem.forEach(item => addValidationListener(item, validType.ANY, 'Link'));
    projDescriptionElem.forEach(item => addValidationListener(item, validType.ANY, 'Description'));
    skillElem.forEach(item => addValidationListener(item, validType.ANY, 'Skill'));

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
    };
};

const validateFormData = (elem, elemType, elemName) => {
    const isValid = {
        [validType.TEXT]: () => strRegex.test(elem.value) && elem.value.trim().length > 0,
        [validType.TEXT_EMP]: () => strRegex.test(elem.value),
        [validType.EMAIL]: () => emailRegex.test(elem.value) && elem.value.trim().length > 0,
        [validType.PHONENO]: () => phoneRegex.test(elem.value) && elem.value.trim().length > 0,
        [validType.ANY]: () => elem.value.trim().length > 0
    }[elemType]();

    isValid ? removeErrMsg(elem) : addErrMsg(elem, elemName);
};

// adding the invalid text
const addErrMsg = (formElem, formElemName) => {
    formElem.nextElementSibling.innerHTML = `${formElemName} is invalid`;
};

// removing the invalid text 
const removeErrMsg = formElem => {
    formElem.nextElementSibling.innerHTML = "";
};

// show the list data
const showListData = (listData, listContainer) => {
    listContainer.innerHTML = "";
    listData.forEach(listItem => {
        const itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');
        
        Object.values(listItem).forEach(value => {
            const subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerHTML = value;
            itemElem.appendChild(subItemElem);
        });

        listContainer.appendChild(itemElem);
    });
};

const displayCV = userData => {
    nameDsp.innerHTML = `${userData.firstname} ${userData.middlename} ${userData.lastname}`;
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
};

// generate CV
const generateCV = () => {
    const userData = getUserInputs();
    displayCV(userData);
    console.log(userData);
};

const previewImage = () => {
    const oFReader = new FileReader();
    oFReader.readAsDataURL(imageElem.files[0]);
    oFReader.onload = ofEvent => {
        imageDsp.src = ofEvent.target.result;
    };
};

// print CV
const printCV = () => {
    window.print();
};
