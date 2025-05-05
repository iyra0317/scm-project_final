// Flipkart Style Resume Builder JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navOptions = document.querySelectorAll('.nav-option');
    const formGroups = document.querySelectorAll('.form-group');
    const generateBtn = document.querySelector('.generate-btn');
    const downloadBtn = document.querySelector('.download-btn');
    const shareBtn = document.querySelector('.share-btn');
    const previewContainer = document.getElementById('resumePreview');
    const addEducationBtn = document.querySelector('.add-education');
    const addExperienceBtn = document.querySelector('.add-experience');

    // Initialize form groups
    let currentFormGroup = 0;
    formGroups[currentFormGroup].classList.add('active');
    navOptions[currentFormGroup].classList.add('active');

    // Navigation option click handler
    navOptions.forEach((option, index) => {
        option.addEventListener('click', () => {
            // Remove active class from all form groups
            formGroups.forEach(group => group.classList.remove('active'));
            // Add active class to selected form group
            formGroups[index].classList.add('active');
            currentFormGroup = index;
            // Update navigation option styles
            navOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });

    // Add education section
    if (addEducationBtn) {
        addEducationBtn.addEventListener('click', () => {
            const educationSection = document.querySelector('#educationContainer');
            const newEducation = createEducationElement();
            educationSection.appendChild(newEducation);
        });
    }

    // Add experience section
    if (addExperienceBtn) {
        addExperienceBtn.addEventListener('click', () => {
            const experienceSection = document.querySelector('#experienceContainer');
            const newExperience = createExperienceElement();
            experienceSection.appendChild(newExperience);
        });
    }

    // Generate resume on form submit
    const resumeForm = document.getElementById('resumeForm');
    resumeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Validate current form group
        const currentFormGroupEl = formGroups[currentFormGroup];
        const inputs = currentFormGroupEl.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        inputs.forEach(input => {
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
    });

    // Download resume as PDF
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            if (!previewContainer.innerHTML.trim()) {
                alert('Please generate the resume first before downloading.');
                return;
            }
            const opt = {
                margin: 0.5,
                filename: 'flipkart_resume.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf().set(opt).from(previewContainer).save();
        });
    }

    // Share resume (placeholder: copy link or show alert)
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            if (!previewContainer.innerHTML.trim()) {
                alert('Please generate the resume first before sharing.');
                return;
            }
            // Placeholder: Copy a fake shareable link to clipboard
            const fakeLink = window.location.href + '#flipkart-resume';
            navigator.clipboard.writeText(fakeLink).then(() => {
                alert('Shareable link copied to clipboard! (Demo)');
            }, () => {
                alert('Could not copy link.');
            });
        });
    }

    // Helpers for dynamic education/experience
    function createEducationElement() {
        const div = document.createElement('div');
        div.className = 'education-item';
        div.innerHTML = `
            <div class="input-grid">
                <div class="input-group">
                    <span class="input-icon"><i class="fa fa-graduation-cap"></i></span>
                    <input type="text" name="school[]" placeholder="School/University" required>
                </div>
                <div class="input-group">
                    <span class="input-icon"><i class="fa fa-map-marker-alt"></i></span>
                    <input type="text" name="eduLocation[]" placeholder="Location" required>
                </div>
                <div class="input-group">
                    <span class="input-icon"><i class="fa fa-calendar"></i></span>
                    <input type="text" name="eduDuration[]" placeholder="Duration (e.g., 2016 - 2020)" required>
                </div>
            </div>
            <div class="input-group">
                <span class="input-icon"><i class="fa fa-book"></i></span>
                <input type="text" name="degree[]" placeholder="Degree" required>
            </div>
            <div class="description-group">
                <span class="input-icon"><i class="fa fa-pencil-alt"></i></span>
                <textarea name="eduDescription[]" placeholder="Description (one point per line)" required></textarea>
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
                    <span class="input-icon"><i class="fa fa-building"></i></span>
                    <input type="text" name="company[]" placeholder="Company Name" required>
                </div>
                <div class="input-group">
                    <span class="input-icon"><i class="fa fa-map-marker-alt"></i></span>
                    <input type="text" name="location[]" placeholder="Location" required>
                </div>
                <div class="input-group">
                    <span class="input-icon"><i class="fa fa-calendar"></i></span>
                    <input type="text" name="duration[]" placeholder="Duration (e.g., Jan 2020 - Present)" required>
                </div>
            </div>
            <div class="input-group">
                <span class="input-icon"><i class="fa fa-briefcase"></i></span>
                <input type="text" name="position[]" placeholder="Position" required>
            </div>
            <div class="description-group">
                <span class="input-icon"><i class="fa fa-pencil-alt"></i></span>
                <textarea name="description[]" placeholder="Job Description (one point per line)" required></textarea>
            </div>
        `;
        return div;
    }

    // Collect all form data
    function collectFormData() {
        const formData = {
            personal: {},
            education: [],
            experience: [],
            skills: [],
            achievements: []
        };
        // Personal
        formData.personal.name = document.querySelector('input[name="name"]').value;
        formData.personal.title = document.querySelector('input[name="title"]').value;
        formData.personal.email = document.querySelector('input[name="email"]').value;
        formData.personal.phone = document.querySelector('input[name="phone"]').value;
        formData.personal.linkedin = document.querySelector('input[name="linkedin"]').value;
        formData.personal.website = document.querySelector('input[name="website"]').value;
        formData.personal.bio = document.querySelector('textarea[name="bio"]').value;
        // Education
        document.querySelectorAll('.education-item').forEach(item => {
            formData.education.push({
                school: item.querySelector('input[name="school[]"]').value,
                location: item.querySelector('input[name="eduLocation[]"]').value,
                duration: item.querySelector('input[name="eduDuration[]"]').value,
                degree: item.querySelector('input[name="degree[]"]').value,
                description: item.querySelector('textarea[name="eduDescription[]"]').value.split('\n')
            });
        });
        // Experience
        document.querySelectorAll('.experience-item').forEach(item => {
            formData.experience.push({
                company: item.querySelector('input[name="company[]"]').value,
                location: item.querySelector('input[name="location[]"]').value,
                duration: item.querySelector('input[name="duration[]"]').value,
                position: item.querySelector('input[name="position[]"]').value,
                description: item.querySelector('textarea[name="description[]"]').value.split('\n')
            });
        });
        // Skills
        formData.skills = document.querySelector('input[name="skills"]').value.split(',').map(s => s.trim()).filter(Boolean);
        // Achievements
        formData.achievements = document.querySelector('textarea[name="achievements"]').value.split('\n').filter(Boolean);
        return formData;
    }

    // Generate Flipkart-style resume preview
    function generateResumePreview(data) {
        // Helper for company logos (basic mapping, fallback to generic icon)
        function getCompanyLogo(company) {
            const logos = {
                'TESLA': 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg',
                'CAPGEMINI': 'https://upload.wikimedia.org/wikipedia/commons/9/99/Capgemini_201x_logo.svg',
                // Add more as needed
            };
            return logos[company.toUpperCase()] || 'https://img.icons8.com/ios-filled/50/2874f0/company.png';
        }
        // Helper for skill categories (split)
        function splitSkills(skills) {
            return {
                functional: skills.slice(0, 5),
                technical: skills.slice(5)
            };
        }
        const skillsSplit = splitSkills(data.skills);
        const html = `
        <div style="background: repeating-linear-gradient(135deg, #e3f0ff, #e3f0ff 20px, #f7fafc 20px, #f7fafc 40px); border-radius: 10px; box-shadow: 0 4px 24px rgba(40,116,240,0.10);">
            <div style="background: var(--flipkart-blue); color: #fff; border-radius: 10px 10px 0 0; display: flex; align-items: center; padding: 0.7rem 2rem; gap: 1.5rem;">
                <img src="https://e7.pngegg.com/pngimages/946/191/png-clipart-flipkart-e-commerce-logo-bangalore-chief-executive-others-miscellaneous-blue-thumbnail.png" alt="Flipkart Logo" style="width:38px;height:38px;">
                <span style="font-size:1.3rem;font-weight:700;letter-spacing:1px;">Flipkart Resume Preview</span>
                <div style="flex:1;"></div>
                <div style="background:#fff;border-radius:6px;padding:0.2rem 1rem;display:flex;align-items:center;gap:0.5rem;">
                    <i class="fa fa-search" style="color:var(--flipkart-blue);"></i>
                    <input type="text" placeholder="Search for skills, companies..." style="border:none;outline:none;background:transparent;font-size:1rem;color:var(--flipkart-blue);width:180px;">
                </div>
                <span style="margin-left:1.5rem;"><i class="fa fa-shopping-cart" style="font-size:1.3rem;color:var(--flipkart-yellow);"></i></span>
            </div>
            <div class="flipkart-resume-main">
                <div class="flipkart-resume-left">
                    <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;">
                        <img src="https://e7.pngegg.com/pngimages/946/191/png-clipart-flipkart-e-commerce-logo-bangalore-chief-executive-others-miscellaneous-blue-thumbnail.png" alt="Flipkart Logo" style="width:48px;height:48px;">
                        <span class="resume-badge" style="background:var(--flipkart-blue);color:#fff;font-size:1.1rem;">Flipkart Assured Resume</span>
                    </div>
                    <div class="resume-contact-block">
                        <div class="resume-contact-row">
                            <span><i class="fa fa-envelope"></i> ${data.personal.email}</span>
                            <span><i class="fa fa-phone"></i> ${data.personal.phone}</span>
                            <span><i class="fa fa-linkedin"></i> <a href="${data.personal.linkedin}" target="_blank">LinkedIn</a></span>
                            <span><i class="fa fa-globe"></i> <a href="${data.personal.website}" target="_blank">Website</a></span>
                        </div>
                    </div>
                    <div class="resume-main-info">
                        <h1 class="resume-name">${data.personal.name} <i class="fa fa-user-circle" style="color:var(--flipkart-yellow);"></i></h1>
                        <div class="resume-badge-row">
                            <span class="resume-badge">Brand: Candidate</span>
                            <span class="resume-rating"><i class="fa fa-star"></i> 4.8/5</span>
                            <span class="resume-answers"><i class="fa fa-comment-dots"></i> 1000+ reviews</span>
                        </div>
                        <div class="resume-flipkart-links">
                            <span class="resume-flipkart-link">Flipkart Assured <span class="for-hire">for "hire"</span></span>
                            <span class="resume-flipkart-link" style="background: var(--flipkart-yellow); color: var(--flipkart-blue);"><i class="fa fa-coins"></i> SuperCoin Eligible</span>
                            <span class="resume-flipkart-link" style="background: #fff; color: var(--flipkart-blue); border: 1.5px solid var(--flipkart-blue);"><i class="fa fa-bolt"></i> Fast Delivery</span>
                        </div>
                    </div>
                    <div class="resume-description-block">
                        <h2><i class="fa fa-info-circle" style="color:var(--flipkart-blue);"></i> Description:</h2>
                        <p>${data.personal.bio}</p>
                    </div>
                    <div class="resume-section-block">
                        <h2><i class="fa fa-briefcase" style="color:var(--flipkart-blue);"></i> Work Experience</h2>
                        ${data.experience.map(exp => `
                            <div class="resume-work-item">
                                <div class="resume-work-header">
                                    <img src="${getCompanyLogo(exp.company)}" class="resume-company-logo" alt="${exp.company}">
                                    <div>
                                        <span class="resume-work-company">${exp.company}</span>
                                        <span class="resume-work-title">${exp.position}</span>
                                        <span class="resume-work-location"><i class="fa fa-map-marker-alt"></i> ${exp.location}</span>
                                        <span class="resume-work-duration"><i class="fa fa-calendar"></i> ${exp.duration}</span>
                                    </div>
                                </div>
                                <ul class="resume-work-desc">
                                    ${exp.description.filter(Boolean).map(point => <li><i class='fa fa-check-circle' style='color:var(--flipkart-blue);margin-right:4px;'></i>${point}</li>).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="flipkart-resume-right">
                    <div class="resume-education-block">
                        <h3><i class="fa fa-graduation-cap" style="color:var(--flipkart-blue);"></i> EDUCATION:</h3>
                        ${data.education.map(edu => `
                            <div class="resume-edu-item">
                                <div class="resume-edu-degree">${edu.degree}</div>
                                <div class="resume-edu-school">${edu.school}</div>
                                <div class="resume-edu-location"><i class="fa fa-map-marker-alt"></i> ${edu.location}</div>
                                <div class="resume-edu-duration"><i class="fa fa-calendar"></i> ${edu.duration}</div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="resume-skills-block">
                        <h3><i class="fa fa-lightbulb" style="color:var(--flipkart-yellow);"></i> Skills:</h3>
                        <div class="resume-skills-category">
                            <span class="skills-label">Functional Skills:</span>
                            <ul>
                                ${skillsSplit.functional.map(skill => <li><i class='fa fa-check' style='color:var(--flipkart-blue);margin-right:4px;'></i>${skill}</li>).join('')}
                            </ul>
                        </div>
                        <div class="resume-skills-category">
                            <span class="skills-label">Technical Skills:</span>
                            <ul>
                                ${skillsSplit.technical.map(skill => <li><i class='fa fa-cogs' style='color:var(--flipkart-yellow);margin-right:4px;'></i>${skill}</li>).join('')}
                            </ul>
                        </div>
                    </div>
                    <div class="resume-achievements-block">
                        <h3><i class="fa fa-trophy" style="color:var(--flipkart-yellow);"></i> ACHIEVEMENTS</h3>
                        <ul>
                            ${data.achievements.filter(Boolean).map(a => <li><i class='fa fa-star' style='color:var(--flipkart-blue);margin-right:4px;'></i>${a}</li>).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        `;
        previewContainer.innerHTML = html;
    }
});