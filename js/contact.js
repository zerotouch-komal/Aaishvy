document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');
    const formInputs = contactForm.querySelectorAll('.form-control');
    
    const postUrl = 'https://ztecrm.com:7777/sendMail'; 
    
    formInputs.forEach(input => {
      if (input.value !== '') {
        input.classList.add('has-value');
      }
    });
    
    formInputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('active');
        
        this.classList.remove('is-invalid');
        this.classList.remove('is-valid');
      });
      
      input.addEventListener('blur', function() {
        this.parentElement.classList.remove('active');
        validateInput(this);
      });
    });
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      
      formInputs.forEach(input => {
        if (!validateInput(input)) {
          isValid = false;
        }
      });
      
      if (isValid) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        const formData = new FormData(contactForm);
        const formDataObject = {};
        
        formData.forEach((value, key) => {
          formDataObject[key] = value;
        });
        
        fetch(postUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formDataObject)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Success:', data);

          formSuccess.classList.add('show');
          contactForm.reset();
          
          formInputs.forEach(input => {
            input.classList.remove('is-valid');
          });
          
          setTimeout(() => {
            formSuccess.classList.remove('show');
            submitBtn.disabled = false;
          }, 5000);
        })
        .catch(error => {
          console.error('Error:', error);
          
          // alert('There was an error submitting your message. Please try again later.');
        })
        .finally(() => {
          submitBtn.classList.remove('loading');
        });
      }
    });
    
    function validateInput(input) {
      let isValid = true;
      
      if (input.hasAttribute('required') && input.value.trim() === '') {
        setInvalid(input);
        isValid = false;
      } else if (input.type === 'email' && input.value.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          setInvalid(input);
          isValid = false;
        } else {
          setValid(input);
        }
      } else if (input.type === 'tel' && input.value.trim() !== '') {
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        if (!phoneRegex.test(input.value)) {
          setInvalid(input);
          isValid = false;
        } else {
          setValid(input);
        }
      } else if (input.value.trim() !== '') {
        setValid(input);
      } else {
        input.classList.remove('is-valid');
        input.classList.remove('is-invalid');
      }
      
      return isValid;
    }
    
    function setValid(input) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
    }
    
    function setInvalid(input) {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
    }
    
    const inputFields = document.querySelectorAll('.form-control');
    inputFields.forEach((field, index) => {
      field.style.transitionDelay = `${index * 0.08}s`;
      setTimeout(() => {
        field.classList.add('fade-in');
      }, 300 + (index * 80));
    });
  });