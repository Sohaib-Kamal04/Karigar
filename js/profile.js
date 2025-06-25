document.addEventListener("DOMContentLoaded", () => {
  const editBtn = document.querySelector(".edit-btn");
  const editModal = document.getElementById("editProfileModal");
  const closeModal = document.getElementById("closeEditModal");

  editBtn?.addEventListener("click", () => {
    editModal.style.display = "block";
  });

  closeModal?.addEventListener("click", () => {
    editModal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === editModal) {
      editModal.style.display = "none";
    }
  });

  const currentName = document.querySelector(".profile-info h2").childNodes[0].textContent.trim();
  const currentUsername = document.querySelector(".username")?.textContent.replace("@", "").trim();
  const currentLocation = document.querySelector(".location")?.textContent.split("·")[0]?.replace("📍", "").trim();
  const currentBio = document.querySelector(".bio")?.textContent.trim();

  document.getElementById("editName").value = currentName || "";
  document.getElementById("editUsername").value = currentUsername || "";
  document.getElementById("editLocation").value = currentLocation || "";
  document.getElementById("editBio").value = currentBio || "";

  document.getElementById("editProfileForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", document.getElementById("editName").value);
    formData.append("location", document.getElementById("editLocation").value);
    formData.append("bio", document.getElementById("editBio").value);

    fetch("update-profile.php", {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Profile updated successfully.");
          location.reload();
        } else {
          alert(data.error || "Something went wrong.");
        }
      })
      .catch(() => alert("Request failed."));
  });

  const activityList = document.getElementById("activity-list");
  if (activityList) {
    const activities = [
      "Accepted a plumbing request from Bilal.",
      "Completed electrician job in Saddar.",
      "Updated profile information.",
      "Reviewed booking from Ali Khan.",
      "Payment received via JazzCash."
    ];

    activities.forEach(activity => {
      const li = document.createElement("li");
      li.textContent = activity;
      activityList.appendChild(li);
    });
  }
});
