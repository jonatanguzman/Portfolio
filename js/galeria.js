document.querySelectorAll('.open-gallery').forEach(img => {
  img.addEventListener('click', () => {
    const galleryName = img.dataset.gallery;
    const allImages = document.querySelectorAll(`.open-gallery[data-gallery="${galleryName}"]`);

    const carouselInner = document.getElementById('galleryCarouselInner');
    carouselInner.innerHTML = '';

    allImages.forEach((image, index) => {
      const activeClass = (image.src === img.src) ? 'active' : '';
      carouselInner.innerHTML += `
        <div class="carousel-item ${activeClass}">
          <img src="${image.src}" class="d-block w-100" alt="">
        </div>
      `;
    });

    const modal = new bootstrap.Modal(document.getElementById('galleryModal'));
    modal.show();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  'use strict';

  var forms = document.querySelectorAll('.needs-validation');

  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#contactForm"); 
  const status = document.querySelector("#formStatus"); 

   function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.role = "alert";
    alert.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    `;
    status.innerHTML = ""; 
    status.appendChild(alert);

    setTimeout(() => {
      alert.classList.remove("show"); 
      setTimeout(() => {
        const bsAlert = bootstrap.Alert.getOrCreateInstance(alert);
        bsAlert.close();
      }, 500); 
    }, 4000);
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); 

    if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return; 
    }

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        showAlert("success", "✅ ¡Mensaje enviado con éxito!");
        form.reset();
        form.classList.remove("was-validated");
      } else {
        showAlert("danger", "❌ Hubo un problema. Intenta de nuevo.");
      }
    } catch (error) {
      showAlert("warning", "⚠️ Error de conexión. Verifica tu internet.");
    }
  });
  
  form.querySelector('button[type="reset"]').addEventListener("click", function (e) {
    e.preventDefault(); 
    form.reset();       
    form.classList.remove("was-validated"); 
  });

});

 const switchInput = document.getElementById("darkModeSwitch");
  const body = document.body;
  const iconSun = document.getElementById("icon-sun");
  const iconMoon = document.getElementById("icon-moon");

  if (localStorage.getItem("dark-mode") === "true") {
    body.classList.add("dark-mode");
    switchInput.checked = true;
    iconSun.classList.add("d-none");
    iconMoon.classList.remove("d-none");
  }

  switchInput.addEventListener("change", () => {
    body.classList.toggle("dark-mode");

    iconSun.classList.toggle("d-none");
    iconMoon.classList.toggle("d-none");

    localStorage.setItem("dark-mode", body.classList.contains("dark-mode"));
  });
  