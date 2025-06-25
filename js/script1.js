const materials = [
  {
    id: 1,
    name: "Pipe - PVC",
    category: "pipes",
    price: 550,
    rating: 5,
    stock: true,
    image: "images/material1.jpg",
    description: "Durable PVC pipe suitable for plumbing and irrigation.",
    tag: "best",
  },
  {
    id: 2,
    name: "Copper Wire",
    category: "electric",
    price: 1200,
    rating: 4,
    stock: true,
    image: "images/material2.jpg",
    description: "High-quality copper wire for electrical wiring projects.",
    tag: "",
  },
  {
    id: 3,
    name: "AC Compressor",
    category: "ac",
    price: 350,
    rating: 3,
    stock: false,
    image: "images/material3.jpg",
    description: "Efficient AC compressor for various air conditioning units.",
    tag: "new",
  },
  {
    id: 4,
    name: "Cement - Premium",
    category: "cement",
    price: 800,
    rating: 5,
    stock: true,
    image: "images/cement.jpg",
    description: "High-strength cement for construction and repairs.",
    tag: "best",
  },
];

const materialCardsContainer = document.querySelector(".material-cards");
const modal = document.getElementById("materialModal");
const modalTitle = modal.querySelector("#modalTitle");
const modalDesc = modal.querySelector("#modalDesc");
const closeBtn = modal.querySelector(".close-btn");
const bookingForm = modal.querySelector("#bookingForm");
const quantityInput = modal.querySelector("#quantityInput");
const locationInput = modal.querySelector("#locationInput");
const totalPriceEl = document.getElementById("totalPrice");

const searchInput = document.querySelector(".search-bar");
const categoryDropdown = document.querySelector(".category-dropdown");
const priceRange = document.getElementById("priceRange");
const maxPriceLabel = document.getElementById("max-price");
const ratingCheckboxes = document.querySelectorAll('input[name="rating"]');
const availabilityCheckbox = document.getElementById("availability");

let filteredMaterials = materials;
let currentMaterialPrice = 0;


function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


function renderMaterials(list) {
  materialCardsContainer.innerHTML = "";
  if (list.length === 0) {
    materialCardsContainer.innerHTML = "<p>No materials found matching criteria.</p>";
    return;
  }
  list.forEach((material) => {
    const card = document.createElement("div");
    card.className = "material-card";
    card.setAttribute("tabindex", 0); 
    card.dataset.id = material.id;
    card.innerHTML = `
      <img src="${material.image}" alt="${material.name}" class="material-img" />
      <h3>${material.name} ${
      material.tag ? `<span class="tag ${material.tag}">${material.tag === "best" ? "Best Seller" : "New"}</span>` : ""
    }</h3>
      <p class="category">${capitalize(material.category)}</p>
      <p class="price">PKR ${material.price.toLocaleString()}</p>
    `;
    card.addEventListener("click", () => openModal(material.id));
    card.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") openModal(material.id);
    });
    materialCardsContainer.appendChild(card);
  });
}


function updateTotalPrice() {
  const quantity = Number(quantityInput.value) || 1;
  const total = quantity * currentMaterialPrice;
  totalPriceEl.textContent = `Total Price: PKR ${total.toLocaleString()}`;
}


function openModal(materialId) {
  const material = materials.find((m) => m.id === materialId);
  if (!material) return;
  currentMaterialPrice = material.price; 
  modalTitle.textContent = material.name;
  modalDesc.textContent = material.description + `\nPrice: PKR ${material.price.toLocaleString()}`;
  quantityInput.value = 1;
  locationInput.value = "";
  bookingForm.dataset.materialId = materialId;
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  updateTotalPrice();
  locationInput.focus();
}


function closeModal() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
}


bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const materialId = +bookingForm.dataset.materialId;
  const material = materials.find((m) => m.id === materialId);
  if (!material) return alert("Material not found.");

  const quantity = +quantityInput.value;
  const location = locationInput.value.trim();

  if (quantity < 1 || !location) {
    alert("Please enter a valid quantity and location.");
    return;
  }

  const formData = new FormData();
  formData.append("name", document.getElementById("nameInput").value);
  formData.append("phone", document.getElementById("phoneInput").value);
  formData.append("location", location);
  formData.append("material_id", materialId);
  formData.append("quantity", quantity);

  fetch("php/submit_order.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((result) => {
      if (result.trim() === "success") {
        alert(
          `Booking confirmed:\nMaterial: ${material.name}\nQuantity: ${quantity}\nLocation: ${location}\nTotal Price: PKR ${(quantity * material.price).toLocaleString()}`
        );
        closeModal();
      } else {
        alert("Error: " + result);
      }
    })
    .catch((error) => {
      alert("Network error. Please try again.");
      console.error("Error:", error);
    });

});


closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
});


function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const category = categoryDropdown.value;
  const maxPrice = +priceRange.value;
  const selectedRatings = Array.from(ratingCheckboxes)
    .filter((cb) => cb.checked)
    .map((cb) => +cb.value);
  const inStockOnly = availabilityCheckbox.checked;

  filteredMaterials = materials.filter((mat) => {
    const matchesSearch = mat.name.toLowerCase().includes(searchTerm);
    const matchesCategory = category ? mat.category === category : true;
    const matchesPrice = mat.price <= maxPrice;
    const matchesRating = selectedRatings.length ? selectedRatings.includes(mat.rating) : true;
    const matchesStock = inStockOnly ? mat.stock === true : true;

    return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesStock;
  });

  renderMaterials(filteredMaterials);
}


searchInput.addEventListener("input", applyFilters);
categoryDropdown.addEventListener("change", applyFilters);
priceRange.addEventListener("input", () => {
  maxPriceLabel.textContent = `Rs ${(+priceRange.value).toLocaleString()}`;
  applyFilters();
});
ratingCheckboxes.forEach((cb) => cb.addEventListener("change", applyFilters));
availabilityCheckbox.addEventListener("change", applyFilters);


quantityInput.addEventListener("input", updateTotalPrice);


maxPriceLabel.textContent = `Rs ${(+priceRange.value).toLocaleString()}`;
renderMaterials(materials);
