let container = document.querySelector(".mainContainer");
let inputBox = document.querySelector(".inputBox");
let searchBox = document.querySelector(".searchBox");
let home = document.querySelector(".home");
let categoryButtons = document.querySelectorAll(".buttonForCategory");
let cartIcon = document.querySelector(".cart");

let link = "https://dummyjson.com/products";
// console.log(categoryButtons);
// Fetch API
const getData = async () => {
    try {

        let res = await fetch(link);
        let dataFromApi = await res.json();
        let data = dataFromApi.products;
        return data;
    } catch (err) {
        container.innerHTML = '<img class="w-xl h-xl rounded-2xl" src="../img/error.png" alt="Error Occured">';
        console.log(err, "Error Fetching API")
    }
}// Cart
let count = 0;
let arrayOfCarts = [];
const cart = () => {
    let addToCarts = document.querySelectorAll(".addToCart");

    addToCarts.forEach(cart => {
        cart.addEventListener("click", (e) => {
            count++;
            let id = e.target.dataset.id;
            console.log(id)
            getData().then(products => {

                let addedProducts = products.find(item => item.id == id)

                arrayOfCarts.push(addedProducts);

            }
            )
            console.log(count);
            console.log(arrayOfCarts)
        })
    })
}
// Product Listing
const listProduct = () => {
    getData().then(products => {
        let query = inputBox.value.trim().toLowerCase();
        let filterProducts = products.filter(item => item.title.toLowerCase().includes(query));
        let items = filterProducts.map(product => {
            return `<div
            class="bg-white w-80 h-110 border-none p-5 rounded-xl shadow-2xl my-10 mx-5 transform transition duration-300 hover:scale-105"
            >
            <div class="flex justify-center trackCard"> <img
            class="w-60 h-60 items-center"
            src=${product.images[0]}
            alt=${product.title.slice(0, 3)}
            data-id=${product.id}
                /></div>
                
                <p class="py-2 text-center font-bold">${product.title.slice(0, 14)}</p>
                <p  class="py-2 flex justify-center gap-10"><span class="opacity-30">${product.description.slice(0, 20) + "...."}</span></p>
                <p class="  p-1 bg-gray-500  text-white  border-0 w-fit rounded-sm">${product.category}</p>
                <div  class="flex py-2 justify-between">
                <p>$ ${product.price}</p>
                <button data-id=${product.id} class="addToCart  bg-green-500 p-1 text-white rounded-sm px-2" >Add To Cart</button>
                </div>
                </div>`;
        }).join("")
        container.innerHTML = items;
        cart();

        // console.log(items)
    })
}
listProduct();
// Product List According To the User's Query
searchBox.addEventListener('click', () => {
    listProduct();
})

//CategoryData According To the Button Presssed
const categoryData = (filterProducts) => {
    let items = filterProducts.map(product => {
        return `<div
        class=" bg-white w-80 h-110 border-none p-5 rounded-xl shadow-2xl my-10 mx-5 transform transition duration-300 hover:scale-105"
        >
        <div class="flex justify-center trackCard"> <img
        class="w-60 h-60 items-center"
        src=${product.images[0]}
        alt=${product.title}
        data-id=${product.id}
        /></div>
        
                <p class="py-2 font-bold">${product.title}</p>
                <p  class="py-2 flex justify-center gap-10"><span class="opacity-30">${product.description.slice(0, 20) + "...."}</span></p>
                <p class=" p-1 bg-gray-500  text-white  border-0 w-fit rounded-sm">${product.category}</p>
                <div  class="flex py-2 justify-between">
                <p>$ ${product.price}</p>
                <button data-id=${product.id} class="addToCart  bg-green-500 p-1 text-white rounded-sm px-2" >Add To Cart</button>
                </div>
                </div>`;
    }).join("")
    container.innerHTML = items;
}
// Category Buttons and ProductList according to the users choice
categoryButtons.forEach(element => {
    element.addEventListener("click", () => {
        if (element.innerText.trim().toLowerCase() === "groceries") {
            getData().then(products => {
                let filterProducts = products.filter(item => item.category.toLowerCase().includes("groceries"));
                categoryData(filterProducts);

            })
            console.log("Hello groceries")
        } else if (element.innerText.trim().toLowerCase() === "fragrances") {
            getData().then(products => {
                let filterProducts = products.filter(item => item.category.toLowerCase().includes("fragrances"));
                categoryData(filterProducts);

            })
            console.log("Hello fragrances")

        }
        else if (element.innerText.trim().toLowerCase() === "furniture") {
            getData().then(products => {
                let filterProducts = products.filter(item => item.category.toLowerCase().includes("furniture"));
                categoryData(filterProducts);

            })
            console.log("Hello furniture")

        }
        else if (element.innerText.trim().toLowerCase() === "beauty") {
            getData().then(products => {
                let filterProducts = products.filter(item => item.category.toLowerCase().includes("beauty"));
                categoryData(filterProducts);

            })
            console.log("Hello beauty")

        }
        else {
            listProduct();

        }


    })
});

