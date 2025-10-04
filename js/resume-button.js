// Resume Download Button
document.addEventListener('DOMContentLoaded', function() {
    addResumeDownloadButton();
    
    function addResumeDownloadButton() {
        // Find about section to add the resume button
        const aboutSection = document.querySelector('#about .container');
        if (!aboutSection) return;
        
        // Create resume download section
        const resumeSection = document.createElement('div');
        resumeSection.className = 'resume-download-section';
        
        // Resume section without title
        // Title removed as requested
        
        // Create download button
        const downloadBtn = document.createElement('a');
        downloadBtn.className = 'resume-download-btn';
        downloadBtn.href = 'assets/Md_Ekramul_Anjum_Sabid_Resume.pdf'; // Path to your resume
        downloadBtn.setAttribute('download', 'Md_Ekramul_Anjum_Sabid_Resume.pdf');
        
        // Add button icon and text
        downloadBtn.innerHTML = `
            <i class="fas fa-file-download"></i>
            Download Resume
            <span class="download-progress"></span>
        `;
        
        // Add download animation
        downloadBtn.addEventListener('click', function(e) {
            // Check if resume file exists - if not, prevent default and show message
            const xhr = new XMLHttpRequest();
            xhr.open('HEAD', downloadBtn.href, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 404) {
                        e.preventDefault();
                        alert('Resume file not found. This is a demo portfolio - in a real website, your actual resume would be downloaded.');
                    } else {
                        // Add downloading class for animation
                        downloadBtn.classList.add('downloading');
                        
                        // Remove the class after animation completes
                        setTimeout(() => {
                            downloadBtn.classList.remove('downloading');
                        }, 2000);
                    }
                }
            };
            xhr.send();
        });
        
        // Add button to section
        resumeSection.appendChild(downloadBtn);
        
        // Add resume section to about section
        // Find the best place to insert it - after the terminal demo if it exists
        const terminalDemo = aboutSection.querySelector('.terminal-demo-container');
        if (terminalDemo) {
            terminalDemo.parentNode.insertBefore(resumeSection, terminalDemo.nextSibling);
        } else {
            // Otherwise add it after the first paragraph
            const firstParagraph = aboutSection.querySelector('p');
            if (firstParagraph) {
                firstParagraph.parentNode.insertBefore(resumeSection, firstParagraph.nextSibling);
            } else {
                aboutSection.appendChild(resumeSection);
            }
        }
    }
});