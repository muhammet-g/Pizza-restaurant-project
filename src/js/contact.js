// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (validateForm()) {
                submitForm();
            }
        });

        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function () {
                validateField(this);
            });

            input.addEventListener('input', function () {
                // Clear error when user starts typing
                const errorElement = document.getElementById(`${this.name}-error`);
                if (errorElement) {
                    errorElement.textContent = '';
                }
                this.classList.remove('is-invalid');
            });
        });
    }
});

// Validation Rules
const validationRules = {
  name: {
    minLength: 3,
    maxLength: 50,
    pattern: /^[\u0600-\u06FFa-zA-Z\s]+$/,
    messages: {
      required: 'الاسم مطلوب',
      minLength: 'الاسم يجب أن يكون 3 أحرف على الأقل',
      maxLength: 'الاسم لا يجب أن يزيد عن 50 حرف',
      pattern: 'الاسم يجب أن يحتوي على أحرف فقط'
    }
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    messages: {
      required: 'البريد الإلكتروني مطلوب',
      pattern: 'البريد الإلكتروني غير صحيح'
    }
  },
  phone: {
    pattern: /^[\d\s\-\+\(\)]{10,}$/,
    messages: {
      required: 'رقم الهاتف مطلوب',
      pattern: 'رقم الهاتف يجب أن يكون أكثر من 10 أرقام'
    }
  },
  subject: {
    messages: {
      required: 'يرجى اختيار الموضوع'
    }
  },
  message: {
    minLength: 10,
    maxLength: 1000,
    messages: {
      required: 'الرسالة مطلوبة',
      minLength: 'الرسالة يجب أن تكون 10 أحرف على الأقل',
      maxLength: 'الرسالة لا تتجاوز 1000 حرف'
    }
  }
};

// Validate individual field
function validateField(field) {
  const fieldName = field.name;
  const fieldValue = field.value.trim();
  const errorElement = document.getElementById(`${fieldName}-error`);
  const rules = validationRules[fieldName];

  // Clear previous error
  if (errorElement) {
    errorElement.textContent = '';
  }
  field.classList.remove('is-invalid');

  // Check if field is empty
  if (fieldValue === '') {
    if (errorElement && rules) {
      errorElement.textContent = rules.messages.required;
    }
    field.classList.add('is-invalid');
    return false;
  }

  // Validate based on field type
  if (rules) {
    // Check minLength
    if (rules.minLength && fieldValue.length < rules.minLength) {
      if (errorElement) {
        errorElement.textContent = rules.messages.minLength;
      }
      field.classList.add('is-invalid');
      return false;
    }

    // Check maxLength
    if (rules.maxLength && fieldValue.length > rules.maxLength) {
      if (errorElement) {
        errorElement.textContent = rules.messages.maxLength;
      }
      field.classList.add('is-invalid');
      return false;
    }

    // Check pattern
    if (rules.pattern && !rules.pattern.test(fieldValue)) {
      if (errorElement) {
        errorElement.textContent = rules.messages.pattern;
      }
      field.classList.add('is-invalid');
      return false;
    }
  }

  // Special validation for phone (Saudi format)
  if (fieldName === 'phone') {
    const saudiPhonePattern = /^(\+966|0)?[1-9]\d{8}$/;
    if (!saudiPhonePattern.test(fieldValue.replace(/\s/g, ''))) {
      if (errorElement) {
        errorElement.textContent = 'يرجى إدخال رقم هاتف سعودي صحيح';
      }
      field.classList.add('is-invalid');
      return false;
    }
  }

  return true;
}

// Validate entire form
function validateForm() {
  const form = document.getElementById('contactForm');
  const inputs = form.querySelectorAll('input, textarea, select');
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
    timestamp: new Date().toISOString(),
    ip: 'unknown'
  };

  // Disable submit button
  submitButton.disabled = true;
  const originalText = submitButton.innerHTML;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>جاري الإرسال...';

  // Simulate form submission
  setTimeout(() => {
    // Store data in localStorage (for demo purposes)
    let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messages.push(data);
    localStorage.setItem('contactMessages', JSON.stringify(messages));

    // Show success message
    showSuccessMessage('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً خلال 24 ساعة.');

    // Reset form
    form.reset();

    // Clear validation states
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.classList.remove('is-invalid');
    });

    // Reset button
    submitButton.disabled = false;
    submitButton.innerHTML = originalText;

    // Clear error messages
    const errorElements = form.querySelectorAll('.text-danger');
    errorElements.forEach(el => {
      el.textContent = '';
    });

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
  alertDiv.innerHTML = `<i class="fas fa-check-circle"></i>${message}`;
  form.insertBefore(alertDiv, form.firstChild);
}

// Show error message
function showErrorMessage(message) {
  const form = document.getElementById('contactForm');
  const alertDiv = document.createElement('div');
  alertDiv.className = 'alert-error-custom';
  alertDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i>${message}`;
  form.insertBefore(alertDiv, form.firstChild);
}
