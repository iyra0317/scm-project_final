// WhatsApp Style Resume Builder JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const resumeForm = document.getElementById('resumeForm');
    const addEducationBtn = document.querySelector('.add-education');
    const addExperienceBtn = document.querySelector('.add-experience');
    const downloadBtn = document.getElementById('downloadBtn');
    const shareBtn = document.getElementById('shareBtn');
    const previewContainer = document.getElementById('resumePreview');

    // Add education section
    addEducationBtn.addEventListener('click', () => {
        const educationSection = document.getElementById('educationContainer');
        const newEducation = createEducationElement();
        educationSection.appendChild(newEducation);
    });

    // Add experience section
    addExperienceBtn.addEventListener('click', () => {
        const experienceSection = document.getElementById('experienceContainer');
        const newExperience = createExperienceElement();
        experienceSection.appendChild(newExperience);
    });

    // Form submit handler
    resumeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        generateResume();
    });

    // Generate resume
    function generateResume() {
        // Validate all form groups
        let isValid = true;
        const requiredInputs = resumeForm.querySelectorAll('input[required], textarea[required]');
        
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });

        if (!isValid) {
            alert('Please fill in all required fields before generating the resume.');
            return;
        }

        // Collect and generate resume
        const resumeData = collectFormData();
        generateResumePreview(resumeData);

        // Show preview section
        document.querySelector('.preview-section').style.display = 'block';
        
        // Scroll to preview section
        document.querySelector('.preview-section').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }

    // Download resume
    downloadBtn.addEventListener('click', () => {
        const element = document.querySelector('.whatsapp-resume');
        if (!element) {
            alert('Please generate the resume first before downloading.');
            return;
        }

        const opt = {
            margin: 1,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save();
    });

    // Share resume
    shareBtn.addEventListener('click', () => {
        const element = document.querySelector('.whatsapp-resume');
        if (!element) {
            alert('Please generate the resume first before sharing.');
            return;
        }
        alert('Share functionality will be implemented with social media integration');
    });

    // Helper Functions
    function createEducationElement() {
        const div = document.createElement('div');
        div.className = 'education-item';
        div.innerHTML = `
            <div class="input-group">
                <span class="input-icon">🎓</span>
                <input type="text" name="degree[]" placeholder="Degree" required>
            </div>
            <div class="input-group">
                <span class="input-icon">🏫</span>
                <input type="text" name="institution[]" placeholder="Institution" required>
            </div>
            <div class="input-group">
                <span class="input-icon">📍</span>
                <input type="text" name="location[]" placeholder="Location" required>
            </div>
            <div class="input-group">
                <span class="input-icon">📅</span>
                <input type="text" name="year[]" placeholder="Year" required>
            </div>
        `;
        return div;
    }

    function createExperienceElement() {
        const div = document.createElement('div');
        div.className = 'experience-item';
        div.innerHTML = `
            <div class="input-group">
                <span class="input-icon">🏢</span>
                <input type="text" name="company[]" placeholder="Company Name" required>
            </div>
            <div class="input-group">
                <span class="input-icon">👔</span>
                <input type="text" name="position[]" placeholder="Position" required>
            </div>
            <div class="input-group">
                <span class="input-icon">📍</span>
                <input type="text" name="location[]" placeholder="Location" required>
            </div>
            <div class="input-group">
                <span class="input-icon">📅</span>
                <input type="text" name="duration[]" placeholder="Duration" required>
            </div>
            <div class="input-group">
                <span class="input-icon">📋</span>
                <textarea name="description[]" placeholder="Job Description (one point per line)" required></textarea>
            </div>
        `;
        return div;
    }

    function collectFormData() {
        const formData = {
            personal: {
                name: document.querySelector('input[name="name"]').value,
                location: document.querySelector('input[name="location"]').value,
                email: document.querySelector('input[name="email"]').value,
                phone: document.querySelector('input[name="phone"]').value,
                linkedin: document.querySelector('input[name="linkedin"]').value,
                github: document.querySelector('input[name="github"]').value,
                website: document.querySelector('input[name="website"]').value,
                summary: document.querySelector('textarea[name="summary"]').value
            },
            education: [],
            experience: [],
            skills: {
                functional: document.querySelector('input[name="functionalSkills"]').value.split(',').map(skill => skill.trim()),
                technical: document.querySelector('input[name="technicalSkills"]').value.split(',').map(skill => skill.trim())
            },
            projects: document.querySelector('textarea[name="projects"]').value.split('\n').map(project => project.trim()),
            achievements: document.querySelector('textarea[name="achievements"]').value.split('\n').map(achievement => achievement.trim())
        };

        // Collect education data
        document.querySelectorAll('.education-item').forEach(item => {
            formData.education.push({
                degree: item.querySelector('input[name="degree[]"]').value,
                institution: item.querySelector('input[name="institution[]"]').value,
                location: item.querySelector('input[name="location[]"]').value,
                year: item.querySelector('input[name="year[]"]').value
            });
        });

        // Collect experience data
        document.querySelectorAll('.experience-item').forEach(item => {
            formData.experience.push({
                company: item.querySelector('input[name="company[]"]').value,
                position: item.querySelector('input[name="position[]"]').value,
                location: item.querySelector('input[name="location[]"]').value,
                duration: item.querySelector('input[name="duration[]"]').value,
                description: item.querySelector('textarea[name="description[]"]').value.split('\n')
            });
        });

        return formData;
    }

    function generateResumePreview(data) {
        if (!previewContainer) {
            console.error('Preview container not found');
            return;
        }

        let html = `
        <div class="whatsapp-resume">
            <div class="resume-left">
                <div class="resume-header">
                    <h2>${data.personal.name}</h2>
                    <div class="contact-info">
                        <span>📍 ${data.personal.location}</span>
                        <span>📧 ${data.personal.email}</span>
                        <span>📱 ${data.personal.phone}</span>
                    </div>
                    <div class="contact-info">
                        ${data.personal.linkedin ? `<span><i class='fab fa-linkedin'></i> ${data.personal.linkedin}</span>` : ''}
                        ${data.personal.github ? `<span><i class='fab fa-github'></i> ${data.personal.github}</span>` : ''}
                        ${data.personal.website ? `<span>🌐 ${data.personal.website}</span>` : ''}
                    </div>
                    <p>${data.personal.summary}</p>
                </div>
                <div class="resume-section">
                    <h3>Experience</h3>
                    ${data.experience.map(exp => `
                        <div>
                            <strong>${exp.company}</strong> - ${exp.position}<br>
                            <span>${exp.duration} | ${exp.location}</span>
                            <ul>
                                ${exp.description.map(point => point ? `<li>${point}</li>` : '').join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
                <div class="resume-section">
                    <h3>Academic Projects</h3>
                    <p>${data.projects.map(project => project.replace(/\n/g, '<br>')).join('')}</p>
                </div>
            </div>
            <div class="resume-right">
                <div class="resume-section">
                    <h3>Education</h3>
                    ${data.education.map(edu => `
                        <div>
                            <strong>${edu.degree}</strong><br>
                            <span>${edu.institution}, ${edu.location}</span><br>
                            <span>${edu.year}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="resume-section">
                    <h3>Technical Skills</h3>
                    ${data.skills.technical.filter(skill => skill).map(skill => `<span class='skill-badge'>${skill}</span>`).join('')}
                </div>
                <div class="resume-section">
                    <h3>Functional Skills</h3>
                    ${data.skills.functional.filter(skill => skill).map(skill => `<span class='skill-badge'>${skill}</span>`).join('')}
                </div>
                <div class="resume-section">
                    <h3>Achievements</h3>
                    <ul class="achievements-list">
                        ${data.achievements.filter(a => a).map(a => `<li>${a}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
        `;

        previewContainer.innerHTML = html;
    }
}); 