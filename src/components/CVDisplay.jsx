export function PersonalInformationCV({fullName, email, phone}) {
    return (
        <div className="personalInformationCV">
            <div className="cvDisplayFullName">{fullName}</div>
            <div className="contactInfo">
                <div className="cvDisplayEmail">{email}</div>
                {phone ? <div className="contactInfoDivider">|</div> : null}
                <div className="cvDisplayPhone">{phone}</div>
            </div>
        </div>
    )
}

export function EducationInformationCV({school, fieldOfStudy, startDate, endDate}) {
    return (
        <div className="EducationInformationCV cvContainer">
            <h2 className="cvEducationHeader cvSectionHeader">EDUCATION</h2>
            <div className="cvEducationInfo">
                <div className="cvEducationFirstLine cvFirstLine">
                    <div className="cvDisplaySchoolName boldedText">{school}</div>
                    <div className="cvEducationDateDuration dateDuration">
                        <div className="cvDisplayStartDate">{startDate}</div>
                        {startDate && endDate ? <div className="cvEducationDateBetween">-</div> : null}
                        <div className="cvDisplayEndDate">{endDate}</div>
                    </div>
                </div>
                {fieldOfStudy ? <div className="cvDisplayFieldOfStudy">Major: {fieldOfStudy}</div> : null}
                
            </div>
        </div>
    )
}

export function ExperienceInformationCV({formData}) {
    return (
        <div className="ExperienceInformationCV cvContainer">
            <h2 className="cvExperienceHeader cvSectionHeader">EXPERIENCE</h2>
            {formData.map((exp, index) => <ExperienceInformationCVTemplate company={exp.company} positionTitle={exp.positionTitle}
                                    responsibilities={exp.responsibilities} startDate={exp.startDate} endDate={exp.endDate} key={index}/>)
            }
        </div>
    )
}

function ExperienceInformationCVTemplate({company, positionTitle, responsibilities, startDate, endDate}) {
    const responsibilitiesList = responsibilities.split("\n");

    return (
        <div className="cvExperienceInfo">
            <div className="cvExperienceFirstLine cvFirstLine">
                <div className="cvDisplayCompany boldedText">{company}</div>
                <div className="cvExperienceDateDuration dateDuration">
                    <div className="cvDisplayStartDate">{startDate}</div>
                    {startDate && endDate ? <div className="cvExperienceDateBetween">-</div> : null}
                    <div className="cvDisplayEndDate">{endDate}</div>
                </div>
            </div>
            <div className="cvDisplayPositionTitle"><em>{positionTitle}</em></div>
            <ul className="cvDisplayResponsibilities">
                {responsibilitiesList.filter((str) => str.length > 0)
                    .map((resp) => <li className={company + "Responsibility"}>{resp}</li>)
                }
            </ul>
        </div>
    )
}