// Product Details
container.addEventListener("click", (e) => {
    if (e.target.tagName == "IMG" && e.target.dataset.id) {
        let idOfSelectedProduct = e.target.dataset.id;
        getData().then(products => {
            let product = products.find(item => item.id == idOfSelectedProduct);
            let filterProducts = [product];
            let items = filterProducts.map(product => {
                return `<div
            class="bg-white w-2xl h-150 border-none p-5 rounded-xl shadow-2xl my-10 mx-5"
            >
            <button class="back bg-green-500 p-1 text-white rounded-sm px-2">Back</button>
            <div class="flex justify-center trackCard"> <img
            class="w-80 h-70 items-center"
            src=${product.images[0]}
            alt=${product.title}
            data-id=${product.id}
                /></div>
                
                <p class="py-2 text-2xl font-bold">${product.title}</p>
                <p  class="py-2 flex justify-center gap-10"><span class="opacity-30">${product.description.slice(0, 150) + "...."}</span></p>
                <p class="  p-1 bg-gray-500  text-white  border-0 w-fit rounded-sm">${product.category}</p>
                <div  class="flex py-2 justify-between">
                <p class="text-xl">$ ${product.price}</p>
                <button data-id=${product.id} class="addToCart bg-green-500 p-1 text-white rounded-sm px-2" >Add To Cart</button>
                </div>
                </div>`;
            }).join("")
            container.innerHTML = items;
            cart();

            //Back Button
            let backButton = document.querySelector(".back");
            backButton.addEventListener("click", () => {
                listProduct();
            })
        })
    }
})
//Home Page
home.addEventListener("click", () => {
    listProduct();
})

// CartIcon

cartIcon.addEventListener("click", () => {
    if (arrayOfCarts.length > 0) {
        let items = arrayOfCarts.map(product => {
            return `<div
            class="bg-white w-80 h-110 border-none p-5 rounded-xl shadow-2xl my-10 mx-5 transform transition duration-300 hover:scale-105"
            >
            <div class="flex justify-center trackCard"> <img
            class="w-60 h-60 items-center"
            src=${product.images[0]}
            alt=${product.title}
            data-id=${product.id}
                /></div>
                
                <p class="py-2 font-bold">${product.title}</p>
                <p  class="py-2 flex justify-center gap-10"><span class="opacity-30">${product.description.slice(0, 20) + "...."}</span>
                <p class="  p-1 bg-gray-500  text-white  border-0 w-fit rounded-sm">${product.category}</p>
                <div  class="flex py-2 justify-between">
                <p>$ ${product.price}</p>
                <button data-id=${product.id} class="removeFromCart bg-emerald-700 p-1 text-white rounded-sm px-2" >Remove</button>
                </div>
                </div>`;
        }).join("")
        container.innerHTML = items;

    } else {
        container.innerHTML = `<h2 class="text-2xl">No Items In Cart</h2>`
    }
    let remove = document.querySelectorAll(".removeFromCart");
    remove.forEach(cart => {
        cart.addEventListener("click", (e) => {
            let id = e.target.dataset.id;
            console.log(id);
            let index = arrayOfCarts.findIndex(item => item.id == id)
            arrayOfCarts.splice(index, 1);
        })
    })


})