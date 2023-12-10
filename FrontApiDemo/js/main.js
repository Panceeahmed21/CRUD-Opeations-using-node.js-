let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productDesc = document.getElementById("productDesc");
let errorMessage = document.getElementById("errorMessage");
let successMessage = document.getElementById("successMessage");
let successHint;
let messageErr;
let prodList = [];
let currentID;

function fetchAPI(method, endPoint, data) {
  fetch(`http://localhost:3000/${endPoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((res) => {
      if (res && res.err) {
        console.log(res.err);
        messageErr = res.err;
        showError(messageErr);
      }

      prodList = res.data;

      if (method == "POST" && res.message == "success") {
        successHint = "Product Added successfully";
        showSuccess(successHint);
      }
      displayData();
    });
}
fetchAPI("GET", "products");

function displayData() {
  let cartona = "";

  for (let i = 0; i < prodList.length; i++) {
    cartona += `
        <tr>
                    <td>${prodList[i].name}</td>
                    <td >${prodList[i].price}</td>
                    <td>${prodList[i].description}</td>
                    <td>
                        <div class="btn btn-danger" onclick=deleteProduct(${prodList[i].id})>Delete</div>
                        <div class="btn btn-warning" onclick=getUpdatedProd(${prodList[i].id})>Update</div>
                    </td>
                </tr>
        `;
  }

  document.getElementById("tbody").innerHTML = cartona;
}

function addProduct() {
  if (!productName.value || !productDesc.value || !productPrice.value) {
    messageErr = "Please fill all fields";
    showError(messageErr);
  } else {
    let product = {
      name: productName.value.trim(),
      desc: productDesc.value.trim(),
      price: productPrice.value.trim(),
    };
    fetchAPI("POST", "products", product);
    fetchAPI("GET", "products");
    emptyInputs();
    fetchAPI("GET", "products");
  }
}

function showError(messageErr) {
  document.querySelector(".error").classList.remove("d-none");
  errorMessage.innerHTML = messageErr;
  setInterval(() => {
    document.querySelector(".error").classList.add("d-none");
  }, 2000);
}

function showSuccess(message) {
  document.querySelector(".success").classList.remove("d-none");
  successMessage.innerHTML = message;
  setInterval(() => {
    document.querySelector(".success").classList.add("d-none");
  }, 2000);
}

function deleteProduct(id) {
  fetchAPI("DELETE", "products", { id: id });
  fetchAPI("GET", "products");
}

function getUpdatedProd(id) {
  let currentProduct = prodList.filter((ele) => ele.id == id);
  currentID = id;
  productName.value = currentProduct[0].name;
  productPrice.value = currentProduct[0].price;
  productDesc.value = currentProduct[0].description;

  document.getElementById("add").classList.add("d-none");
  document.getElementById("update").classList.add("d-block");
}

function updateProduct() {
  let product = {
    name: productName.value.trim(),
    desc: productDesc.value.trim(),
    price: productPrice.value.trim(),
    id: currentID,
  };
  fetchAPI("PUT", "products", product);
  fetchAPI("GET", "products");

  document.getElementById("add").classList.remove("d-none");
  document.getElementById("update").classList.add("d-none");
  emptyInputs();
}

function emptyInputs() {
  productName.value = "";
  productDesc.value = "";
  productPrice.value = "";
}
