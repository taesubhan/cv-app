import {useState} from 'react';
import {personalInfoFields, educationInfoFields, experienceInfoFields} from './Template.js';
import {PersonalInformationInput, EducationInput, ExperienceInput} from './FormBox.jsx';
import {PersonalInformationCV, EducationInformationCV, ExperienceInformationCV} from './CVDisplay.jsx';

import '../styles/root.css';
import '../styles/formBox.css';
import '../styles/page.css';
import '../styles/cvDisplay.css';
import '../styles/animations.css';

function App() {
    const [personalInfo, setPersonalInfo] = useState(personalInfoFields());
    const [educationInfo, setEducationInfo] = useState(educationInfoFields());
    const [experienceInfo, setExperienceInfo] = useState([experienceInfoFields()]);

    return (
        <div className='container'>
            <div className='header'>
                <h1 className='headerTitle'>CV Builder!</h1>
            </div>
            <div className="body">
                <div className="formBoxContainer">
                    <PersonalInformationInput personalInfoData={personalInfo} setPersonalInfo={setPersonalInfo} />
                    <EducationInput educationInfoData={educationInfo} setEducationInfo={setEducationInfo} />
                    <ExperienceInput experienceInfoData={experienceInfo} setExperienceInfo={setExperienceInfo} />
                </div>
                <div className="cvDisplay">
                    <div className="cvOutline">
                        <PersonalInformationCV
                            fullName={personalInfo.fullName}
                            email={personalInfo.email}
                            phone={personalInfo.phone}
                        />
                        <EducationInformationCV
                            school={educationInfo.school}
                            fieldOfStudy={educationInfo.fieldOfStudy}
                            startDate={educationInfo.startDate}
                            endDate={educationInfo.endDate}
                        />
                        <ExperienceInformationCV
                            formData={experienceInfo}
                        />
                    </div>
                </div>
            </div>
            <div className="footer"></div>
        </div>
    )
}





export default App;