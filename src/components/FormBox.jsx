import {useState} from 'react'
import {experienceInfoFields} from './Template.js';
import trashCan from '../assets/trash-can.svg';
import chevronUp from '../assets/chevron-up.svg';
import chevronDown from '../assets/chevron-down.svg';
// import plusSign from '../assets/plus.svg';


export function PersonalInformationInput({personalInfoData, setPersonalInfo}) {
    return (<InputBox 
            inputType="personalInformation" 
            inputTitle="Personal Information" 
            InputDialogComponent={PersonalInfoDialog}
            inputValue={personalInfoData} 
            setInputValue={setPersonalInfo} />)
}

export function EducationInput({educationInfoData, setEducationInfo}) {
    return (<InputBox 
            inputType="education" 
            inputTitle="Education" 
            InputDialogComponent={EducationDialog} 
            inputValue={educationInfoData}
            setInputValue={setEducationInfo} />)
    }

export function ExperienceInput({experienceInfoData, setExperienceInfo}) {
    return (<InputBox 
            inputType="experience" 
            inputTitle="Experience" 
            InputDialogComponent={ExperienceDialog} 
            inputValue={experienceInfoData}
            setInputValue={setExperienceInfo} />)
}

function InputBox({inputType, inputTitle, InputDialogComponent, inputValue, setInputValue}) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={inputType + " " + "InputContainer"} >
            <div className={inputType + "Header" + " InputHeader"}>
                <h1 className={inputType + "Title" + " " + "inputTitle"}>{inputTitle}</h1>
                <OpenInputButton classText={inputType + "Edit"} isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
            <InputDialogComponent isOpen={isOpen} inputValue={inputValue} setInputValue={setInputValue} />
        </div>
    )
}

function OpenInputButton({classText, isOpen, setIsOpen}) {
    return (
        <img src={isOpen ? chevronUp : chevronDown} className={classText + ' ' + 'chevronArrow'} onClick={() => setIsOpen(!isOpen)} />
    )
}

function PersonalInfoDialog({isOpen, inputValue, setInputValue}) {
    return <InputForm isOpen={isOpen} inputValue={inputValue} setInputValue={setInputValue} InputTemplate={PersonalInfoInputForm} />
}

function EducationDialog({isOpen, inputValue, setInputValue}) {
    return <InputForm isOpen={isOpen} inputValue={inputValue} setInputValue={setInputValue} InputTemplate={EducationInputForm} />
}

function ExperienceDialog({isOpen, inputValue, setInputValue}) {
    return <InputForm isOpen={isOpen} inputValue={inputValue} setInputValue={setInputValue} InputTemplate={ExperienceInputForm} />
}

function copyObject(objData) {
    if (Array.isArray(objData)) {
        return objData.map((obj) => ({...obj}))
    } else {
        return {...objData}
    }
}

function InputForm({isOpen, inputValue, setInputValue, InputTemplate}) {
    // Created a new state to update just the input values on the left side of screen (not effect the CV portion)
    const [formData, setFormData] = useState(copyObject(inputValue));

    const handleChange = (e) => {
        const {name, value} = e.target;
        const index = parseInt(e.target.getAttribute('index'));
        const copiedFormData = copyObject(formData)

        // If index exist then it is an Experience input
        if (index >= 0) {
            copiedFormData[index][name]=value;
        } else {
            copiedFormData[name]=value;
        }

        setFormData(copiedFormData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setInputValue(copyObject(formData));
    }

    return (
        <InputTemplate isOpen={isOpen} formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} setInputValue={setInputValue}/>
    )
}

function PersonalInfoInputForm({isOpen, formData, handleChange, handleSubmit}) {
    const visible = isOpen ? " visible" : ""
    return (
        <div className={"personalInformationDialog dialogContainer" + visible} hidden={!isOpen}>
            <form action="" className="personalInformationForm inputForm" onSubmit={handleSubmit}>
                <div className="fullNameInputContainer inputContainer">
                    <label htmlFor="fullNameInput" className="questionLabel">Full Name: </label>
                    <input type="text" name="fullName" id="fullNameInput" className="responseInput" value={formData.fullName} onChange={handleChange} />
                </div>
                <div className="emailInputContainer inputContainer">
                    <label htmlFor="emailInput" className="questionLabel">Email: </label>
                    <input type="email" name="email" id="emailInput" className="responseInput" value={formData.email} onChange={handleChange} />
                </div>
                <div className="phoneInputContainer inputContainer">
                    <label htmlFor="phoneInput" className="questionLabel">Phone: </label>
                    <input type="tel" name="phone" id="phoneInput" className="responseInput" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="submitInput">
                    <button className="submitButton">Submit</button>
                </div>
            </form>
        </div>
    )
}

