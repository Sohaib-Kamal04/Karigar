document.addEventListener("DOMContentLoaded", () => {
    
    const modalOverlay = document.getElementById("modalOverlay");
    const closeBtn = document.getElementById("closeModalBtn");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm"); 
    const forgotForm = document.getElementById("forgotForm");
    const showForgot = document.getElementById("showForgot");
    const backToLogin = document.getElementById("backToLogin");
    const backToLoginFromForgot = document.getElementById("backToLoginFromForgot");
    const registrationForm = document.getElementById("registrationForm"); 
    const loginButton = loginForm?.querySelector(".login-button");
    const loginLink = document.getElementById("openModalBtn"); 
    const showRegister = document.getElementById("showRegister");

    
    const roleMenu = document.getElementById("roleMenu");
    const selectBtn = roleMenu?.querySelector(".select-btn");
    const sBtnText = roleMenu?.querySelector(".sBtn-text");
    const roleInput = document.getElementById("roleInput");
    const providerOptions = document.getElementById("providerOptions");
    const supplierOptions = document.getElementById("supplierOptions");
    const options = roleMenu?.querySelectorAll(".option");

    
    document.querySelectorAll('.eye-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });

    
    const regPasswordInput = document.getElementById('regPassword');
    if (regPasswordInput) {
        regPasswordInput.addEventListener('input', function() {
            const password = this.value;
            const strengthBar = document.querySelector('.strength-bar');
            const strengthText = document.querySelector('.strength-text span');

            
            if (strengthBar) strengthBar.style.width = '0%';
            if (strengthBar) strengthBar.style.backgroundColor = 'transparent';

            if (password.length === 0) {
                if (strengthText) strengthText.textContent = '';
                return;
            }

            
            let strength = 0;
            if (password.length > 7) strength += 1;
            if (password.match(/[a-z]/)) strength += 1;
            if (password.match(/[A-Z]/)) strength += 1;
            if (password.match(/[0-9]/)) strength += 1;
            if (password.match(/[^a-zA-Z0-9]/)) strength += 1;

            
            const width = (strength / 5) * 100;
            if (strengthBar) strengthBar.style.width = width + '%';

            
            if (strength <= 2) {
                if (strengthBar) strengthBar.style.backgroundColor = '#ff4d4d';
                if (strengthText) {
                    strengthText.textContent = 'Weak';
                    strengthText.style.color = '#ff4d4d';
                }
            } else if (strength <= 4) {
                if (strengthBar) strengthBar.style.backgroundColor = '#ffcc00';
                if (strengthText) {
                    strengthText.textContent = 'Medium';
                    strengthText.style.color = '#ffcc00';
                }
            } else {
                if (strengthBar) strengthBar.style.backgroundColor = '#4CAF50';
                if (strengthText) {
                    strengthText.textContent = 'Strong';
                    strengthText.style.color = '#4CAF50';
                }
            }
        });
    }

    
    function showRegisterForm() {
        if (loginForm) loginForm.style.display = "none";
        if (forgotForm) forgotForm.style.display = "none";
        if (registerForm) registerForm.style.display = "block";
        autoFocusForm();
    }

    function showLoginForm() {
        if (registerForm) registerForm.style.display = "none";
        if (forgotForm) forgotForm.style.display = "none";
        if (loginForm) loginForm.style.display = "block";
        autoFocusForm();
    }

    function showForgotForm() {
        if (loginForm) loginForm.style.display = "none";
        if (registerForm) registerForm.style.display = "none";
        if (forgotForm) forgotForm.style.display = "block";
        autoFocusForm();
    }

    
    function autoFocusForm() {
        const visibleForm = document.querySelector('#loginForm:not([style*="none"]), #registerForm:not([style*="none"]), #forgotForm:not([style*="none"])');
        if (visibleForm) {
            const firstInput = visibleForm.querySelector('input:not([type="hidden"])');
            if (firstInput) firstInput.focus();
        }
    }

    
    if (closeBtn) closeBtn.onclick = () => (modalOverlay.style.display = "none");
    if (modalOverlay) window.onclick = e => { if (e.target === modalOverlay) modalOverlay.style.display = "none"; };
    if (showForgot) showForgot.onclick = e => { e.preventDefault(); showForgotForm(); };
    if (backToLogin) backToLogin.onclick = e => { e.preventDefault(); showLoginForm(); };
    if (backToLoginFromForgot) backToLoginFromForgot.onclick = e => { e.preventDefault(); showLoginForm(); };
    if (showRegister) showRegister.onclick = e => { e.preventDefault(); showRegisterForm(); };

    
    if (selectBtn && options) {
        selectBtn.addEventListener("click", () => roleMenu.classList.toggle("active"));

        options.forEach(option => {
            option.addEventListener("click", () => {
                const selectedText = option.querySelector(".option-text").innerText;
                const value = option.getAttribute("data-value");
                if (sBtnText) sBtnText.innerText = selectedText;
                if (roleInput) roleInput.value = value;
                if (roleMenu) roleMenu.classList.remove("active");

                if (providerOptions) providerOptions.style.display = "none";
                if (supplierOptions) supplierOptions.style.display = "none";
                if (value === "provider" && providerOptions) providerOptions.style.display = "block";
                else if (value === "supplier" && supplierOptions) supplierOptions.style.display = "block";
            });
        });

        window.addEventListener("click", e => {
            if (roleMenu && !roleMenu.contains(e.target)) {
                roleMenu.classList.remove("active");
            }
        });
    }

    

    function showError(inputId, message) {
        const errorSpan = document.querySelector(`#${inputId}Error`);
        const inputField = document.querySelector(`#${inputId}`);

        if (errorSpan) errorSpan.textContent = message;

        if (inputField && (inputField.tagName === "INPUT" || inputField.tagName === "SELECT")) {
            inputField.classList.add("input-error");
        } else if (inputField) {
            
            inputField.style.border = "1px solid red";
            inputField.classList.add("input-error");
        }
    }

    function clearErrors(formId) {
        const form = document.querySelector(formId);
        if (!form) return;

        const errorSpans = form.querySelectorAll(".error-message");
        const errorInputs = form.querySelectorAll(".input-error");

        errorSpans.forEach(span => span.textContent = '');
        errorInputs.forEach(input => input.classList.remove("input-error"));

        
        if (formId === "#registrationForm") {
            if (providerOptions) providerOptions.style.border = "";
            if (supplierOptions) supplierOptions.style.border = "";
        }
    }

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    
    if (registrationForm) {
        registrationForm.addEventListener("submit", async e => {
            e.preventDefault();
            clearErrors("#registrationForm"); 

            const name = document.querySelector("#regName").value.trim();
            const email = document.querySelector("#regEmail").value.trim();
            const password = document.querySelector("#regPassword").value.trim();
            const role = document.querySelector("#roleInput").value;
            let valid = true;

            
            if (name === "") {
                showError("regName", "Full Name is required.");
                valid = false;
            }

            if (email === "" || !validateEmail(email)) {
                showError("regEmail", "Valid Email is required.");
                valid = false;
            }

            if (password.length < 6) {
                showError("regPassword", "Password must be at least 6 characters.");
                valid = false;
            }

            if (role === "") {
                showError("roleInput", "Please select an account type."); 
                valid = false;
            }

            if (role === "provider") {
                const checked = document.querySelectorAll("input[name='services[]']:checked");
                if (checked.length === 0) {
                    showError("providerOptions", "Please select at least one service."); 
                    valid = false;
                }
            } else if (role === "supplier") {
                const checked = document.querySelectorAll("input[name='materials[]']:checked");
                if (checked.length === 0) {
                    showError("supplierOptions", "Please select at least one material."); 
                    valid = false;
                }
            }

            if (!valid) return; 

            
            const formData = new FormData(registrationForm);

            try {
                const res = await fetch("php/register.php", {
                    method: "POST",
                    body: formData
                });
                const data = await res.json();
                if (data.success) {
                    alert(data.success);
                    registrationForm.reset();
                    if (sBtnText) sBtnText.innerText = "Select Account Type";
                    if (roleInput) roleInput.value = "";
                    if (providerOptions) providerOptions.style.display = "none";
                    if (supplierOptions) supplierOptions.style.display = "none";
                    document.querySelectorAll("input[name='services[]']").forEach(cb => cb.checked = false);
                    document.querySelectorAll("input[name='materials[]']").forEach(cb => cb.checked = false);
                    showLoginForm();
                } else if (data.error) {
                    alert("Error: " + data.error);
                    if (data.error.includes("Email already registered")) {
                        showError("regEmail", data.error);
                    }
                } else {
                    alert("Unexpected response");
                }
            } catch (err) {
                alert("Fetch error: " + err.message);
            }
        });
    }

if (loginButton) {
    loginButton.addEventListener("click", async e => {
        e.preventDefault();
        clearErrors("#loginForm");

        const email = document.querySelector("#loginEmail").value.trim();
        const password = document.querySelector("#loginPassword").value.trim();
        const rememberMe = document.querySelector("#rememberMe").checked;

        
        if (!email) {
            showError("loginEmail", "Email is required");
            return;
        }
        if (!password) {
            showError("loginPassword", "Password is required");
            return;
        }

        try {
            const response = await fetch("php/login.php", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&rememberMe=${rememberMe}`
            });

            const data = await response.json();

            if (!response.ok) {
                
                throw new Error(data.error || "Login failed");
            }

            
            if (data.success) {
                alert(`Welcome, ${data.name} (${data.role})`);
                modalOverlay.style.display = "none";
                updateLoginUI();

                
                switch (data.role) {
                    case 'provider':
                        window.location.href = 'dashboards/services-dashboard.php';
                        break;
                    case 'supplier':
                        window.location.href = 'dashboards/material-dashboard.php';
                        break;
                    default:
                        window.location.href = 'dashboards/user-dashboard.php';
                        break;
                }
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (error) {
            console.error("Login error:", error);
            showError("loginEmail", error.message);
            showError("loginPassword", "");
            alert("Login failed: " + error.message);
        }
    });
}

    
    if (forgotForm) {
        forgotForm.addEventListener("submit", async function(e) {
            e.preventDefault();
            clearErrors("#forgotForm"); 

            const emailInput = this.querySelector("input[name='email']");
            const email = emailInput.value.trim();

            if (email === "" || !validateEmail(email)) {
                
                
                alert("Please enter a valid email address.");
                return;
            }

            const formData = new FormData();
            formData.append('email', email);

            try {
                const response = await fetch("php/forgot_password.php", {
                    method: "POST",
                    body: formData,
                });

                const message = await response.text(); 

                if (response.ok) { 
                    alert(message); 
                    showLoginForm();
                } else {
                    
                    alert("Forgot password failed: " + message);
                }
            } catch (error) {
                console.error("Error during forgot password request:", error);
                alert("An error occurred. Please try again later.");
            }
        });
    }

    
    async function updateLoginUI() {
    try {
        const response = await fetch("php/check_login_status.php");
        const data = await response.json();

        if (data.loggedIn) {
            if (loginLink) {
                loginLink.textContent = `Logout (${data.userName})`;
                loginLink.onclick = (e) => {
                    e.preventDefault();
                    
                    fetch("php/logout.php")
                        .then(() => {
                            window.location.href = "index.html"; 
                        });
                };
            }
        } else {
            if (loginLink) {
                loginLink.textContent = "Login";
                loginLink.onclick = (e) => {
                    e.preventDefault();
                    if (modalOverlay) modalOverlay.style.display = "flex";
                    showLoginForm();
                };
            }
        }
    } catch (error) {
        console.error("Error checking login status:", error);
        if (loginLink) {
            loginLink.textContent = "Login";
            loginLink.onclick = (e) => {
                e.preventDefault();
                if (modalOverlay) modalOverlay.style.display = "flex";
                showLoginForm();
            };
        }
    }
}

    
    updateLoginUI();

    
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        const sidebarToggle = document.createElement('div');
        sidebarToggle.className = 'sidebar-toggle';
        sidebarToggle.innerHTML = '<i class="fas fa-chevron-right"></i>';
        sidebar.appendChild(sidebarToggle);

        
        sidebar.classList.add('collapsed');
        document.body.classList.add('sidebar-collapsed');

        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            document.body.classList.toggle('sidebar-collapsed');
            const icon = sidebarToggle.querySelector('i');
            icon.classList.toggle('fa-chevron-right', sidebar.classList.contains('collapsed'));
            icon.classList.toggle('fa-chevron-left', !sidebar.classList.contains('collapsed'));
        });
    }

    
    if (loginLink) {
        loginLink.addEventListener('click', function(e) {
            
            
            if (this.textContent === 'Login') { 
                e.preventDefault();
                if (modalOverlay) modalOverlay.style.display = "flex";
                showLoginForm();
            }
        });
    }
});