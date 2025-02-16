//ჩამოსქროლვისას ჰედერს ფონი ეცვლება.
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

//ბურგერ მენიუ
document.addEventListener("DOMContentLoaded", function() {
    const burger = document.querySelector(".burger-menu");
    const navMenu = document.querySelector("nav ul");

    burger.addEventListener("click", function() {
        navMenu.classList.toggle("active");
    });
});

//api-ს საშუალებით რენდომ იუზერის სახელისა და სურათის წამოღება
function fetchRandomUsers() {
    fetch("https://randomuser.me/api/?results=4")
        .then(response => response.json())
        .then(data => {
            let users = data.results;

            let testimonials = document.querySelectorAll(".testimonial");

            for (let i = 0; i < testimonials.length; i++) {
                if (users[i]) {
                    let user = users[i];

                    let userImage = testimonials[i].querySelector(".user-image");
                    let userName = testimonials[i].querySelector(".name");

                    if (userImage && userName) {
                        userImage.src = user.picture.large;
                        userName.innerText = user.name.first + " " + user.name.last;
                    }
                } else {
                    console.warn(`No user data available for testimonial ${i + 1}`);
                }
            }
        })
        .catch(error => console.error("Error fetching user data:", error));
}
fetchRandomUsers();

//Cookies
document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookiesButton = document.getElementById('acceptCookies');

    console.log(localStorage.getItem('cookiesAccepted')); 

    if (localStorage.getItem('cookiesAccepted') === 'true') {
        console.log('Cookies were already accepted.');
        cookieBanner.style.display = 'none'; 
    } else {
        console.log('Cookies have not been accepted yet.');
        cookieBanner.style.display = 'block'; 
    }

    acceptCookiesButton.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        console.log('Cookies accepted!');
        cookieBanner.style.display = 'none';
    });
});


//Registration 

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("registerModal");
    const openModalBtn = document.querySelector("nav ul li:nth-child(5)"); 
    const closeModalBtn = document.querySelector(".close");
    const registerForm = document.getElementById("registerForm");
    const errorMessage = document.querySelector(".error-message");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.querySelector(".toggle-password");
  
    openModalBtn.addEventListener("click", () => {
      modal.style.display = "flex";
      document.body.classList.add("modal-open");
    });
  
    closeModalBtn.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.classList.remove("modal-open");
    });
  
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
      }
    });
  //პაროლის ვალიდაცია
    togglePassword.addEventListener("click", () => {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
      } else {
        passwordInput.type = "password";
      }
    });
  
    // ფორმის ვალიდაცია
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = passwordInput.value.trim();
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  
      if (!name || !email || !password) {
        errorMessage.textContent = "All fields are required!";
        return;
      }
  
      if (!emailRegex.test(email)) {
        errorMessage.textContent = "Invalid email format!";
        return;
      }
  
      if (!passwordRegex.test(password)) {
        errorMessage.textContent =
          "Password must be at least 8 characters, including a number!";
        return;
      }
  
      errorMessage.textContent = "";
      alert("Registration successful!");
      registerForm.reset();
      modal.style.display = "none";
      document.body.classList.remove("modal-open");
    });
  });
  

