document.addEventListener('DOMContentLoaded', () => {
    const { jsPDF } = window.jspdf;

    const profilePic = document.getElementById('profilePic');
    const profilePicPreview = document.getElementById('profilePicPreview');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const githubInput = document.getElementById('github');
    const linkedinInput = document.getElementById('linkedin');
    const instagramInput = document.getElementById('instagram');
    const bioInput = document.getElementById('bio');
    const projectsInput = document.getElementById('projects');
    const achievementsInput = document.getElementById('achievements');
    const locationInput = document.getElementById('location');
    const experienceInput = document.getElementById('experience');
    const careerObjectiveInput = document.getElementById('careerObjective');
    const skillsInput = document.getElementById('skills');
    const resumeOutput = document.getElementById('resumeOutput');
    const generateResumeBtn = document.getElementById('generateResume');
    const downloadResumeBtn = document.getElementById('downloadResume');

    let profilePicData = '';

    profilePic.addEventListener('change', () => {
        const file = profilePic.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                profilePicPreview.src = reader.result;
                profilePicData = reader.result;
            };
            reader.readAsDataURL(file);
        }
    });

    generateResumeBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const github = githubInput.value.trim();
        const linkedin = linkedinInput.value.trim();
        const instagram = instagramInput.value.trim();
        const bio = bioInput.value.trim();
        const projects = projectsInput.value.trim();
        const achievements = achievementsInput.value.trim();
        const location = locationInput.value.trim();
        const experience = experienceInput.value.trim();
        const careerObjective = careerObjectiveInput.value.trim();
        const skills = skillsInput.value.trim();

        resumeOutput.style.display = 'block';
        resumeOutput.innerHTML = `
            <h2>${name}</h2>
            <img src="${profilePicData}" alt="Profile Picture" class="profile-pic">
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Location:</strong> ${location}</p>
            <p>${bio}</p>
            <h3>🎓 Academic Projects</h3>
            <p>${projects}</p>
            <h3>🏆 Achievements</h3>
            <p>${achievements}</p>
            <h3>💼 Work Experience</h3>
            <p>${experience}</p>
            <h3>🎯 Career Objective</h3>
            <p>${careerObjective}</p>
            <h3>🛠 Skills</h3>
            <p>${skills}</p>
            <div class="profile-links">
                <a href="${github}" target="_blank" class="profile-link">Follow on GitHub</a>
                <a href="${linkedin}" target="_blank" class="profile-link">Follow on LinkedIn</a>
                <a href="${instagram}" target="_blank" class="profile-link">Follow on Instagram</a>
            </div>
        `;
    });

    downloadResumeBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const bio = bioInput.value.trim();
        const projects = projectsInput.value.trim();
        const achievements = achievementsInput.value.trim();
        const location = locationInput.value.trim();
        const experience = experienceInput.value.trim();
        const careerObjective = careerObjectiveInput.value.trim();
        const skills = skillsInput.value.trim();
        const doc = new jsPDF();

        doc.setFontSize(12);
        if (profilePicData) {
            doc.addImage(profilePicData, 'JPEG', 10, 10, 30, 30);
        }
        doc.text(Name: ${name}, 50, 20);
        doc.text('Bio:', 10, 50);
        doc.text(bio, 10, 60);
        doc.text('Academic Projects:', 10, 90);
        doc.text(projects, 10, 100);
        doc.text('Achievements:', 10, 130);
        doc.text(achievements, 10, 140);
        doc.text('Location:', 10, 170);
        doc.text(location, 10, 180);
        doc.text('Work Experience:', 10, 210);
        doc.text(experience, 10, 220);
        doc.text('Career Objective:', 10, 250);
        doc.text(careerObjective, 10, 260);
        doc.text('Skills:', 10, 290);
        doc.text(skills, 10, 300);

        doc.save('resume.pdf');
    });
});