// Listening to Form Submission
document.getElementById('resumeform')?.addEventListener('submit', function(event) {
    event.preventDefault();

    // Type Assertion
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLInputElement;
    const experienceElement = document.getElementById('experience') as HTMLInputElement;
    const skillsElement = document.getElementById('skills') as HTMLInputElement;
    const profilePictureElement = document.getElementById('profile-picture') as HTMLInputElement;
    const profileImgElement = document.getElementById('profile-img') as HTMLImageElement;

    const usernameElement = document.getElementById("username") as HTMLInputElement;

    // Check if all elements are present
    if (nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement && usernameElement && profilePictureElement) {
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;

        const username = usernameElement.value;
        const uniquePath = `resumes/${username.replace(/\s+/g, '_')}_cv.html`;

        // Generate the unique URL for sharing
        const baseUrl = window.location.origin; // Get the current website's base URL
        const uniqueUrl = `${baseUrl}/resumes/${username.replace(/\s+/g, '_')}`;

        // Handle profile picture
        const file = profilePictureElement.files ? profilePictureElement.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                if (profileImgElement) {
                    profileImgElement.src = e.target?.result as string;
                    document.getElementById('profile-picture-preview')!.style.display = 'block';
                }
            };
            reader.readAsDataURL(file);
        } else {
            document.getElementById('profile-picture-preview')!.style.display = 'none';
        }

        // Create Resume Output
        const resumeOutput = `
            <div style="text-align: center;">
                <img src="${profileImgElement?.src || 'placeholder-image.png'}" alt="Profile Picture" id="profile-img">
            </div>
            <h2>Resume</h2>
            <p><strong>Name:</strong> <span id="output-name">${name}</span></p>
            <p><strong>Email:</strong> <span id="output-email">${email}</span></p>
            <p><strong>Phone Number:</strong> <span id="output-phone">${phone}</span></p>
            <h3>Education</h3>
            <p id="output-education">${education}</p>
            <h3>Experience</h3>
            <p id="output-experience">${experience}</p>
            <h3>Skills</h3>
            <p id="output-skills">${skills}</p>
            <h3>Resume URL</h3>
            <p><a href="${uniqueUrl}" target="_blank">${uniqueUrl}</a></p>
            <button class="edit">Edit</button>
            <button class="save">Save</button>
        `;

        const resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;

            // Create and append the download button
            const downloadButton = document.createElement('button');
            downloadButton.textContent = 'Download Your Resume';
            downloadButton.className = 'download-btn'; // For CSS styling
            downloadButton.addEventListener('click', function() {
                const downloadLink = document.createElement('a');
                downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput);
                downloadLink.download = uniquePath;
                downloadLink.click(); // Simulate the download click
            });
            resumeOutputElement.appendChild(downloadButton);

            // Show both form and resume, allowing editing
            document.getElementById('resumeform')!.style.display = 'block';
            resumeOutputElement.style.display = 'block';

            // Add real-time update functionality
            enableRealTimeEditing();
        }
    } else {
        console.error('One or more form elements are missing');
    }
});

function enableRealTimeEditing() {
    // Get form elements
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLInputElement;
    const experienceElement = document.getElementById('experience') as HTMLInputElement;
    const skillsElement = document.getElementById('skills') as HTMLInputElement;

    // Get corresponding output elements
    const outputName = document.getElementById('output-name') as HTMLSpanElement;
    const outputEmail = document.getElementById('output-email') as HTMLSpanElement;
    const outputPhone = document.getElementById('output-phone') as HTMLSpanElement;
    const outputEducation = document.getElementById('output-education') as HTMLParagraphElement;
    const outputExperience = document.getElementById('output-experience') as HTMLParagraphElement;
    const outputSkills = document.getElementById('output-skills') as HTMLParagraphElement;

    // Add input event listeners to update the resume in real-time
    nameElement.addEventListener('input', function() {
        outputName.textContent = nameElement.value;
    });

    emailElement.addEventListener('input', function() {
        outputEmail.textContent = emailElement.value;
    });

    phoneElement.addEventListener('input', function() {
        outputPhone.textContent = phoneElement.value;
    });

    educationElement.addEventListener('input', function() {
        outputEducation.textContent = educationElement.value;
    });

    experienceElement.addEventListener('input', function() {
        outputExperience.textContent = experienceElement.value;
    });

    skillsElement.addEventListener('input', function() {
        outputSkills.textContent = skillsElement.value;
    });
}
