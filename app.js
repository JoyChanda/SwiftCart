document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.getElementById("product-grid");
    const categoryList = document.getElementById("category-list");

    // Initialize the page
    if (productGrid) {
        loadCategories();
        loadProducts("all");
    }

    async function loadCategories() {
        try {
            const response = await fetch("https://fakestoreapi.com/products/categories");
            const categories = await response.json();

            renderCategories(["all", ...categories]);
        } catch (error) {
            console.error("Error loading categories:", error);
        }
    }

    function renderCategories(categories) {
        if (!categoryList) return;

        categoryList.innerHTML = categories.map(category => `
            <button class="category-btn btn btn-sm rounded-full ${category === 'all' ? 'bg-primary text-white border-primary' : 'btn-outline border-gray-200 text-gray-700'} px-6 capitalize" 
                    data-category="${category}">
                ${category}
            </button>
        `).join("");

        setupCategoryListeners();
    }

    function setupCategoryListeners() {
        const buttons = document.querySelectorAll(".category-btn");
        buttons.forEach(btn => {
            btn.onclick = () => {
                const selectedCategory = btn.getAttribute("data-category");

                // Update UI for all buttons with same category across the page
                document.querySelectorAll(".category-btn").forEach(b => {
                    b.classList.remove("bg-primary", "text-white", "border-primary", "active");
                    b.classList.add("btn-outline", "border-gray-200", "text-gray-700");
                });

                document.querySelectorAll(`.category-btn[data-category="${selectedCategory}"]`).forEach(b => {
                    b.classList.add("bg-primary", "text-white", "border-primary", "active");
                    b.classList.remove("btn-outline", "border-gray-200", "text-gray-700");
                });

                loadProducts(selectedCategory);
            };
        });
    }

    // Call once to setup static buttons on page load
    setupCategoryListeners();

    async function loadProducts(category) {
        // Show skeletons
        renderSkeletons();

        try {
            let url = "https://fakestoreapi.com/products";
            if (category !== "all") {
                url = `https://fakestoreapi.com/products/category/${category}`;
            }

            const response = await fetch(url);
            const products = await response.json();

            renderProducts(products);
        } catch (error) {
            console.error("Error loading products:", error);
            productGrid.innerHTML = `<div class="col-span-full text-center py-20 text-error font-bold text-xl">Failed to load products. Please try again later.</div>`;
        }
    }

    function renderSkeletons() {
        productGrid.innerHTML = Array(8).fill(0).map(() => `
            <div class="animate-pulse">
                <div class="bg-gray-100 aspect-square rounded-3xl mb-6"></div>
                <div class="h-4 bg-gray-100 rounded w-1/4 mb-3"></div>
                <div class="h-6 bg-gray-100 rounded w-full mb-4"></div>
                <div class="h-8 bg-gray-100 rounded w-1/3"></div>
            </div>
        `).join("");
    }

    function renderProducts(products) {
        productGrid.innerHTML = products.map(product => `
            <div class="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-gray-50">
                <div class="bg-[#f3f4f6] aspect-square relative overflow-hidden flex items-center justify-center p-10">
                    <img src="${product.image}" alt="${product.title}" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 mix-blend-multiply" />
                    <div class="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button class="btn btn-circle btn-sm bg-white border-none shadow-lg hover:bg-primary hover:text-white" onclick="event.stopPropagation(); addToCart(${product.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </button>
                    </div>
                </div>
                <div class="p-8">
                    <div class="flex justify-between items-center mb-4">
                        <span class="bg-[#eef2ff] text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">${product.category}</span>
                        <div class="flex items-center gap-1.5 text-sm font-bold">
                            <span class="text-warning text-xl">★</span> ${product.rating.rate} (${product.rating.count})
                        </div>
                    </div>
                    <h3 class="text-xl font-bold mb-4 line-clamp-2 h-14 group-hover:text-primary transition-colors cursor-pointer" title="${product.title}">${product.title}</h3>
                    <p class="text-[32px] font-extrabold text-[#1a1a1a] mb-8 leading-none">$${product.price}</p>
                    <div class="flex gap-4">
                        <button class="btn btn-outline border-gray-200 text-gray-700 flex-1 rounded-2xl h-[56px] font-bold hover:bg-gray-100 hover:text-gray-900 border-2" onclick="showProductDetails(${product.id})">Details</button>
                        <button class="btn btn-primary flex-1 rounded-2xl h-[56px] font-bold text-white shadow-xl shadow-primary/20 hover:scale-105 transition-transform" onclick="addToCart(${product.id})">Add</button>
                    </div>
                </div>
            </div>
        `).join("");
    }

    window.showProductDetails = async (id) => {
        const modal = document.getElementById("product_modal");
        const content = document.getElementById("modal-content");

        if (!modal || !content) return;

        // Show loading state in modal
        content.innerHTML = `
            <div class="flex items-center justify-center w-full p-20">
                <span class="loading loading-spinner loading-lg text-primary"></span>
            </div>
        `;
        modal.showModal();

        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            const product = await response.json();

            content.innerHTML = `
                <div class="md:w-1/2 p-12 bg-[#f3f4f6] flex items-center justify-center">
                    <img src="${product.image}" class="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div class="md:w-1/2 p-12">
                    <span class="bg-[#eef2ff] text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">${product.category}</span>
                    <h2 class="text-3xl font-bold my-6 leading-tight">${product.title}</h2>
                    <div class="flex items-center gap-2 mb-8">
                        <div class="rating rating-sm">
                            ${Array(5).fill(0).map((_, i) => `<input type="radio" class="mask mask-star-2 bg-warning" ${i < Math.round(product.rating.rate) ? 'checked' : ''} disabled />`).join("")}
                        </div>
                        <span class="text-gray-500 font-medium">(${product.rating.count} reviews)</span>
                    </div>
                    <p class="text-gray-600 leading-relaxed mb-10 text-lg">${product.description}</p>
                    <div class="flex items-center justify-between mt-auto">
                        <span class="text-4xl font-extrabold text-primary">$${product.price}</span>
                        <button class="btn btn-primary px-10 rounded-2xl h-[60px] font-bold text-white shadow-xl shadow-primary/20" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            `;
        } catch (error) {
            content.innerHTML = `<div class="p-20 text-center text-error font-bold">Failed to load product details.</div>`;
        }
    };
});

// Global functions (if needed)
function addToCart(productId) {
    console.log(`Product ${productId} added to cart`);
    // Toast notification could go here
}
