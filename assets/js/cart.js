"use strict";

let basket = [];


if (localStorage.getItem("basket") != null) {
    basket = JSON.parse(localStorage.getItem("basket"))
    document.querySelector("#cart .alert-warning").classList.add("d-none");
    document.querySelector(".total-price").classList.remove("d-none");
} else {
    document.querySelector(".basket .count").classList.add("d-none");
    document.querySelector("#cart .table").classList.add("d-none");
    document.querySelector("#cart .alert-warning").classList.remove("d-none");
    document.querySelector(".total-price").classList.add("d-none");
}

if(basket.length == 0){
    document.querySelector("#cart .table").classList.add("d-none");
    document.querySelector("#cart .alert-warning").classList.remove("d-none");
    document.querySelector(".basket .count").classList.add("d-none");
    document.querySelector(".total-price").classList.add("d-none");
}


function basketCount() {
    let basketCount = 0;
    for (const item of basket) {
        basketCount += item.count;
    }
    return basketCount;
}

document.querySelector(".basket .count span").innerText = basketCount();

showBasketDatas(basket);


function showBasketDatas(products){
    let tableBody = document.querySelector(".table tbody");
    for (const item of products) {
        tableBody.innerHTML += `<tr>
        <td><img src="${item.image}" alt=""></td>
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td>${item.count}</td>
        <td>${item.price} ₼</td>
        <td>${item.price * item.count} ₼</td>
        <td>
            <button data-id="${item.id}" class="btn btn-danger delete-btn">Delete</button>
        </td>
        </tr>`
    }
}


deleteBasketItem();



function deleteBasketItem(){

let deleteBtns = document.querySelectorAll(".table button");
deleteBtns.forEach(btn => {
    btn.addEventListener("click",function(){
       

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {

                let productId = parseInt(this.getAttribute("data-id"));
                let existProduct = basket.find(m=>m.id == productId);
                basket = basket.filter(m=>m.id != existProduct.id);
                localStorage.setItem("basket",JSON.stringify(basket));
                document.querySelector(".basket .count span").innerText = basketCount();
                this.parentNode.parentNode.remove();
                if(basket.length == 0){
                    document.querySelector("#cart .table").classList.add("d-none");
                    document.querySelector("#cart .alert-warning").classList.remove("d-none");
                    document.querySelector(".basket .count").classList.add("d-none");
                    document.querySelector(".total-price").classList.add("d-none");
                }
        
                getTotalPrice(basket)


              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
    })
});
}

getTotalPrice(basket);


function getTotalPrice(products){
    let total = 0;
    for (const product of products) {
        total+=product.price*product.count
    }
    
    document.querySelector(".total-price span").innerText = total + " ₼";
}


