// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateForm()) {
        submitForm();
      }
    });

    // Add real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this);
      });
    });
  }
});

// Validate individual field
function validateField(field) {
  const fieldName = field.name;
  const fieldValue = field.value.trim();
  const errorElement = document.getElementById(`${fieldName}-error`);

  // Clear previous error
  if (errorElement) {
    errorElement.textContent = '';
  }

  // Validate based on field type
  if (fieldValue === '') {
    if (errorElement) {
      errorElement.textContent = 'هذا الحقل مطلوب';
    }
    field.classList.add('is-invalid');
    return false;
  }

  if (fieldName === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(fieldValue)) {
      if (errorElement) {
        errorElement.textContent = 'البريد الإلكتروني غير صحيح';
      }
      field.classList.add('is-invalid');
      return false;
    }
  }

  if (fieldName === 'phone') {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(fieldValue)) {
      if (errorElement) {
        errorElement.textContent = 'رقم الهاتف يجب أن يكون أكثر من 10 أرقام';
      }
      field.classList.add('is-invalid');
      return false;
    }
  }

  if (fieldName === 'name') {
    if (fieldValue.length < 3) {
      if (errorElement) {
        errorElement.textContent = 'الاسم يجب أن يكون 3 أحرف على الأقل';
      }
      field.classList.add('is-invalid');
      return false;
    }
  }

  if (fieldName === 'subject' || fieldName === 'message') {
    if (fieldValue.length < 5) {
      if (errorElement) {
        errorElement.textContent = 'يجب أن تكون أطول من 5 أحرف';
      }
      field.classList.add('is-invalid');
      return false;
    }
  }

  field.classList.remove('is-invalid');
  return true;
}

// Validate entire form
function validateForm() {
  const form = document.getElementById('contactForm');
  const inputs = form.querySelectorAll('input, textarea');
  let isValid = true;

  inputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });

  return isValid;
}

// Submit form
function submitForm() {
  const form = document.getElementById('contactForm');
  const submitButton = form.querySelector('button[type="submit"]');
  
  // Get form data
  const formData = new FormData(form);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    subject: formData.get('subject'),
    message: formData.get('message'),
    timestamp: new Date().toISOString()
  };

  // Disable submit button
  submitButton.disabled = true;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>جاري الإرسال...';

  // Simulate form submission (in a real app, this would be an API call)
  setTimeout(() => {
    // Store data in localStorage (for demo purposes)
    let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messages.push(data);
    localStorage.setItem('contactMessages', JSON.stringify(messages));

    // Show success message
    showSuccessMessage('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');

    // Reset form
    form.reset();

    // Reset button
    submitButton.disabled = false;
    submitButton.innerHTML = '<i class="fas fa-paper-plane me-2"></i>إرسال الرسالة';

    // Clear success message after 5 seconds
    setTimeout(() => {
      const successMsg = document.querySelector('.alert-success-custom');
      if (successMsg) {
        successMsg.remove();
      }
    }, 5000);
  }, 1500);
}

// Show success message
function showSuccessMessage(message) {
  const form = document.getElementById('contactForm');
  const alertDiv = document.createElement('div');
  alertDiv.className = 'alert-success-custom';
  alertDiv.innerHTML = `<i class="fas fa-check-circle me-2"></i>${message}`;
  form.insertBefore(alertDiv, form.firstChild);
}

// Show error message
function showErrorMessage(message) {
  const form = document.getElementById('contactForm');
  const alertDiv = document.createElement('div');
  alertDiv.className = 'alert-error-custom';
  alertDiv.innerHTML = `<i class="fas fa-exclamation-circle me-2"></i>${message}`;
  form.insertBefore(alertDiv, form.firstChild);
}
