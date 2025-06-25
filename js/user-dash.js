document.addEventListener("DOMContentLoaded", () => {
  
  const ratingDropdowns = document.querySelectorAll(".rating-dropdown");

  ratingDropdowns.forEach(dropdown => {
    dropdown.addEventListener("change", () => {
      const rating = dropdown.value.length;
      alert(`Thanks for rating ${rating} star${rating > 1 ? 's' : ''}!`);
      dropdown.disabled = true;
    });
  });

  
  const cancelButtons = document.querySelectorAll(".btn-reject");

  cancelButtons.forEach(button => {
    button.addEventListener("click", () => {
      const row = button.closest("tr");
      if (confirm("Are you sure you want to cancel this order?")) {
        row.querySelector("td:nth-child(5)").textContent = "Cancelled";
        button.remove(); 
      }
    });
  });

  const bookNewServiceBtn = document.querySelector(".section-header .btn");
  if (bookNewServiceBtn) {
    bookNewServiceBtn.addEventListener("click", () => {
      window.location.href = "../services.html";  
    });
  }

  
  const invoiceButtons = document.querySelectorAll(".btn-secondary");

  invoiceButtons.forEach(button => {
    button.addEventListener("click", () => {
      alert("Invoice download initiated.");
      
    });
  });

  
  const bookNowButtons = document.querySelectorAll(".card-actions .btn");

  bookNowButtons.forEach(button => {
    button.addEventListener("click", () => {
      const service = button.closest(".material-card").querySelector("h3").textContent;
      alert(`Booking initiated for ${service}.`);
      
    });
  });

  
  const starRatings = document.querySelectorAll('.star-rating');

  starRatings.forEach(starRating => {
    const stars = starRating.querySelectorAll('span');
    let currentRating = 0;  
    let locked = false;     

    function setStars(rating) {
      stars.forEach((star, i) => {
        if (i < rating) {
          star.textContent = '★';  
          star.style.color = 'gold';
        } else {
          star.textContent = '☆';  
          star.style.color = '#ccc';
        }
      });
    }

    
    setStars(0);

    stars.forEach(star => {
      const value = parseInt(star.getAttribute('data-value'));

      star.addEventListener('mouseover', () => {
        if (locked) return;  
        setStars(value);
      });

      starRating.addEventListener('mouseleave', () => {
        if (locked) return;  
        setStars(currentRating);
      });

      star.addEventListener('click', () => {
        currentRating = value;
        locked = true;   
        setStars(currentRating);
        console.log(`Rated ${currentRating} stars for service:`, starRating.dataset.serviceId);
      });
    });
  });

  const logoutLink = document.getElementById('logoutLink');
logoutLink?.addEventListener('click', (e) => {
  e.preventDefault();
  fetch('../php/logout.php', { cache: 'no-store' })
    .then(() => window.location.href = '../index.html')
    .catch((err) => {
      alert('Logout failed.');
      console.error(err);
    });
});


});
