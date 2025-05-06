let profileImageDataUrl = "https://randomuser.me/api/portraits/men/32.jpg"; // default image

document.getElementById('profileimg').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      profileImageDataUrl = e.target.result;
      updatePreview();
    };
    reader.readAsDataURL(file);
  }
});

function splitLines(text) {
  return text.split('\n').filter(line => line.trim() !== '');
}
function makeList(items) {
  return '<ul>' + items.map(i => `<li>${i}</li>`).join('') + '</ul>';
}
function updatePreview() {
  // Get form values
  const name = document.getElementById('name').value;
  const title = document.getElementById('title').value;
  const location = document.getElementById('location').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const linkedin = document.getElementById('linkedin').value;
  const github = document.getElementById('github').value;
  const website = document.getElementById('website').value;
  const about = document.getElementById('about').value;
  const experience = splitLines(document.getElementById('experience').value);
  const education = splitLines(document.getElementById('education').value);
  const projects = splitLines(document.getElementById('projects').value);
  const achievements = splitLines(document.getElementById('achievements').value);
  const fskills = document.getElementById('fskills').value.split(',').map(s => s.trim()).filter(s => s);
  const tskills = document.getElementById('tskills').value.split(',').map(s => s.trim()).filter(s => s);

  // Format experience
  const expList = experience.map(e => {
    // "Job Title | Company | Location | Dates - Description"
    const [main, desc] = e.split(' - ');
    const [jobTitle, company, loc, dates] = main.split('|').map(x => x ? x.trim() : '');
    return `
      <div class="google-job">
        <div class="google-job-header">
          <span class="google-job-title">${jobTitle || ''}</span>
          <span class="google-job-company">${company ? ' @ ' + company : ''}</span>
          <span class="google-job-location">${loc || ''}</span>
          <span class="google-job-dates">${dates || ''}</span>
        </div>
        <ul><li>${desc || ''}</li></ul>
      </div>
    `;
  });

  // Format education
  const eduList = education.map(e => {
    // "School | Degree / Year / Location"
    const [main, rest] = e.split('|').map(x => x ? x.trim() : '');
    const [degree, year, loc] = (rest || '').split('/').map(x => x ? x.trim() : '');
    return `
      <div class="google-edu">
        <span class="google-edu-degree">${degree || ''}</span>
        <span class="google-edu-school">${main ? ' @ ' + main : ''}</span>
        <span class="google-edu-location">${loc || ''}</span>
        <span class="google-edu-date">${year || ''}</span>
      </div>
    `;
  });

  // Format projects
  const projList = projects.map(p => {
    const [title, ...details] = p.split(' - ');
    return `<div class="google-project">
      <span class="google-project-title">${title}</span>
      <ul><li>${details.join(' - ')}</li></ul>
    </div>`;
  });

  // Build preview HTML
  document.getElementById('resumePreview').innerHTML = `
    <div class="google-search-bar">
      <span class="google-logo">G</span>
      <input type="text" value="${name} resume" readonly>
    </div>
    <div class="google-main-content">
      <div class="google-main-left">
        <div class="google-section">
          <h2>WORK EXPERIENCE</h2>
          ${expList.join('')}
        </div>
        <div class="google-section">
          <h2>EDUCATION</h2>
          ${eduList.join('')}
        </div>
        <div class="google-section">
          <h2>ACADEMIC PROJECTS</h2>
          ${projList.join('')}
        </div>
        <div class="google-section">
          <h2>ACHIEVEMENTS</h2>
          ${makeList(achievements)}
        </div>
        <div class="google-section">
          <h2>SKILLS</h2>
          <div class="google-skills">
            <span class="google-skill-label">Functional Skills:</span>
            <span>${fskills.join(', ')}</span>
          </div>
          <div class="google-skills">
            <span class="google-skill-label">Technical Skills:</span>
            <span>${tskills.join(', ')}</span>
          </div>
        </div>
        <button class="google-pdf-btn" onclick="downloadPDF()">Download PDF</button>
      </div>
      <div class="google-main-right">
        <div class="google-profile-photo">
          <img src="${profileImageDataUrl}" alt="Profile Photo">
        </div>
        <div class="google-profile-name">${name}</div>
        <div class="google-profile-title">${title}</div>
        <div class="google-profile-location">${location}</div>
        <div class="google-profile-contact">
          <div><span>Email:</span> ${email}</div>
          <div><span>Phone:</span> ${phone}</div>
        </div>
        <div class="google-profile-links">
          <a href="${linkedin}" target="_blank">LinkedIn</a>
          <a href="${github}" target="_blank">GitHub</a>
          <a href="${website}" target="_blank">Website</a>
        </div>
        <div class="google-profile-summary">${about}</div>
      </div>
    </div>
  `;
}
// Initial preview
updatePreview();

// Live update as user types
document.querySelectorAll('#resumeForm input, #resumeForm textarea').forEach(el => {
  if (el.type !== "file") {
    el.addEventListener('input', updatePreview);
  }
});

// PDF download with proper fit
function downloadPDF() {
  const element = document.getElementById('resumePreview');
  const opt = {
    margin: 0.3,
    filename: 'google-style-resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      width: 794,
      scrollY: 0,
      useCORS: true
    },
    jsPDF: {
      unit: 'in',
      format: 'a4',
      orientation: 'portrait'
    },
    pagebreak: { mode: 'avoid-all', before: '.page-break' }
  };
  html2pdf().set(opt).from(element).save();
}