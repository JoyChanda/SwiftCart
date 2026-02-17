document.addEventListener("DOMContentLoaded", () => {
    const categoryButtons = document.querySelectorAll(".category-btn");

    categoryButtons.forEach((button) => {
        button.addEventListener("click", () => {
            // Remove active classes from all buttons
            categoryButtons.forEach((btn) => {
                btn.classList.remove("btn-primary", "active");
                btn.classList.add("btn-outline");
            });

            // Add active classes to the clicked button
            button.classList.add("btn-primary", "active");
            button.classList.remove("btn-outline");

            const category = button.getAttribute("data-category");
            console.log(`Filtering by category: ${category}`);

            // Future logic for filtering products can go here
            filterProducts(category);
        });
    });

    function filterProducts(category) {
        // Placeholder for product filtering logic
        const products = document.querySelectorAll(".card");
        // Just a simple visual feedback for now
        products.forEach(p => {
            p.style.opacity = "0";
            setTimeout(() => {
                p.style.opacity = "1";
            }, 300);
        });
    }
});
