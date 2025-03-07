// resumeScript.js

// Load data from localStorage
const resumeData = JSON.parse(localStorage.getItem('resumeData'));

// Populate fields if data is available
if (resumeData) {
    document.getElementById('displayName').textContent = resumeData.name;
    document.getElementById('displayLocation').textContent = resumeData.location;
    document.getElementById('displayEmail').textContent = resumeData.email;
    document.getElementById('displayPhone').textContent = resumeData.phone;
    document.getElementById('displayLinkedIn').textContent = resumeData.linkedin;
    document.getElementById('displayGitHub').textContent = resumeData.github;

    document.getElementById('displayDegree').textContent = resumeData.degree;
    document.getElementById('displaySchool').textContent = resumeData.school;
    document.getElementById('displayGradDate').textContent = resumeData['grad-date'];

    document.getElementById('displaySkills').textContent = resumeData.skills;
    document.getElementById('displayTechSkills').textContent = resumeData['tech-skills'];

    document.getElementById('displayCompany').textContent = resumeData.company;
    document.getElementById('displayJobTitle').textContent = resumeData['job-title'];
    document.getElementById('displayDescription').textContent = resumeData.description;
}