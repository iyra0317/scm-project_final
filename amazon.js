// Amazon Style Resume Builder JavaScript
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
    addEducationBtn.addEventListener('click', () => {
        const educationSection = document.querySelector('#educationContainer');
        const newEducation = createEducationElement();
        educationSection.appendChild(newEducation);
    });

    // Add experience section
    addExperienceBtn.addEventListener('click', () => {
        const experienceSection = document.querySelector('#experienceContainer');
        const newExperience = createExperienceElement();
        experienceSection.appendChild(newExperience);
    });

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

    // Download resume
    downloadBtn.addEventListener('click', () => {
        const previewContent = document.querySelector('.preview-container').innerHTML;
        if (!previewContent) {
            alert('Please generate the resume first before downloading.');
            return;
        }
        const resumeData = collectFormData();
        downloadResume(resumeData);
    });

    // Share resume
    shareBtn.addEventListener('click', () => {
        const previewContent = document.querySelector('.preview-container').innerHTML;
        if (!previewContent) {
            alert('Please generate the resume first before sharing.');
            return;
        }
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
                    <input type="text" name="school[]" placeholder="School/University" required>
                </div>
                <div class="input-group">
                    <span class="input-icon">📍</span>
                    <input type="text" name="eduLocation[]" placeholder="Location" required>
                </div>
                <div class="input-group">
                    <span class="input-icon">📅</span>
                    <input type="text" name="eduDuration[]" placeholder="Duration (e.g., 2016 - 2020)" required>
                </div>
            </div>
            <div class="input-group">
                <span class="input-icon">📚</span>
                <input type="text" name="degree[]" placeholder="Degree" required>
            </div>
            <div class="description-group">
                <span class="input-icon">📝</span>
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
                    <span class="input-icon">🏢</span>
                    <input type="text" name="company[]" placeholder="Company Name" required>
                </div>
                <div class="input-group">
                    <span class="input-icon">📍</span>
                    <input type="text" name="location[]" placeholder="Location" required>
                </div>
                <div class="input-group">
                    <span class="input-icon">📅</span>
                    <input type="text" name="duration[]" placeholder="Duration (e.g., Jan 2020 - Present)" required>
                </div>
            </div>
            <div class="input-group">
                <span class="input-icon">💼</span>
                <input type="text" name="position[]" placeholder="Position" required>
            </div>
            <div class="description-group">
                <span class="input-icon">📝</span>
                <textarea name="description[]" placeholder="Job Description (one point per line)" required></textarea>
            </div>
        `;
        return div;
    }

    function collectFormData() {
        const formData = {
            personal: {
                name: document.querySelector('input[name="name"]').value,
                title: document.querySelector('input[name="title"]').value,
                email: document.querySelector('input[name="email"]').value,
                phone: document.querySelector('input[name="phone"]').value,
                linkedin: document.querySelector('input[name="linkedin"]').value,
                github: document.querySelector('input[name="github"]').value,
                website: document.querySelector('input[name="website"]').value,
                bio: document.querySelector('textarea[name="bio"]').value
            },
            education: [],
            experience: [],
            skills: document.querySelector('input[name="skills"]').value.split(',').map(skill => skill.trim()),
            achievements: document.querySelector('textarea[name="achievements"]').value.split('\n').map(achievement => achievement.trim())
        };

        // Collect education data
        document.querySelectorAll('.education-item').forEach(item => {
            formData.education.push({
                school: item.querySelector('input[name="school[]"]').value,
                location: item.querySelector('input[name="eduLocation[]"]').value,
                duration: item.querySelector('input[name="eduDuration[]"]').value,
                degree: item.querySelector('input[name="degree[]"]').value,
                description: item.querySelector('textarea[name="eduDescription[]"]').value.split('\n')
            });
        });

        // Collect experience data
        document.querySelectorAll('.experience-item').forEach(item => {
            formData.experience.push({
                company: item.querySelector('input[name="company[]"]').value,
                location: item.querySelector('input[name="location[]"]').value,
                duration: item.querySelector('input[name="duration[]"]').value,
                position: item.querySelector('input[name="position[]"]').value,
                description: item.querySelector('textarea[name="description[]"]').value.split('\n')
            });
        });

        return formData;
    }

    function generateResumePreview(data) {
        // Helper for company logos (basic mapping, fallback to generic icon)
        function getCompanyLogo(company) {
            const logos = {
                'TESLA': 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg',
                'CAPGEMINI': 'https://upload.wikimedia.org/wikipedia/commons/9/99/Capgemini_201x_logo.svg',
                // Add more as needed
            };
            return logos[company.toUpperCase()] || 'https://img.icons8.com/ios-filled/50/000000/company.png';
        }

        // Helper for skill categories (very basic split)
        function splitSkills(skills) {
            // Example: first 5 as Functional, next as Technical
            return {
                functional: skills.slice(0, 5),
                technical: skills.slice(5)
            };
        }
        const skillsSplit = splitSkills(data.skills);

        let html = `
        <div class="amazon-resume-screenshot-style">
            <div class="amazon-topbar">
                <div class="amazon-bar-left">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" class="amazon-logo-bar" alt="Amazon Logo">
                    <span class="amazon-location"><i class="fa fa-map-marker"></i> Dallas, Texas</span>
                </div>
                <div class="amazon-bar-center">
                    <input class="amazon-search-bar" type="text" value="what does a good employee look like?" readonly>
                    <button class="amazon-search-btn"><i class="fa fa-search"></i></button>
                </div>
                <div class="amazon-bar-right">
                    <span class="amazon-bar-link">Hello, ${data.personal.name.split(' ')[0] || 'User'}</span>
                    <span class="amazon-bar-link">Account & Lists</span>
                    <span class="amazon-bar-link">Returns & Orders</span>
                    <span class="amazon-bar-link"><i class="fa fa-shopping-cart"></i> Cart</span>
                </div>
            </div>
            <div class="amazon-resume-main">
                <div class="amazon-resume-left">
                    <div class="resume-contact-block">
                        <div class="resume-contact-row">
                            <span><i class="fa fa-map-marker"></i> Dallas, Texas</span>
                            <span><i class="fa fa-envelope"></i> ${data.personal.email}</span>
                            <span><i class="fa fa-phone"></i> ${data.personal.phone}</span>
                        </div>
                        <div class="resume-contact-row">
                            ${data.personal.linkedin ? `<span><i class='fa fa-linkedin'></i> <a href='${data.personal.linkedin}' target='_blank'>LinkedIn</a></span>` : ''}
                            ${data.personal.github ? `<span><i class='fa fa-github'></i> <a href='${data.personal.github}' target='_blank'>GitHub</a></span>` : ''}
                            ${data.personal.website ? `<span><i class='fa fa-globe'></i> <a href='${data.personal.website}' target='_blank'>Website</a></span>` : ''}
                        </div>
                    </div>
                    <div class="resume-main-info">
                        <h1 class="resume-name">${data.personal.name}</h1>
                        <div class="resume-badge-row">
                            <span class="resume-badge">Brand: Candidate</span>
                            <span class="resume-rating"><i class="fa fa-star"></i> 4.1/5</span>
                            <span class="resume-answers">1000+ answered questions</span>
                        </div>
                        <div class="resume-amazon-links">
                            <span class="resume-amazon-link">Amazon's Choice <span class="for-hire">for "hire"</span></span>
                            <span class="resume-climate">Climate Pledge Friendly</span>
                        </div>
                        <div class="resume-price-row">
                            <span class="resume-price-old">List Price: <s>$999999999.99</s></span>
                            <span class="resume-price-new">Add to cart for pricing information</span>
                        </div>
                        <div class="resume-stock-row">
                            <span class="resume-stock">Only 1 left in stock - order soon</span>
                        </div>
                    </div>
                    <div class="resume-description-block">
                        <h2>Description:</h2>
                        <p>${data.personal.bio}</p>
                    </div>
                    <div class="resume-section-block">
                        <h2>Work Experience</h2>
                        ${data.experience.map(exp => `
                            <div class="resume-work-item">
                                <div class="resume-work-header">
                                    <img src="${getCompanyLogo(exp.company)}" class="resume-company-logo" alt="${exp.company}">
                                    <div>
                                        <span class="resume-work-company">${exp.company}</span>
                                        <span class="resume-work-title">${exp.position}</span>
                                        <span class="resume-work-location">${exp.location}</span>
                                        <span class="resume-work-duration">${exp.duration}</span>
                                    </div>
                                </div>
                                <ul class="resume-work-desc">
                                    ${exp.description.filter(Boolean).map(point => `<li>${point}</li>`).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="amazon-resume-right">
                    <div class="resume-instock-box">
                        <span class="instock-green">In Stock</span>
                        <div class="instock-qty">Qty: <select><option>1</option></select></div>
                    </div>
                    <div class="resume-education-block">
                        <h3>EDUCATION:</h3>
                        ${data.education.map(edu => `
                            <div class="resume-edu-item">
                                <div class="resume-edu-degree">${edu.degree}</div>
                                <div class="resume-edu-school">${edu.school}</div>
                                <div class="resume-edu-location">${edu.location}</div>
                                <div class="resume-edu-duration">${edu.duration}</div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="resume-skills-block">
                        <h3>Skills:</h3>
                        <div class="resume-skills-category">
                            <span class="skills-label">Functional Skills:</span>
                            <ul>
                                ${skillsSplit.functional.map(skill => `<li>${skill}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="resume-skills-category">
                            <span class="skills-label">Technical Skills:</span>
                            <ul>
                                ${skillsSplit.technical.map(skill => `<li>${skill}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    <div class="resume-achievements-block">
                        <h3>ACHIEVEMENTS</h3>
                        <ul>
                            ${data.achievements.filter(Boolean).map(a => `<li>${a}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        `;
        previewContainer.innerHTML = html;
    }

    function downloadResume(data) {
        const element = document.getElementById('resumePreview');
        if (!element || !element.innerHTML.trim()) {
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
    }

    function shareResume(data) {
        // Implementation for sharing resume
        // This could involve generating a shareable link or using social media APIs
        alert('Share functionality will be implemented with social media integration');
    }
}); 