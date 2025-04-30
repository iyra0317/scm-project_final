document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('resumeForm');
    const preview = document.getElementById('resumePreview');
    const downloadBtn = document.getElementById('downloadBtn');
    const shareBtn = document.getElementById('shareBtn');

    // Add experience button functionality
    document.querySelector('.add-experience').addEventListener('click', function() {
        const container = document.getElementById('experienceContainer');
        const newExperience = document.createElement('div');
        newExperience.className = 'experience-item';
        newExperience.innerHTML = `
            <input type="text" name="company[]" placeholder="Company Name" class="company" required>
            <input type="text" name="position[]" placeholder="Position" class="position" required>
            <input type="text" name="location[]" placeholder="Location" class="location" required>
            <input type="text" name="duration[]" placeholder="Duration (e.g., Aug 2019 - Apr 2020)" class="duration" required>
            <textarea name="description[]" placeholder="Job Description (one point per line)" class="description" required></textarea>
            <button type="button" class="remove-experience">Remove</button>
        `;
        container.appendChild(newExperience);
    });

    // Add education button functionality
    document.querySelector('.add-education').addEventListener('click', function() {
        const container = document.getElementById('educationContainer');
        const newEducation = document.createElement('div');
        newEducation.className = 'education-item';
        newEducation.innerHTML = `
            <input type="text" name="degree[]" placeholder="Degree" class="degree" required>
            <input type="text" name="institution[]" placeholder="Institution" class="institution" required>
            <input type="text" name="location[]" placeholder="Location" class="location" required>
            <input type="text" name="year[]" placeholder="Year" class="year" required>
            <button type="button" class="remove-education">Remove</button>
        `;
        container.appendChild(newEducation);
    });

    // Remove experience/education functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-experience')) {
            e.target.parentElement.remove();
        }
        if (e.target.classList.contains('remove-education')) {
            e.target.parentElement.remove();
        }
    });

    // Form submission and preview generation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        generatePreview();
    });

    function generatePreview() {
        const formData = new FormData(form);
        const resumeData = {
            name: formData.get('name'),
            location: formData.get('location'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            linkedin: formData.get('linkedin'),
            github: formData.get('github'),
            website: formData.get('website'),
            summary: formData.get('summary'),
            functionalSkills: formData.get('functionalSkills'),
            technicalSkills: formData.get('technicalSkills'),
            projects: formData.get('projects'),
            achievements: formData.get('achievements').split('\n'),
            experiences: [],
            education: []
        };

        // Get experiences
        const companies = formData.getAll('company[]');
        const positions = formData.getAll('position[]');
        const locations = formData.getAll('location[]');
        const durations = formData.getAll('duration[]');
        const descriptions = formData.getAll('description[]');

        for (let i = 0; i < companies.length; i++) {
            resumeData.experiences.push({
                company: companies[i],
                position: positions[i],
                location: locations[i],
                duration: durations[i],
                description: descriptions[i].split('\n')
            });
        }

        // Get education
        const degrees = formData.getAll('degree[]');
        const institutions = formData.getAll('institution[]');
        const eduLocations = formData.getAll('location[]');
        const years = formData.getAll('year[]');

        for (let i = 0; i < degrees.length; i++) {
            resumeData.education.push({
                degree: degrees[i],
                institution: institutions[i],
                location: eduLocations[i],
                year: years[i]
            });
        }

        // Generate HTML preview
        let html = `
            <div class="resume-container">
                <header class="header">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo" class="logo">
                    <div class="contact-info">
                        <span>${resumeData.location}</span> | 
                        <a href="mailto:${resumeData.email}">${resumeData.email}</a> | 
                        <a href="tel:${resumeData.phone}">${resumeData.phone}</a> | 
                        <a href="${resumeData.linkedin}">LinkedIn</a> |
                        <a href="${resumeData.github}">GitHub</a> |
                        <a href="${resumeData.website}">Website</a>
                    </div>
                </header>

                <section class="main-info">
                    <h1 class="name">${resumeData.name}</h1>
                    <p class="tagline">#1 in Applicants Today</p>
                    <p class="summary">${resumeData.summary}</p>
                </section>

                <section class="education">
                    <h2>EDUCATION:</h2>
        `;

        resumeData.education.forEach(edu => {
            html += `
                <div class="education-item">
                    <h3>${edu.degree}</h3>
                    <p>${edu.institution} • ${edu.location} • ${edu.year}</p>
                </div>
            `;
        });

        html += `
                </section>

                <section class="skills">
                    <h2>SKILLS:</h2>
                    <div class="skills-list">
                        <div class="skill-category">
                            <h3>Functional Skills</h3>
                            <p>${resumeData.functionalSkills}</p>
                        </div>
                        <div class="skill-category">
                            <h3>Technical Skills</h3>
                            <p>${resumeData.technicalSkills}</p>
                        </div>
                    </div>
                </section>

                <section class="experience">
                    <h2>Work Experience</h2>
        `;

        resumeData.experiences.forEach(exp => {
            html += `
                <div class="job">
                    <h3>${exp.company}</h3>
                    <p>${exp.position} • ${exp.location} • ${exp.duration}</p>
                    <ul>
            `;
            exp.description.forEach(point => {
                if (point.trim()) {
                    html += <li>${point}</li>;
                }
            });
            html += `
                    </ul>
                </div>
            `;
        });

        html += `
                </section>

                <section class="projects-achievements">
                    <div class="projects">
                        <h3>Academic Projects</h3>
                        <p>${resumeData.projects}</p>
                    </div>
                    <div class="achievements">
                        <h3>Achievements</h3>
                        <ul>
        `;

        resumeData.achievements.forEach(achievement => {
            if (achievement.trim()) {
                html += <li>${achievement}</li>;
            }
        });

        html += `
                        </ul>
                    </div>
                </section>
            </div>
        `;

        preview.innerHTML = html;
    }

    // Download PDF functionality
    downloadBtn.addEventListener('click', function() {
        const element = document.getElementById('resumePreview');
        
        // Create a temporary container for PDF generation
        const container = document.createElement('div');
        container.style.cssText = `
            background-color: white;
            color: black;
            padding: 20mm;
            width: 210mm;
            min-height: 297mm;
            font-family: 'Netflix Sans', Arial, sans-serif;
        `;
        
        // Clone the content
        const content = element.cloneNode(true);
        
        // Add PDF-specific styles
        const style = document.createElement('style');
        style.textContent = `
            @media print {
                body {
                    background: white;
                }
                
                h1, h2, h3 {
                    color: #e50914 !important;
                }
                
                .contact-info a {
                    color: black;
                    text-decoration: underline;
                }
                
                .tagline {
                    color: #666;
                }
                
                .job, .education-item {
                    border-bottom: 1px solid #ddd;
                }
                
                ul li::before {
                    color: #e50914;
                }
            }
        `;
        
        container.appendChild(style);
        container.appendChild(content);
        
        // Configure PDF options
        const opt = {
            margin: 0,
            filename: 'netflix-resume.pdf',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                logging: true,
                letterRendering: true,
                allowTaint: true
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait',
                compress: true
            }
        };

        // Generate and download PDF
        html2pdf().set(opt).from(container).save()
            .then(() => {
                // Remove temporary container
                document.body.removeChild(container);
                
                // Show success message
                alert('PDF downloaded successfully!');
            })
            .catch(err => {
                console.error('Error generating PDF:', err);
                document.body.removeChild(container);
                alert('Error generating PDF. Please try again.');
            });
    });

    // Share functionality
    shareBtn.addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: 'My Netflix-Style Resume',
                text: 'Check out my Netflix-style resume!',
                url: window.location.href
            })
            .catch(error => console.log('Error sharing:', error));
        } else {
            alert('Sharing is not supported in your browser');
        }
    });
});