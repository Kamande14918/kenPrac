// const students = [
//     { id:1, name:"Kennedy Kamau Kamande", course:"BSc. Electronics and Computer Engineering", hobies:["Reading","Coding","Cycyling"]},
   
//     {id:3, name:"Stephen Ochieng Otieno", course:"BSc. Financial Engineering", hobies:["Reading","Cooking","Analyzing financial markets"]},
//      {id:2, name:"Luois Sabrina Ngonge", course:"Business Information Technology", hobies:["Reading","Dancing","Traveling"]},
// ];

// // // manipulating the array
// // students.forEach((student) => {
// //     console.log(student.name);
// // })

// // map method
//  const studentInfo = students.map(student =>{
//     return{
//         id: student.id,
//         name: student.name,
//         course: student.course,
//         hobies:  student.hobies.join(",")
//     }

//  })
//  console.log(studentInfo);

// //  
// const sortedStudents = students.sort((a,b) =>{
//     if(a.name < b.name) return -1;
//     else {
//         return 1;
//     }
// });

// console.log(sortedStudents);
// // filter method
// const filteredStudents = students.filter(student => student.name.toLowerCase().includes("s"));

// console.log("Filtered students:",filteredStudents);

// // fincd method
// const existingStudent = students.find(student => student.id === 1);
// if(!existingStudent){
//     console.log("Student not found!");
// } else {
//     console.log("Student found:", existingStudent);
// }



// // DOM manipulation 
// let btn = document.getElementById("myBtn");
// btn.addEventListener("click", function(){
//     alert("Thank for signing up in our platform")
// });
// // selecting elements
// let heading = document.getElementById("title");
// // Changing text content
// heading.textContent="Sabrina's Mechanic Workshop";

// // Appending and creating elements
// let newPara  = document.createElement("p");
// newPara.textContent="We offer the best services in town. Visit us today for all your car needs and get a 20% discount on your first service.";
// document.body.appendChild(newPara);

// Working with third party apis to fetch data and manipulate and work with it on a webpage

// Sabrina's Fashion Store

const apiUrl = "https://fakestoreapi.com/products";
const container = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");

let allProducts = [];

// fetch products 
async function fetchProducts(){
    try {
        const res = await fetch(apiUrl);
        const products = await res.json();
        allProducts = products;
        renderProducts(products); //initial render

    } catch (error) {
        console.error("Error fetching products:",error);
    }
}
// function to render the products
function renderProducts(productArray){
    container.innerHTML =""; // clear the previous content
    productArray.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className="product-card";
        productCard.innerHTML = `
        <img src="${product.image}" alt="${product.title}"class="product-image" />
        <h2 class="product-title">${product.title}</h2>
        <p class="product-price">$${product.price}</p>
        <p class="product-description">${product.description}</p>
        <button class="add-to-cart">Add to Cart</button>
         `;
         productCard.querySelector(".add-to-cart").addEventListener("click", () => {
            addToCart(product);
         })
         container.appendChild(productCard);
    })
}

// search functionalities
searchInput.addEventListener("input", function(e){
    e.preventDefault();
    const query = e.target.value.toLowerCase();
    const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(query) 
    );
    renderProducts(filteredProducts);
})

fetchProducts();


// Cart functionality
let cart = [];
function addToCart(product){
    const existingProduct = cart.find(item => item.id ===product.id);
    if(existingProduct){
        existingProduct.quantity +=1;
    } else {
        cart.push({...product, quantity: 1});
    }
    renderCart();
}

function renderCart(){
    const cartContainer = document.getElementById("cartContainer");
    cartContainer.innerHTML = "<h3>Your Cart</h3>";
    if(cart.length === 0){
        cartContainer.innerHTML +="<p>Cart is empty.</p>";
        return;
    }

    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `
        <p><strong>${item.title}</strong> x ${item.quantity}</p>
        <p>$${(item.price * item.quantity).toFixed(2)}</p>`;
        cartContainer.appendChild(itemDiv);
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartContainer.innerHTML +=`<h4><strong>Total: $${total.toFixed(2)}</strong></p>`
}