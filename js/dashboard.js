document.addEventListener("DOMContentLoaded", () => {
  const materialModal = document.getElementById('materialModal');
  const form = document.getElementById('materialForm');
  const orderTable = document.getElementById('orderRequestTable');
  const logoutLink = document.getElementById('logoutLink');

  document.getElementById('addMaterialBtn').onclick = () => {
    form.reset();
    document.getElementById('modalTitle').innerText = 'Add New Material';
    document.getElementById('materialId').value = '';
    materialModal.style.display = 'block';
  };

  function closeModal() {
    materialModal.style.display = 'none';
  }

  async function openEditModal(id) {
    try {
      const response = await fetch(`../dashboards/material-dashboard.php?action=getMaterial&id=${encodeURIComponent(id)}`);
      const data = await response.json();
      if (data.success) {
        document.getElementById('modalTitle').innerText = 'Edit Material';
        document.getElementById('materialId').value = data.material.id;
        document.getElementById('materialName').value = data.material.name;
        document.getElementById('materialCategory').value = data.material.category;
        document.getElementById('materialPrice').value = data.material.price;
        document.getElementById('materialStock').value = data.material.stock;
        materialModal.style.display = 'block';
      } else {
        alert('Failed to fetch material data.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Error fetching material data.');
    }
  }

  window.deleteMaterial = function(id) {
    if (confirm('Are you sure you want to delete this material?')) {
      fetch('../dashboards/material-dashboard.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ action: 'deleteMaterial', id })
      })
      .then(res => res.text())
      .then(resp => {
        if (resp === 'success') location.reload();
        else alert('Failed to delete material.');
      });
    }
  };

  form.onsubmit = function(e) {
    e.preventDefault();
    const data = new URLSearchParams(new FormData(form));
    const action = document.getElementById('materialId').value ? 'editMaterial' : 'addMaterial';
    data.append('action', action);

    fetch('../dashboards/material-dashboard.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: data
    })
    .then(res => res.text())
    .then(resp => {
      if (resp === 'success') location.reload();
      else alert('Failed to save material.');
    });
  };

  orderTable?.addEventListener('click', (e) => {
    const row = e.target.closest('tr');
    if (!row) return;

    const orderId = row.dataset.id;

    if (e.target.classList.contains('btn-accept')) {
      updateOrderStatus(orderId, 'Accepted');
    } else if (e.target.classList.contains('btn-reject')) {
      updateOrderStatus(orderId, 'Rejected');
    } else if (e.target.classList.contains('btn-ship')) {
      updateOrderStatus(orderId, 'Shipped');
    } else if (e.target.classList.contains('btn-deliver')) {
      updateOrderStatus(orderId, 'Delivered');
    } else if (e.target.classList.contains('btn-secondary')) {
      const customerName = row.cells[0].textContent;
      const customerPhone = row.dataset.phone || 'N/A';
      const customerAddress = row.cells[3].textContent;
      showCustomerInfo(customerName, customerPhone, customerAddress);
    } else if (e.target.classList.contains('edit-material')) {
      const materialId = e.target.dataset.id;
      openEditModal(materialId);
    } else if (e.target.classList.contains('delete-material')) {
      const materialId = e.target.dataset.id;
      deleteMaterial(materialId);
    }
  });

  function updateOrderStatus(orderId, status) {
    fetch('../dashboards/material-dashboard.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ action: 'updateOrderStatus', id: orderId, status })
    })
    .then(res => res.text())
    .then(resp => {
      if (resp === 'success') location.reload();
      else alert('Failed to update order status.');
    })
    .catch(err => {
      console.error('Update order error:', err);
      alert('Failed to update order status.');
    });
  }

  function showCustomerInfo(name, phone, address) {
    document.getElementById('custName').innerText = name;
    document.getElementById('custPhone').innerText = phone;
    document.getElementById('custAddress').innerText = address;
    document.getElementById('customerModal').style.display = 'block';
  }

  window.onclick = function(event) {
    if (event.target === materialModal) closeModal();
  };

  logoutLink?.addEventListener('click', e => {
    e.preventDefault();
    fetch('../php/logout.php')
      .then(() => window.location.href = '../login.php');
  });
});
