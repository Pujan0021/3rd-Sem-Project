let container = document.querySelector(".mainContainer");
let inputBox = document.querySelector(".inputBox");
let searchBox = document.querySelector(".searchBox");
let link = "https://dummyjson.com/products";



//For Users Query
searchBox.addEventListener('click', () => {
    let query = inputBox.value.trim().toLowerCase();
    console.log(query)

    try {
        const data = async () => {
            let res = await fetch(link);
            let dataFromApi = await res.json();
            return dataFromApi.products;
        }
        data().then(products => {
            let filterProducts = products.filter(item => item.title.toLowerCase().includes(query));
            let items = filterProducts.map(product => {
                return `<div
                class="bg-white w-80 h-110 border-none p-5 rounded-xl shadow-2xl my-10 mx-5 transform transition duration-300 hover:scale-105"
                >
                <div class="flex justify-center trackCard"> <img 
                class=" w-60 h-60 items-center"
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
        }).catch(err => console.log("Error Fetching API", err));
    } catch (err) {
        console.log(err);
    }
})


try {
    const data = async () => {
        let res = await fetch(link);
        let dataFromApi = await res.json();
        return dataFromApi.products;
    }
    data().then(products => {
        let items = products.map(product => {
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
    }).catch(err => console.log("Error Fetching API", err));
} catch (err) {
    console.log(err);
}


