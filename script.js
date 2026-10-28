
const products = [
    {
        name: "Used Laptop",
        price: 18000,
        category: "Electronics",
        seller: "Arun",
        image: "https://placehold.co/300x200?text=Laptop"
    },
    {
        name: "Study Table",
        price: 2500,
        category: "Furniture",
        seller: "Priya",
        image: "https://placehold.co/300x200?text=Study+Table"
    },
    {
        name: "Java Programming Book",
        price: 350,
        category: "Books",
        seller: "Kumar",
        image: "https://placehold.co/300x200?text=Java+Book"
    },
    {
        name: "Used Bicycle",
        price: 4000,
        category: "Vehicles",
        seller: "Rahul",
        image: "https://placehold.co/300x200?text=Bicycle"
    }
];

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const productForm = document.getElementById("productForm");

// Display products
function displayProducts(items) {
    productList.replaceChildren();

    if (items.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "No products found.";
        productList.appendChild(emptyMessage);
        return;
    }

    items.forEach(function(product) {
        const card = document.createElement("div");
        card.className = "product-card";

        const img = document.createElement("img");
        img.src = safeImageUrl(product.image);
        img.alt = product.name;
        img.onerror = function() {
            img.onerror = null;
            img.src = "https://placehold.co/300x200?text=Product";
        };

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.className = "price";
        price.textContent = "₹" + product.price.toLocaleString("en-IN");

        const category = document.createElement("p");
        category.textContent = "Category: " + product.category;

        const seller = document.createElement("p");
        seller.textContent = "Seller: " + product.seller;

        card.append(img, name, price, category, seller);
        productList.appendChild(card);
    });
}

// Allow only HTTP/HTTPS image URLs
function safeImageUrl(value) {
    try {
        const url = new URL(value);
        if (url.protocol === "https:" || url.protocol === "http:") {
            return url.href;
        }
    } catch (error) {
        // Use a placeholder for invalid URLs
    }
    return "https://placehold.co/300x200?text=Product";
}

// Search and category filter
function filterProducts() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    const filteredProducts = products.filter(function(product) {
        const matchesName =
            product.name.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesName && matchesCategory;
    });

    displayProducts(filteredProducts);
}

searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

// Add a new product
productForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("productName").value.trim();
    const price = Number(document.getElementById("productPrice").value);
    const category = document.getElementById("productCategory").value;
    const seller = document.getElementById("sellerName").value.trim();
    const image = document.getElementById("productImage").value.trim();

    if (!name || !seller || !category || !Number.isFinite(price) || price <= 0) {
        document.getElementById("message").textContent =
            "Please enter valid product details.";
        return;
    }

    products.push({
        name: name,
        price: price,
        category: category,
        seller: seller,
        image: image || "https://placehold.co/300x200?text=Product"
    });

    document.getElementById("message").textContent =
        "Product posted successfully!";

    productForm.reset();
    filterProducts();
});

displayProducts(products);
