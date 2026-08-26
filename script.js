document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("detail-modal");
    
    
    if (modal) {
        const modalImg = document.getElementById("modal-img");
        const modalTitle = document.getElementById("modal-title");
        const modalDesc = document.getElementById("modal-desc");
        const modalPrice = document.getElementById("modal-price");
        const closeModalBtn = document.getElementById("close-modal");

        const menuItems = document.querySelectorAll(".cta-detail");

        menuItems.forEach(item => {
            item.addEventListener("click", function () {
                modalTitle.innerText = this.getAttribute("data-title");
                modalDesc.innerText = this.getAttribute("data-desc");
                modalPrice.innerText = this.getAttribute("data-price");
                modalImg.src = this.getAttribute("data-img");
                modal.classList.add("active");
            });
        });

        closeModalBtn.addEventListener("click", function () {
            modal.classList.remove("active");
        });

        window.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.classList.remove("active");
            }
        });
    }
});