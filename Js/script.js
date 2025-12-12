let container = document.querySelector(".mainContainer")
let link = "https://api.escuelajs.co/api/v1/products";
try {
    const data = async () => {
        let res = await fetch(link);
        let dataFromApi = await res.json();
        return dataFromApi;
    }
    data().then(products => {
        let items = products.map(product => {
            return `<div
                class="max-w-2xl border-none p-5 rounded-xl shadow-2xl my-10 mx-5 transform transition duration-300 hover:scale-115"
            >
                <img
                    class="w-50 h-40"
                    src=${product.images[0] || product.image}
                    alt=${product.title}
                />
                <div>
                    <p>${product.title}</p>
                    <p>${product.price}</p>
                    <button>Add To Cart</button>
                </div>
                <p>Description:${product.description}</p>
                <button>View Details</button>
            </div>`;
        }).join('')
        container.innerHTML = items;
        console.log(items)
    }).catch(err => console.log("Error Fetching API", err));
} catch (err) {
    console.log(err);
}
