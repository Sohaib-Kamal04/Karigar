const freelancers = [
  {
    id: "freelancer1",
    name: "Ali Raza",
    category: "Electrician",
    experience: 5,
    rating: 4.8,
    reviews: 120,
    description: "Certified electrician with 5 years of experience in residential and commercial projects.",
    image: "images/freelancer1.png",
    tag: "best",
    available: true,
    price: "PKR 1200/hour",
    contactPhone: "+92 300 1234567",
    contactEmail: "ali.raza@example.com",
    location: "Islamabad",
  },
  {
    id: "freelancer2",
    name: "Tayyab Khan",
    category: "Plumber",
    experience: 3,
    rating: 4.6,
    reviews: 85,
    description: "Skilled in pipe fitting, repairs, and drainage solutions. Reliable and on-time service.",
    image: "images/freelancer2.png",
    tag: "",
    available: true,
    price: "PKR 1000/hour",
    contactPhone: "+92 301 7654321",
    contactEmail: "fatima.khan@example.com",
    location: "Rawalpindi",
  },
  {
    id: "freelancer3",
    name: "Usman Tariq",
    category: "AC Technician",
    experience: 6,
    rating: 4.9,
    reviews: 200,
    description: "Expert in HVAC repair, installation, and servicing with a high customer satisfaction rate.",
    image: "images/freelancer3.png",
    tag: "new",
    available: false,
    price: "PKR 1500/hour",
    contactPhone: "+92 302 9876543",
    contactEmail: "usman.tariq@example.com",
    location: "Lahore",
  },
];



const materialCardsContainer = document.querySelector(".material-cards");
const searchInput = document.querySelector(".search-bar");
const categoryDropdown = document.querySelector(".category-dropdown");
const ratingCheckboxes = document.querySelectorAll('input[name="rating"]');
const availabilityCheckbox = document.getElementById("availability");


const modals = {};
freelancers.forEach((f) => {
  modals[f.id] = document.getElementById(f.id);
});


function renderFreelancers(list) {
  materialCardsContainer.innerHTML = "";
  if (list.length === 0) {
    materialCardsContainer.innerHTML = "<p>No freelancers found matching criteria.</p>";
    return;
  }

  list.forEach((freelancer) => {
    const card = document.createElement("div");
    card.className = "material-card freelancer-card";
    card.setAttribute("tabindex", 0);
    card.dataset.id = freelancer.id;

    card.innerHTML = `
      <img src="${freelancer.image}" alt="${freelancer.name}" class="material-img" />
      <h3>${freelancer.name} ${
      freelancer.tag
        ? `<span class="tag ${freelancer.tag}">${freelancer.tag === "best" ? "Top Rated" : "New"}</span>`
        : ""
    }</h3>
      <p class="category">${freelancer.category} • ${freelancer.experience} years</p>
      <p class="rating">⭐ ${freelancer.rating} (${freelancer.reviews} reviews)</p>
      <button class="cta-btn book-service">Book Now</button>
    `;

    
    card.addEventListener("click", () => openModal(freelancer.id));
    card.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        openModal(freelancer.id);
        e.preventDefault();
      }
    });

    materialCardsContainer.appendChild(card);
  });
}


function openModal(id) {
  closeAllModals();

  const modal = modals[id];
  if (!modal) return;

  const freelancer = freelancers.find(f => f.id === id);
  if (!freelancer) return;

  modal.innerHTML = generateModalContent(freelancer);

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");

  const closeBtn = modal.querySelector(".close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => closeModal(id));
    closeBtn.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") closeModal(id);
    });
    closeBtn.focus();
  }

  const bookBtn = modal.querySelector(".book-service");
  if (bookBtn && freelancer.available) {
    bookBtn.addEventListener("click", (e) => {
      e.stopPropagation();  
      handleBooking(id);
    });
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(id);
  });
}




function closeModal(id) {
  const modal = modals[id];
  if (!modal) return;
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
}


function closeAllModals() {
  Object.values(modals).forEach((modal) => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  });
}


function handleBooking(serviceId) {
  const service = freelancers.find(f => f.id === serviceId);
  if (!service) return alert("Service not found");

  const data = {
    service_id: service.id, 
    customer_name: "Test Customer",  
    requested_time: "2 PM - 4 PM"
  };

  fetch("php/book_service.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"   
    },
    body: JSON.stringify(data)
  })
  .then(response => response.text()) 
  .then(result => {
    alert("Booking successful!");
    closeModal(serviceId);
  })
  .catch(error => {
    alert("Booking failed. Please try again.");
    console.error("Booking error:", error);
  });
}



function applyFilters() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const category = categoryDropdown.value;
  const selectedRatings = Array.from(ratingCheckboxes)
    .filter((cb) => cb.checked)
    .map((cb) => Number(cb.value));
  const inStockOnly = availabilityCheckbox.checked;

  const filtered = freelancers.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm) || f.category.toLowerCase().includes(searchTerm);
    const matchesCategory = category ? f.category === category : true;
    const matchesRating = selectedRatings.length ? selectedRatings.some(r => Math.floor(f.rating) === r) : true;
    const matchesAvailability = inStockOnly ? f.available === true : true;

    return matchesSearch && matchesCategory && matchesRating && matchesAvailability;
  });

  renderFreelancers(filtered);
}

function generateModalContent(f) {
  return `
    <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="${f.id}-title">
      <span class="close" tabindex="0" role="button" aria-label="Close modal">&times;</span>
      <h2 id="${f.id}-title">${f.name} - ${f.category} ${f.tag ? `<span class="tag ${f.tag}">${f.tag === "best" ? "Top Rated" : "New"}</span>` : ''}</h2>
      <p><strong>Experience:</strong> ${f.experience} years</p>
      <p><strong>Rating:</strong> ⭐ ${f.rating} (${f.reviews} reviews)</p>
      <p><strong>Price:</strong> ${f.price}</p>
      <p><strong>Availability:</strong> ${f.available ? "<span style='color:green;'>Available</span>" : "<span style='color:red;'>Not Available</span>"}</p>
      <p><strong>Location:</strong> ${f.location}</p>
      <p><strong>Contact:</strong> <a href="tel:${f.contactPhone}">${f.contactPhone}</a> | <a href="mailto:${f.contactEmail}">${f.contactEmail}</a></p>
      <p>${f.description}</p>
      <button class="cta-btn book-service" ${!f.available ? "disabled title='Not available now'" : ""}>Book Now</button>
    </div>
  `;
}



window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const anyOpen = Object.values(modals).some(modal => modal.classList.contains("active"));
    if (anyOpen) closeAllModals();
  }
});


searchInput.addEventListener("input", applyFilters);
categoryDropdown.addEventListener("change", applyFilters);
ratingCheckboxes.forEach(cb => cb.addEventListener("change", applyFilters));
availabilityCheckbox.addEventListener("change", applyFilters);


renderFreelancers(freelancers);
initModalButtons();