function EducationInputForm({isOpen, formData, handleChange, handleSubmit}) {
    const visible = isOpen ? " visible" : ""
    return (
        <div className={"educationDialog dialogContainer" + visible} hidden={!isOpen}>
            <form action="" className="educationForm inputForm" onSubmit={handleSubmit}>
                <div className="schoolNameInputContainer inputContainer">
                    <label htmlFor="schoolNameInput" className="questionLabel">Educational Institute: </label>
                    <input type="text" name="school" id="schoolNameInput" className="responseInput" value={formData.school} onChange={handleChange} />
                </div>

                <div className="fieldOfStudyInputContainer inputContainer">
                    <label htmlFor="fieldOfStudyInput" className="questionLabel">Field of Study: </label>
                    <input type="text" name="fieldOfStudy" id="fieldOfStudyInput" className="responseInput" value={formData.fieldOfStudy} onChange={handleChange} />
                </div>

                <div className="educationDuration inputContainer dateInputContainer">
                    <div className="educationStartDateContainer inputContainer">
                        <label htmlFor="educationStartDate" className="questionLabel">Start Date: </label>
                        <input type="date" name="startDate" id="educationStartDate" className="responseInput" value={formData.startDate} onChange={handleChange} />
                    </div>
                    <div className="educationEndDateContainer inputContainer">
                        <label htmlFor="educationEndDate" className="questionLabel">End Date: </label>
                        <input type="date" name="endDate" id="educationEndDate" className="responseInput" value={formData.endDate} onChange={handleChange} />
                    </div>
                </div>

                <div className="submitInput">
                    <button className="submitButton">Submit</button>
                </div>
            </form>
        </div>
    )
}

function ExperienceInputForm({isOpen, formData, handleChange, handleSubmit, setInputValue}) {
    const handleRemove = (e) => {
        const index = parseInt(e.target.getAttribute('index'));
        formData.splice(index, 1);
        setInputValue([...formData]);
    }

    const experienceList = formData.map((exp, index) => <ExperienceSegments key={index} formData={exp} handleChange={handleChange} index={index} handleRemove={handleRemove} />)
    // Add an extra empty Experience input box
    const addExperience = () => {
        formData.push(experienceInfoFields());
        setInputValue([...formData]);
    }

    const visible = isOpen ? " visible" : ""
    
    return (
        <div className={"experienceDialog" + visible} hidden={!isOpen}>
            <form action="" className="experienceForm inputForm" onSubmit={handleSubmit}>
                {experienceList}
                <div className="addExperience submitInput experienceBtns">
                    <button type='button' className="addExperienceBtn" onClick={addExperience}>Add Experience</button>
                    {/* <img src={plusSign} alt="" className="addExperienceBtn clickable" onClick={addExperience} /> */}
                    <button className="submitButton">Submit</button>
                </div>
            </form>
        </div>
    )
}

function ExperienceSegments({formData, handleChange, handleRemove, index}) {
    
    return (
        <div className={formData.company + ' ' + 'inputList' } index={index}>
            <div className="companyNameInputContainer inputContainer">
                <label htmlFor="companyNameInput" className="questionLabel">Name of Company: </label>
                <input type="text" id="companyNameInput" className="responseInput" index={index} name="company" value={formData.company} onChange={handleChange} />
            </div>

            <div className="positionTitleInputContainer inputContainer">
                <label htmlFor="positionTitleInput" className="questionLabel">Position Title: </label>
                <input type="text" id="positionTitleInput" className="responseInput" index={index} name="positionTitle" value={formData.positionTitle} onChange={handleChange} />
            </div>

            <div className="jobResponsibilitiesInputContainer inputContainer">
                <label htmlFor="jobResponsibilitiesInput" className="questionLabel">Responsibilites (Split each responsibility with a new line): </label>
                <textarea id="jobResponsibilitiesInput" className="responseInput" index={index} name="responsibilities" value={formData.responsibilities} onChange={handleChange} ></textarea>
            </div>

            <div className="experienceDuration inputContainer dateInputContainer">
                <div className="experienceStartDateContainer inputContainer">
                    <label htmlFor="experienceStartDate" className="questionLabel">Start Date: </label>
                    <input type="date" index={index} name="startDate" className="responseInput" value={formData.startDate} onChange={handleChange} />
                </div>
                <div className="experienceEndDateContainer inputContainer">
                    <label htmlFor="experienceEndDate" className="questionLabel">End Date: </label>
                    <input type="date" index={index} name="endDate" className="responseInput" value={formData.endDate} onChange={handleChange} />
                </div>
            </div>
            <div className="removeExperience">
                <img src={trashCan} index={index} className="removeExperienceBtn clickable" onClick={handleRemove} />
                {/* <button type='button' index={index} className="removeExperience" onClick={handleRemove}>Remove</button> */}
            </div>
            

            
        </div>
    )
}

