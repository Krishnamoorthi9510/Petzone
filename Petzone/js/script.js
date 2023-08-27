// Local Database 
const pets = [
    { id: 1, name: "Max", category: "Fish", breed: "Gold Fish", gender: "Female", age: 4, url: "./images/fish.jpg", price: 140 },
    { id: 2, name: "Bella", category: "Parrot", breed: "Sun Conure", gender: "Male", age: 7, url: "./images/parrot.jpg", price: 260 },
    { id: 3, name: "Maggie", category: "Duck", breed: "Cayuga Duck", gender: "Female", age: 5, url: "./images/duck.jpg", price: 200 },
    { id: 4, name: "Ariel", category: "Rat", breed: "Germah Shephered", gender: "Female", age: 4, url: "./images/rat-1.jpg", price: 60 },
    { id: 5, name: "Oliver", category: "Cat", breed: "Beagle", gender: "Female", age: 10, url: "./images/cat-2.jpg", price: 230 },
    { id: 6, name: "Molly", category: "Dog", breed: "Germah Shephered", gender: "Male", age: 12, url: "./images/dog-1.jpg", price: 450 },
    { id: 7, name: "Lucy", category: "Rabbit", breed: "Dwarf Hotot", gender: "Femal", age: 15, url: "./images/rabbit.jpg", price: 200 },
    { id: 8, name: "daisy", category: "Cat", breed: "prague-Dawley", gender: "Male", age: 9, url: "./images/cat-3.jpg", price: 500 },
    { id: 9, name: "kennal-1", category: "Kennal", breed: "Teak Wood", gender: "Both", age: 0, url: "./images/kennal-1.jpg", price: 270 },
    { id: 10, name: "kennal-2", category: "Kennal", breed: "Pine Wood", gender: "Both", age: 0, url: "./images/kennal-2.jpg", price: 300 },
    { id: 11, name: "kennal-3", category: "Kennal", breed: "Maple Wood", gender: "Both", age: 0, url: "./images/kennal-3.jpg", price: 320 },
    { id: 12, name: "kennal-4", category: "Kennal", breed: "Cherry Wood", gender: "Both", age: 0, url: "./images/kennal-4.jpg", price: 370 },
]

// Product Loading
function loadPets() {
    let result = "";
    for (let pet of pets) {
        result += '<div class="col-md-3 p-4">' +
            '<div class="card" style="width: 18rem;">' +
            '<img src="' + pet.url + '" class="card-img-top" alt="...">' +
            '<div class="card-body">' +
            '<h4 class="card-title">' + pet.name + '</h4>' +
            '<h5 class="card-title">' + pet.breed + ' | ' + pet.category + '</h5>' +
            '<p class="card-text">Gender : ' + pet.gender + ' | <span>Age : ' + pet.age + ' Months</span></p>' +
            '<h6 >Price:$' + pet.price + '</h6>' +
            '<button onclick="addCart(' + pet.id + ',\'' + pet.breed + '\')" class="btn btn-success w-100">Buy</button>' +
            '</div>' +
            '</div>' +
            '</div>';

        document.getElementById("pets").innerHTML = result;
    }
}
loadPets();


// Store Products @Local Storage
function setPetsData() {
    const petsJson = JSON.stringify(pets)
    localStorage.setItem("PETS", petsJson)
}

// Form Section || Validation and GetData
// function getService() {

//     alert( "Request Received");
// }

// function getService() {
//     let name = document.getElementById("reservation_name").value;
//     let email = document.getElementById("reservation_email").value;
//     let phone = document.getElementById("reservation_phone").value;
//     let service = document.getElementById("service_select").value;
//     let date = document.getElementById("reservation_date").value;
//     let message = document.getElementById("form_message").value;
// console.log(name);
// console.log(email);
// console.log(phone);
// console.log(service);
// console.log(date);
// console.log(message);
//     

//     let reservedService = [name, email, phone, service, date, message];

//     const serviceData = JSON.stringify(reservedService);
//     localStorage.setItem("SERVICE", serviceData);

//     alert(`${service} Request Received`);
// }



// Add to Cart
function addCart(id, breed) {
    var productId = {
        "prodId": id
    };
    var cart = JSON.parse(localStorage.getItem("CART")) || [];
    cart.push(productId);
    localStorage.setItem("CART", JSON.stringify(cart));

    alert(`${breed} Added Successfully`);
    openCartModal();
}

// Cart Model
function openCartModal() {
    loadCartItems();

    // Open the cart modal using Bootstrap's modal method
    $('#cartModal').modal('show');
}

// Load Cart
function loadCartItems() {
    var cart = JSON.parse(localStorage.getItem("CART")) || [];
    var cartItemsHtml = "";

    for (var i = 0; i < cart.length; i++) {
        var petId = cart[i].prodId;
        var pet = pets.find(p => p.id === petId);

        if (pet) {
            cartItemsHtml += `
                <div class="cart-item">
                    <div class="row">
                        <div class="col-md-10 ">
                            <div class="cart-item-name">${pet.category} | ${pet.name} | ${pet.breed} </div>
                            <div class="cart-item-gender"> Gender : ${pet.gender} | Age : ${pet.age} Months</div>
                            <div class="cart-item-name">Amount: $ ${pet.price}</div>
                        </div>
                        <div class="col-md-2">
                            <img src="${pet.url}"/>
                        </div>
                        <div class="cancel">
                            <button type="button" class="btn btn-danger mt-3" onclick="removeProduct(${pet.id},${pet.name})"> CANCEL X</button>
                        </div>
                    </div>
                </div>
                <hr/>
            `;
        }
    }

    document.getElementById("cartItems").innerHTML = cartItemsHtml;
}

// Show the cart modal
function openCartModal() {
    loadCartItems();
    $("#cartModal").modal("show");
}


function removeProduct(id, name) {
    // Retrieve cart items from storage
    var cartItems = JSON.parse(localStorage.getItem("CART")) || [];

    // Filter out the product to be removed
    var updatedCartItems = cartItems.filter(function(item) {
        return item.prodId !== id;
    });

    // Update the cart items in storage
    localStorage.setItem("CART", JSON.stringify(updatedCartItems));

    // Reload cart items in the modal
    loadCartItems();

    alert(`${name} Removed Successfully`);
}


