const itemsPerPage = 6; // Number of items per page
let currentPage = 1; // Current page

fetch('https://dummyjson.com/products/categories')
    .then(res => res.json())
    .then(categories => {
        const productList = document.getElementById('productList');
        const pagination = document.getElementById('pagination');

        // Fetch products for each category
        categories.forEach(category => {
            fetch(`https://dummyjson.com/products/category/${category}`)
                .then(res => res.json())
                .then(data => {
                    const products = data.products;
                    renderProducts(products);
                })
                .catch(error => {
                    console.error(`Error fetching products for category ${category}:`, error);
                });
        });
          updatePagination();
    })
    .catch(error => {
        console.error('Error fetching categories:', error);
    });

// Function to render products based on current page
function renderProducts(products) {
    const productList = document.getElementById('productList');

    // Create card for each product
    products.forEach(product => {
        // Create card element
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4');
        card.style.minHeight = "400px"; // Set minimum height for the card

        // Create card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card', 'h-100');

        // Create image element
        const image = document.createElement('img');
        image.src = product.thumbnail;
        image.classList.add('card-img-top', 'product-image'); // Add product-image class
        image.style.height = "200px"; // Set height for the image
        image.style.objectFit = "cover"; // Ensure the image covers the entire space without distortion
        image.alt = product.title;

        // Create card body content
        const cardContent = document.createElement('div');
        cardContent.classList.add('card-body');

        // Add category
        const category = document.createElement('p');
        category.classList.add('product-category');
        category.textContent = product.category;
        cardContent.appendChild(category);

        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = product.title;

        // Add old price with line-through
        const oldPrice = document.createElement('p');
        oldPrice.classList.add('old-price');
        oldPrice.textContent = `$${product.price}`;
        cardContent.appendChild(oldPrice);

        // Calculate discounted price and discount percentage
        const discountPrice = product.price * (1 - product.discount / 100);
        const discount = product.discount;
        const discountOffer = document.createElement('p');
        discountOffer.classList.add('discount-offer');
        discountOffer.textContent = `Offer: ${discount}% OFF`;
        cardContent.appendChild(discountOffer);

        // Add discounted price
        const discountedPrice = document.createElement('p');
        discountedPrice.classList.add('discount-price');
        discountedPrice.textContent = `$${discountPrice.toFixed(2)}`;
        cardContent.appendChild(discountedPrice);

        // Append elements to card body content
        cardContent.appendChild(title);

        // Append elements to card body
        cardBody.appendChild(image);
        cardBody.appendChild(cardContent);

        // Append card body to card
        card.appendChild(cardBody);

        // Append card to product list
        productList.appendChild(card);
    });
}

fetch('https://dummyjson.com/products/categories')
    .then(res => res.json())
    .then(categories => {
        const categoryCarousel = document.querySelector('#categoryCarousel .carousel-inner');
        const slicedCategories = categories.slice(0, 12); // Get the first 4 categories
        const chunkedCategories = chunkArray(slicedCategories, 4); // Chunk categories into arrays of 4
        
        // Define image URLs for each category
        const categoryImages = {
            "smartphones": "images/smartphones.jpg",
            "laptops": "images/laptops.png",
            "fragrances": "images/fragrances.jpg",
            "skincare": "images/skincare.jpg",
            "groceries": "images/groceries.jpg",
            "home-decoration": "images/home-decoration.jpg",
            "furniture": "images/furniture.jpg",
            "tops": "images/tops.jpg",
            "womens-dresses": "images/womens-dresses.jpg",
            "womens-shoes": "images/womens-shoes.jpg",
            "mens-shirts": "images/mens-shirts.jpg",
            "mens-shoes": "images/mens-shoes.jpg",
            "mens-watches": "images/mens-watches.jpg",
            "womens-watches": "images/womens-watches.jpg",
            "womens-bags": "images/womens-bags.jpg",
            "womens-jewellery": "images/womens-jewellery.jpg",
            "sunglasses": "images/sunglasses.jpg",
            "automotive": "images/automotive.jpg",
            "motorcycle": "images/motorcycle.jpg",
            "lighting": "images/lighting.jpg"
            // Add more categories and their image URLs here
        };
        chunkedCategories.forEach((categoryChunk, index) => {
            const categoryItem = document.createElement('div');
            categoryItem.classList.add('carousel-item');
            if (index === 0) {
                categoryItem.classList.add('active');
            }
            const content = `
                <div class="row justify-content-center">
                    ${categoryChunk.map(category => `
                        <div class="category-item col-md-3">
                            <img src="${categoryImages[category]}" alt="${category}" class="img-fluid rounded-circle" onclick="toggleSelected(this)">
                            <span>${category}</span>
                        </div>
                    `).join('')}
                </div>
            `;
            categoryItem.innerHTML = content;
            categoryCarousel.appendChild(categoryItem);
        });
    });

function toggleSelected(img) {
    const selectedItems = document.querySelectorAll('.category-item.selected');
    selectedItems.forEach(item => item.classList.remove('selected'));
    img.classList.add('selected');
}

function chunkArray(arr, size) {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
        chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
}

