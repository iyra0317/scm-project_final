function splitLines(text) {
    return text.split('\n').filter(line => line.trim() !== '');
  }
  function makeList(items) {
    return '<ul>' + items.map(i => `<li>${i}</li>`).join('') + '</ul>';
  }
  function updatePreview() {
    // Get form values
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const profileimg = document.getElementById('profileimg').value;
    const bio = document.getElementById('bio').value;
    const location = document.getElementById('location').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const website = document.getElementById('website').value;
    const followers = document.getElementById('followers').value;
    const following = document.getElementById('following').value;
    const posts = document.getElementById('posts').value;
    const about = document.getElementById('about').value;
    const experience = splitLines(document.getElementById('experience').value);
    const education = splitLines(document.getElementById('education').value);
    const projects = splitLines(document.getElementById('projects').value);
    const achievements = splitLines(document.getElementById('achievements').value);
    const fskills = document.getElementById('fskills').value.split(',').map(s => s.trim()).filter(s => s);
    const tskills = document.getElementById('tskills').value.split(',').map(s => s.trim()).filter(s => s);
  
    // Format experience
    const expList = experience.map(e => {
      // "Job Title | Company | Dates | Location - Description"
      const [main, desc] = e.split(' - ');
      const [jobTitle, company, dates, loc] = main.split('|').map(x => x ? x.trim() : '');
      return `
        <div>
          <span class="ig-job-title">${jobTitle || ''}</span>
          <span class="ig-company">${company ? ' @ ' + company : ''}</span>
          <span class="ig-job-dates">${dates || ''}${loc ? ' / ' + loc : ''}</span>
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
        <div>
          <span class="ig-edu-school">${main || ''}</span>
          <span class="ig-edu-degree">${degree ? ' - ' + degree : ''}</span>
          <span class="ig-edu-dates">${year || ''}${loc ? ' / ' + loc : ''}</span>
        </div>
      `;
    });
  
    // Format projects
    const projList = projects.map(p => {
      const [title, ...details] = p.split(' - ');
      return `<strong>${title}</strong>${details.length ? `<br><span>${details.join(' - ')}</span>` : ''}`;
    });
  
    // Build preview HTML
    document.getElementById('resumePreview').innerHTML = `
      <div class="ig-header">
        <img class="ig-profile-img" src="${profileimg}" alt="Profile">
        <div class="ig-profile-details">
          <div class="ig-username">@${username}</div>
          <div class="ig-name">${name}</div>
          <div class="ig-bio">${bio}</div>
          <div class="ig-contact">
            <span>📍 ${location}</span>
            <span>✉️ ${email}</span>
            <span>📞 ${phone}</span>
            <span><a href="${website}" target="_blank">${website}</a></span>
          </div>
          <div class="ig-stats">
            <div>${posts}<span>Posts</span></div>
            <div>${followers}<span>Followers</span></div>
            <div>${following}<span>Following</span></div>
          </div>
        </div>
      </div>
      <div class="resume-section">
        <h3>About</h3>
        <div>${about}</div>
      </div>
      <div class="resume-section">
        <h3>Experience</h3>
        ${expList.join('')}
      </div>
      <div class="resume-section">
        <h3>Education</h3>
        ${eduList.join('')}
      </div>
      <div class="resume-section">
        <h3>Projects</h3>
        ${makeList(projList)}
      </div>
      <div class="resume-section">
        <h3>Achievements</h3>
        ${makeList(achievements)}
      </div>
      <div class="resume-section">
        <h3>Skills</h3>
        <div><span class="ig-skill-label">Functional Skills:</span> ${fskills.join(', ')}</div>
        <div><span class="ig-skill-label">Technical Skills:</span> ${tskills.join(', ')}</div>
      </div>
    `;
  }
  // Initial preview
  updatePreview();
  
  // Live update as user types
  document.querySelectorAll('#resumeForm input, #resumeForm textarea').forEach(el => {
    el.addEventListener('input', updatePreview);
  });
  
  // PDF download with proper fit
  function downloadPDF() {
    const element = document.getElementById('resumePreview');
    const opt = {
      margin: 0.3,
      filename: 'resume.pdf',
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
  
  // Responsive width for preview
  window.addEventListener('resize', () => {
    if (window.innerWidth < 900) {
      document.getElementById('resumePreview').style.width = '100%';
    } else {
      document.getElementById('resumePreview').style.width = '794px';
    }
  });
  