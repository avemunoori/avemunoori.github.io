// Introduction Form JavaScript
// Handles form validation, submission, and dynamic content generation

// Show field error message
function showFieldError(field, message) {
    let errorDiv = field.parentNode.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        field.parentNode.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
}

// Validate URL format
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (error) {
        return false;
    }
}

// Validate date format (YYYY-MM-DD)
function isValidDate(dateString) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) {
        return false;
    }
    
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime()) && dateString === date.toISOString().split('T')[0];
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Generate a complete HTML page
function generateCompleteHTMLPage(data, courses, imageSrc = 'images/profile.png') {
    const fullName = `${data.firstName} ${data.middleName ? data.middleName + ' ' : ''}${data.lastName}`;
    const displayName = data.nickname || data.firstName;
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fullName} | ITIS 3135 | Introduction Form</title>
    <link rel="stylesheet" href="styles/default.css">
    <script src="https://lint.page/kit/4d0fe3.js" crossorigin="anonymous"></script>
</head>
<body>
    <div data-include-html="components/header.html"></div>
    
    <main>
        <h2>Introduction Form</h2>
        
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Preferred Name:</strong> ${displayName}</p>
        
        <h3>Acknowledgment</h3>
        <p>${data.acknowledgment}</p>
        <p><strong>Date:</strong> ${formatDate(data.acknowledgmentDate)}</p>
        
        <h3>Mascot</h3>
        <p><strong>${data.mascotAdjective} ${data.mascotAnimal}</strong></p>
        <p><strong>Divider:</strong> ${data.divider}</p>
        
        <h3>Profile Picture</h3>
        <figure>
            <img src="${imageSrc}" alt="${data.imageCaption}" style="max-width: 300px; height: auto;">
            <figcaption>${data.imageCaption}</figcaption>
        </figure>
        
        <h3>Personal Statement</h3>
        <p>${data.personalStatement}</p>
        
        <h3>Background Information</h3>
        <ul>
            <li><strong>Personal Background:</strong> ${data.personalBackground}</li>
            <li><strong>Professional Background:</strong> ${data.professionalBackground}</li>
            <li><strong>Academic Background:</strong> ${data.academicBackground}</li>
            <li><strong>Background in this Course:</strong> ${data.courseBackground}</li>
            <li><strong>Primary Computer Platform:</strong> ${data.computerPlatform}</li>
            <li><strong>Courses I'm Taking:</strong> ${data.currentCourses}</li>
            <li><strong>Funny/Interesting Story:</strong> ${data.funnyStory}</li>
        </ul>
        
        <h3>Current Courses</h3>
        <ul>
            ${courses.map((course) => 
                `<li><strong>${course.dept} ${course.number} - ${course.name}:</strong> ${course.reason}</li>`
            ).join('')}
        </ul>
        
        <h3>Quote</h3>
        <blockquote>
            <p>"${data.quote}"</p>
            <footer>- ${data.quoteAuthor}</footer>
        </blockquote>
        
        ${data.funnyThing ? `<h3>Funny Thing</h3><p>${data.funnyThing}</p>` : ''}
        
        ${data.somethingToShare ? `<h3>Something I Would Like to Share</h3><p>${data.somethingToShare}</p>` : ''}
        
        <h3>Links</h3>
        <ul>
            <li><a href="${data.linkedin}" target="_blank">LinkedIn</a></li>
            <li><a href="${data.github}" target="_blank">GitHub</a></li>
            <li><a href="${data.unccWeb}" target="_blank">UNCC Web</a></li>
            <li><a href="${data.githubIo}" target="_blank">GitHub.io</a></li>
            <li><a href="${data.freeCodeCamp}" target="_blank">FreeCodeCamp</a></li>
        </ul>
        
        <div style="text-align: center; margin-top: 30px;">
            <a href="intro_form.html" style="color: #3498db; text-decoration: none; font-weight: bold; padding: 10px 20px; border: 2px solid #3498db; border-radius: 5px; display: inline-block;">Fill out another form</a>
        </div>
    </main>
    
    <div data-include-html="components/footer.html"></div>
    <script src="scripts/HTMLInclude.js"></script>
    <script>includeHTML();</script>
