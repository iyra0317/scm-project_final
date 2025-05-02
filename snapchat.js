// Snapchat Style Resume Builder JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const filterOptions = document.querySelectorAll('.filter-option');
    const formGroups = document.querySelectorAll('.form-group');
    const generateBtn = document.querySelector('.generate-btn');
    const downloadBtn = document.querySelector('.download-btn');
    const shareBtn = document.querySelector('.share-btn');
    const previewContainer = document.querySelector('.preview-container');
    const addEducationBtn = document.querySelector('.add-education');
    const addExperienceBtn = document.querySelector('.add-experience');

    // Initialize form groups
    let currentFormGroup = 0;
    formGroups[currentFormGroup].classList.add('active');

    // Filter option click handler
    filterOptions.forEach((option, index) => {
        option.addEventListener('click', () => {
            // Remove active class from all form groups
            formGroups.forEach(group => group.classList.remove('active'));
            
            // Add active class to selected form group
            formGroups[index].classList.add('active');
            currentFormGroup = index;

            // Update filter option styles
            filterOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });

    // Add education section
    addEducationBtn.addEventListener('click', () => {
        const educationSection = document.querySelector('.education-section');
        const newEducation = createEducationElement();
        educationSection.appendChild(newEducation);
    });

    // Add experience section
    addExperienceBtn.addEventListener('click', () => {
        const experienceSection = document.querySelector('.experience-section');
        const newExperience = createExperienceElement();
        experienceSection.appendChild(newExperience);
    });

    // Generate resume
    generateBtn.addEventListener('click', () => {
        const resumeData = collectFormData();
        generateResumePreview(resumeData);
    });

    // Download resume
    downloadBtn.addEventListener('click', () => {
        const resumeData = collectFormData();
        downloadResume(resumeData);
    });

    // Share resume
    shareBtn.addEventListener('click', () => {
        const resumeData = collectFormData();
        shareResume(resumeData);
    });

    // Helper Functions
    function createEducationElement() {
        const div = document.createElement('div');
        div.className = 'education-item';
        div.innerHTML = `
            <div class="input-grid">
                <div class="input-group">
                    <span class="input-icon">🎓</span>
                    <input type="text" placeholder="School/University" required>
                </div>
                <div class="input-group">
                    <span class="input-icon">📅</span>
                    <input type="text" placeholder="Graduation Year" required>
                </div>
            </div>
            <div class="input-group">
                <span class="input-icon">📚</span>
                <input type="text" placeholder="Degree" required>
            </div>
            <div class="description-group">
                <span class="input-icon">📝</span>
                <textarea placeholder="Description"></textarea>
            </div>
        `;
        return div;
    }

    function createExperienceElement() {
        const div = document.createElement('div');
        div.className = 'experience-item';
        div.innerHTML = `
            <div class="input-grid">
                <div class="input-group">
                    <span class="input-icon">🏢</span>
                    <input type="text" placeholder="Company" required>
                </div>
                <div class="input-group">
                    <span class="input-icon">📅</span>
                    <input type="text" placeholder="Duration" required>
                </div>
            </div>
            <div class="input-group">
                <span class="input-icon">💼</span>
                <input type="text" placeholder="Position" required>
            </div>
            <div class="description-group">
                <span class="input-icon">📝</span>
                <textarea placeholder="Description"></textarea>
            </div>
        `;
        return div;
    }

    function collectFormData() {
        const form = document.getElementById('resumeForm');
        // Personal
        const name = form.name.value;
        const title = form.title.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const linkedin = form.linkedin.value;
        const github = form.github.value;
        const website = form.website.value;
        const bio = form.bio.value;
        // Education
        const education = [];
        form.querySelectorAll('.education-item').forEach(item => {
            education.push({
                school: item.querySelector('input[name="school[]"]').value,
                location: item.querySelector('input[name="eduLocation[]"]').value,
                duration: item.querySelector('input[name="eduDuration[]"]').value,
                degree: item.querySelector('input[name="degree[]"]').value,
                description: item.querySelector('textarea[name="eduDescription[]"]').value
            });
        });
        // Experience
        const experience = [];
        form.querySelectorAll('.experience-item').forEach(item => {
            experience.push({
                company: item.querySelector('input[name="company[]"]').value,
                location: item.querySelector('input[name="location[]"]').value,
                duration: item.querySelector('input[name="duration[]"]').value,
                position: item.querySelector('input[name="position[]"]').value,
                description: item.querySelector('textarea[name="description[]"]').value
            });
        });
        // Skills
        const skills = form.skills.value.split(',').map(s => s.trim()).filter(Boolean);
        // Achievements
        const achievements = form.achievements.value.split('\n').map(a => a.trim()).filter(Boolean);
        return { name, title, email, phone, linkedin, github, website, bio, education, experience, skills, achievements };
    }

    function generateResumePreview(data) {
        const avatarUrl = "https://cdn2.iconfinder.com/data/icons/2018-social-media-app-logos/1000/2018_social_media_popular_app_logo_snapchat-512.png";
        let html = `
        <div class="resume-card">
            <div class="resume-header">
                <div class="resume-account">
                    <img src="${avatarUrl}" class="resume-avatar">
                    <div>
                        <div class="resume-name">${data.name || ''}</div>
                        <div class="resume-title">${data.title || ''}</div>
                        <div class="resume-contact">
                            <span>${data.phone || ''}</span> | <span>${data.email || ''}</span>
                        </div>
                        <div class="resume-links">
                            ${data.linkedin ? `<a href="${data.linkedin}" target="_blank">LinkedIn</a> |` : ''}
                            ${data.github ? `<a href="${data.github}" target="_blank">GitHub</a> |` : ''}
                            ${data.website ? `<a href="${data.website}" target="_blank">Website</a>` : ''}
                        </div>
                    </div>
                </div>
                <div class="resume-bio">${data.bio || ''}</div>
            </div>
            <div class="resume-section">
                <h3>🎓 Education</h3>
                ${data.education.map(edu => `
                    <div>
                        <strong>${edu.degree || ''}</strong> - ${edu.school || ''}, ${edu.location || ''} <span>(${edu.duration || ''})</span>
                        <div>${(edu.description || '').replace(/\n/g, '<br>')}</div>
                    </div>
                `).join('')}
            </div>
            <div class="resume-section">
                <h3>💼 Experience</h3>
                ${data.experience.map(exp => `
                    <div>
                        <strong>${exp.position || ''}</strong> at ${exp.company || ''}, ${exp.location || ''} <span>(${exp.duration || ''})</span>
                        <div>${(exp.description || '').replace(/\n/g, '<br>')}</div>
                    </div>
                `).join('')}
            </div>
            <div class="resume-section">
                <h3>💪 Skills</h3>
                <div>${data.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join(' ')}</div>
            </div>
            <div class="resume-section">
                <h3>🏆 Achievements</h3>
                <ul>
                    ${data.achievements.map(a => `<li>${a}</li>`).join('')}
                </ul>
            </div>
        </div>
        `;
        document.getElementById('resumePreview').innerHTML = html;
    }

    function downloadResume(data) {
        // Implementation for downloading resume as PDF
        // This would typically involve using a library like html2pdf.js
        alert('Download functionality will be implemented with a PDF generation library');
    }

    function shareResume(data) {
        // Implementation for sharing resume
        // This could involve generating a shareable link or using social media APIs
        alert('Share functionality will be implemented with social media integration');
    }
});