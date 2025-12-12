let container = document.querySelector(".mainContainer");
let inputBox = document.querySelector(".inputBox");
let searchBox = document.querySelector(".searchBox");
let categoryButtons = document.querySelectorAll(".buttonForCategory");
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
                alt=${product.title}
                data-id=${product.id}
                /></div>
                
                <p class="py-2 font-bold">${product.title}</p>
                <p  class="py-2 flex justify-center gap-10"><span class="opacity-30">${product.description.slice(0, 20) + "...."}</span><button>Read More</button></p>
                <p class="p-1 bg-gray-500  text-white  border-0 w-fit rounded-sm">${product.category}</p>
                <div  class="flex py-2 justify-between">
                <p>$ ${product.price}</p>
                <button class="bg-green-500 p-1 text-white rounded-sm px-2" >Add To Cart</button>
                </div>
                </div>`;
        }).join("")
        container.innerHTML = items;

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
            class="bg-white w-80 h-110 border-none p-5 rounded-xl shadow-2xl my-10 mx-5 transform transition duration-300 hover:scale-105"
                >
                <div class="flex justify-center trackCard"> <img
                class="w-60 h-60 items-center"
                src=${product.images[0]}
                alt=${product.title}
                data-id=${product.id}
                /></div>
                
                <p class="py-2 font-bold">${product.title}</p>
                <p  class="py-2 flex justify-center gap-10"><span class="opacity-30">${product.description.slice(0, 20) + "...."}</span><button>Read More</button></p>
                <p class="p-1 bg-gray-500  text-white  border-0 w-fit rounded-sm">${product.category}</p>
                <div  class="flex py-2 justify-between">
                <p>$ ${product.price}</p>
                <button class="bg-green-500 p-1 text-white rounded-sm px-2" >Add To Cart</button>
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