</body>
</html>`;
}

// Generate the HTML content for the introduction page (kept for compatibility)
function generateIntroductionHTML(data, courses) {
    const fullName = `${data.firstName} ${data.middleName ? data.middleName + ' ' : ''}${data.lastName}`;
    const displayName = data.nickname || data.firstName;
    
    return `
        <div class="introduction-content">
            <h2>Introduction Form</h2>
            
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Preferred Name:</strong> ${displayName}</p>
            
            <h3>Acknowledgment</h3>
            <p>${data.acknowledgment}</p>
            <p><strong>Date:</strong> ${formatDate(data.acknowledgmentDate)}</p>
            
            <h3>Mascot</h3>
            <p><strong>${data.mascotAdjective} ${data.mascotAnimal}</strong></p>
            <p><strong>Divider:</strong> ${data.divider}</p>
            
            <h3>Profile Picture</h3>
            <figure>
                <img id="generatedImage" src="" alt="${data.imageCaption}" style="max-width: 300px; height: auto;">
                <figcaption>${data.imageCaption}</figcaption>
            </figure>
            
            <h3>Personal Statement</h3>
            <p>${data.personalStatement}</p>
            
            <h3>Background Information</h3>
            <ul>
                <li><strong>Personal Background:</strong> ${data.personalBackground}</li>
                <li><strong>Professional Background:</strong> ${data.professionalBackground}</li>
                <li><strong>Academic Background:</strong> ${data.academicBackground}</li>
                <li><strong>Background in this Course:</strong> ${data.courseBackground}</li>
                <li><strong>Primary Computer Platform:</strong> ${data.computerPlatform}</li>
                <li><strong>Courses I'm Taking:</strong> ${data.currentCourses}</li>
                <li><strong>Funny/Interesting Story:</strong> ${data.funnyStory}</li>
            </ul>
            
            <h3>Current Courses</h3>
            <ul>
                ${courses.map((course) => 
                    `<li><strong>${course.dept} ${course.number} - ${course.name}:</strong> ${course.reason}</li>`
                ).join('')}
            </ul>
            
            <h3>Quote</h3>
            <blockquote>
                <p>"${data.quote}"</p>
                <footer>- ${data.quoteAuthor}</footer>
            </blockquote>
            
            ${data.funnyThing ? `<h3>Funny Thing</h3><p>${data.funnyThing}</p>` : ''}
            
            ${data.somethingToShare ? `<h3>Something I Would Like to Share</h3><p>${data.somethingToShare}</p>` : ''}
            
            <h3>Links</h3>
            <ul>
                <li><a href="${data.linkedin}" target="_blank">LinkedIn</a></li>
                <li><a href="${data.github}" target="_blank">GitHub</a></li>
                <li><a href="${data.unccWeb}" target="_blank">UNCC Web</a></li>
                <li><a href="${data.githubIo}" target="_blank">GitHub.io</a></li>
                <li><a href="${data.freeCodeCamp}" target="_blank">FreeCodeCamp</a></li>
            </ul>
        </div>
    `;
}

// Validate required fields
function validateForm() {
    const requiredFields = document.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach((error) => {
        error.textContent = '';
    });
    
    requiredFields.forEach((field) => {
        if (!field.value.trim()) {
            isValid = false;
            showFieldError(field, 'This field is required');
        }
    });
    
    // Validate URLs
    const urlFields = document.querySelectorAll('input[type="url"]');
    urlFields.forEach((field) => {
        if (field.value && !isValidUrl(field.value)) {
            isValid = false;
            showFieldError(field, 'Please enter a valid URL');
        }
    });
    
    // Validate date format
    const dateField = document.getElementById('acknowledgmentDate');
    if (dateField && dateField.value && !isValidDate(dateField.value)) {
        isValid = false;
        showFieldError(dateField, 'Please enter date in YYYY-MM-DD format');
    }
    
    // Validate image file
    const imageField = document.getElementById('profileImage');
    if (imageField.files.length === 0) {
        isValid = false;
        showFieldError(imageField, 'Please select an image file');
    }
    
    return isValid;
}

// Generate the introduction page content
function generateIntroductionPage() {
    const formData = new FormData(document.getElementById('introForm'));
    
    // Get all form values
    const data = {
        firstName: formData.get('firstName'),
        middleName: formData.get('middleName'),
        nickname: formData.get('nickname'),
        lastName: formData.get('lastName'),
        acknowledgment: formData.get('acknowledgment'),
        acknowledgmentDate: formData.get('acknowledgmentDate'),
        mascotAdjective: formData.get('mascotAdjective'),
        mascotAnimal: formData.get('mascotAnimal'),
        divider: formData.get('divider'),
        imageCaption: formData.get('imageCaption'),
        personalStatement: formData.get('personalStatement'),
        personalBackground: formData.get('personalBackground'),
        professionalBackground: formData.get('professionalBackground'),
        academicBackground: formData.get('academicBackground'),
        courseBackground: formData.get('courseBackground'),
        computerPlatform: formData.get('computerPlatform'),
        currentCourses: formData.get('currentCourses'),
        funnyStory: formData.get('funnyStory'),
        quote: formData.get('quote'),
        quoteAuthor: formData.get('quoteAuthor'),
        funnyThing: formData.get('funnyThing'),
        somethingToShare: formData.get('somethingToShare'),
        linkedin: formData.get('linkedin'),
        github: formData.get('github'),
        unccWeb: formData.get('unccWeb'),
        githubIo: formData.get('githubIo'),
        freeCodeCamp: formData.get('freeCodeCamp')
    };
    
    // Get courses data
    const courses = [];
    const courseDepts = formData.getAll('courseDept[]');
    const courseNumbers = formData.getAll('courseNumber[]');
    const courseNames = formData.getAll('courseName[]');
    const courseReasons = formData.getAll('courseReason[]');
    
    for (let i = 0; i < courseDepts.length; i++) {
        if (courseDepts[i] && courseNumbers[i] && courseNames[i] && courseReasons[i]) {
            courses.push({
                dept: courseDepts[i],
                number: courseNumbers[i],
                name: courseNames[i],
                reason: courseReasons[i]
            });
        }
    }
    
    // Handle image upload if present
    const imageInput = document.getElementById('profileImage');
    if (imageInput && imageInput.files.length > 0) {
        const file = imageInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            // Generate complete HTML page with the image data
            const completeHTML = generateCompleteHTMLPage(data, courses, e.target.result);
            
            // Create a new window/tab with the generated page
            const newWindow = window.open('', '_blank');
            newWindow.document.write(completeHTML);
            newWindow.document.close();
        };
        reader.readAsDataURL(file);
    } else {
        // Generate complete HTML page without custom image
        const completeHTML = generateCompleteHTMLPage(data, courses, 'images/profile.png');
        
        // Create a new window/tab with the generated page
        const newWindow = window.open('', '_blank');
        newWindow.document.write(completeHTML);
        newWindow.document.close();
    }
}

// Handle form submission
function handleFormSubmission() {
    if (validateForm()) {
        generateIntroductionPage();
    }
}

// Clear all form fields
function clearForm() {
    const form = document.getElementById('introForm');
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach((input) => {
        if (input.type === 'file') {
            input.value = '';
        } else if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
    
    // Clear error messages
    document.querySelectorAll('.error-message').forEach((error) => {
        error.textContent = '';
    });
    
    // No result container to hide anymore
}

// Reset form to default values
function resetToDefaults() {
    // This will be handled by the browser's default reset functionality
    
    // Clear error messages
    document.querySelectorAll('.error-message').forEach((error) => {
        error.textContent = '';
    });
}

// Reset form (no longer needed since we open new page)
function resetForm() {
    clearForm();
}

// Add a new course row
function addCourse() {
    const container = document.getElementById('coursesContainer');
    const courseItem = document.createElement('div');
    courseItem.className = 'course-item';
    courseItem.innerHTML = `
        <input type="text" name="courseDept[]" placeholder="Department" required>
        <input type="text" name="courseNumber[]" placeholder="Number" required>
        <input type="text" name="courseName[]" placeholder="Course Name" required>
        <input type="text" name="courseReason[]" placeholder="Reason" required>
        <button type="button" class="delete-course" onclick="removeCourse(this)">Delete</button>
    `;
    container.appendChild(courseItem);
}

// Remove a course row
function removeCourse(button) {
    button.parentElement.remove();
}

// Initialize the form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('introForm');
    
    // Prevent default form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission();
    });
    
    // Set up clear button functionality
    const clearButton = document.querySelector('button[type="clear"]');
    if (clearButton) {
        clearButton.addEventListener('click', clearForm);
    }
    
    // Set up reset button functionality
    const resetButton = document.querySelector('button[type="reset"]');
    if (resetButton) {
        resetButton.addEventListener('click', resetToDefaults);
    }
    
    // Handle image preview and validation
    const imageInput = document.getElementById('profileImage');
    if (imageInput) {
        imageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // Validate file type
                if (!file.type.startsWith('image/')) {
                    showFieldError(imageInput, 'Please select a valid image file');
                    return;
                }
                
                // Validate file size (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    showFieldError(imageInput, 'Image file size must be less than 5MB');
                    return;
                }
                
                // Clear any previous errors
                const errorDiv = imageInput.parentNode.querySelector('.error-message');
                if (errorDiv) {
                    errorDiv.textContent = '';
                }
                
                // Update the generated image when form is submitted
                const reader = new FileReader();
                reader.onload = function(e) {
                    const generatedImg = document.getElementById('generatedImage');
                    if (generatedImg) {
                        generatedImg.src = e.target.result;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }
});