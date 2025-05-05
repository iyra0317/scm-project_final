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
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
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
      // "Job Title | Company | Dates | Location - Description"
      const [main, desc] = e.split(' - ');
      const [jobTitle, company, dates, loc] = main.split('|').map(x => x ? x.trim() : '');
      return `
        <div>
          <span class="ln-job-title">${jobTitle || ''}</span>
          <span class="ln-company">${company ? ' @ ' + company : ''}</span>
          <span class="ln-job-dates">${dates || ''}${loc ? ' / ' + loc : ''}</span>
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
          <span class="ln-edu-school">${main || ''}</span>
          <span class="ln-edu-degree">${degree ? ' - ' + degree : ''}</span>
          <span class="ln-edu-dates">${year || ''}${loc ? ' / ' + loc : ''}</span>
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
      <div class="ln-header">
        <div class="ln-avatar">in</div>
        <div class="ln-info">
          <h2>${name}</h2>
          <div class="title">${title}</div>
          <div class="location">${location}</div>
          <div class="ln-contact">
            <span>📞 ${phone}</span>
            <span>✉️ ${email}</span>
            <span><a href="${linkedin}" target="_blank">LinkedIn</a></span>
            <span><a href="${github}" target="_blank">GitHub</a></span>
            <span><a href="${website}" target="_blank">Website</a></span>
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
        <h3>Academic Project</h3>
        ${makeList(projList)}
      </div>
      <div class="resume-section">
        <h3>Achievements</h3>
        ${makeList(achievements)}
      </div>
      <div class="resume-section">
        <h3>Skills</h3>
        <div><span class="ln-skill-label">Functional Skills:</span> ${fskills.join(', ')}</div>
        <div><span class="ln-skill-label">Technical Skills:</span> ${tskills.join(', ')}</div>
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
  