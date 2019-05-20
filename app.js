// create a callback function that inserts the response into the nav div

function grabNav(response) {
  $('#nav').html(response);
}


// // use the .get() method to call the header.html component
$.get('./components/header.html', grabNav);


// console.log('Hello');

// ============================================== //
// ==== Grabbing data from JSON using jQuery ==== //
// ============================================== //

// jQuery automatically turns the response into a parsed JS object
// It also automatically opens and sends the response right away

// step 1: create a callback function

// function showNames(response) {
//   // console.log(res);
//   // start the unordered list
//   // let html = '<ul>';
//
//   let res = Object.keys(response[0]);
//
// console.log(res);
// }
//
// //  // add to body_html for each animal, as a row
// function showValues(response) {
//   for (let i in response) {
//     console.log(response[i].name);
//     }
//     let html = '<ul>';
//     // insert list items to be shown
//     for (let i in response.people) {
//       let id = response.id;
//       let name = person.name;
//       let price = person.price;
//       let description = person.description;
//       let img_url = person.img_url;
//       html+= `<li>${name} is ${age} years old</li>`;
//     }
//
//     // end the unordered list
//     html += '</ul>';
//
//     $('#jquery_products').html(html);
// }
//
// //  // step 2: create call
// $.get('./products.json', showNames);
//
// $.get('./products.json', showValues);


function showProds(res) {
  // console.log(res);

  let headers = Object.keys(res[0]);

  // console.log(headers);

  // create card information for each product
  let body_html = '';
  let count = 0

  for (let i in res) {
      if (count == 0) {
        body_html += `<div class="row">`;
        count += 1
      } else if (count%3 == 0 && count !=0 ) {
        body_html += `</div>
                    <div class="row">`;
        count += 1
      } else {
      count += 1
      }
    body_html += `
    <div class="col-md-4 col-sm-6">
    <div class="card">
    <div class="card-img">
    <img src=${res[i].img_url} alt="Image"></div>
      <div class="card-title">${res[i].name}</div>
        <div class="card-subtitle">${res[i].price}</div>
          <div class="card-text">
          <p>${res[i].description}</p>
          </div>
          <button onClick="addToCart('${res[i].id}')" class="btn btn-success">Add to Cart</button>
          </div>
          </div>
    `;}
  $('#prodcards').html(body_html);
}


$.get('./products.json', showProds);







cart = [];

displayCart = {};

function addToCart(id) {
  cart.push(id)
  showCart(cart)
}

function showCart(cart) {

  $.get('products.json', function(res) {
    $('#checkout').html('<tr><th><b>#</b></th><th><b>Product</b></th><th><b>$</b></th><th><b>Remove</b></th></tr>')
    total = 0
    for (let j in res) {
      quantity = 0
      for (let i in cart) {
        if (res[j].id == cart[i]) {
          name = res[j].name
          quantity += 1
          price = res[j].price
          id = res[j].id
        }
      }

      if (quantity > 0) {
        displayCart[name] = {'quantity': quantity, 'price': price}
        total += quantity * price
      }
    }

    console.log(displayCart)

    for (var key in displayCart) {
      if (displayCart.hasOwnProperty(key)) {
        $('#checkout').append(`<tr><td>${displayCart[key].quantity}</td><td>${key}</td><td>${displayCart[key].quantity * displayCart[key].price}</td></td><td><button onClick="removeFromCart(${id})" type="submit" id="submit-btn" class="btn btn-danger">X</button></td></tr>`)
      }
    }
    $('.total').text(`Total: ${total.toFixed(2)}`)
  })
}




function showProdsTable(res) {
  console.log(res);

  let headers = Object.keys(res[0]);

  console.log(headers);

  // create a header html string
  let header_html = '<thead><tr><th>#</th><th>name</th><th>$</th><th>Rem.</th>';


  // end row and header
  header_html += '</tr></thead>';

  // create body information for each animal
  let body_html = '<tbody>';

  // add to body_html for each animal, as a row
  for (let i in res) {
    body_html += `
      <tr>
        <td>${parseInt(i) + 1}</td>
        <td>${res[i].name}</td>
        <td>${res[i].price}</td>
      </tr>
    `;
  }

  $('#prodtable').html(header_html + body_html);

}


$.get('./products.json', showProdsTable);












///////////////////////////////////////

//
// cart = [];
//
// displayCart = {};
//
// function addToCart(id) {
//   cart.push(id)
//   showCart(cart)
// }
//
// function showCart(cart) {
//
//   $.get('products.json', function(res) {
//     $('#checkout').html('<tr><th><b>#</b></th><th><b>Product</b></th><th><b>$</b></th><th><b>Remove</b></th></tr>')
//     total = 0
//     for (let j in res) {
//       quantity = 0
//       for (let i in cart) {
//         if (res[j].id == cart[i]) {
//           name = res[j].name
//           quantity += 1
//           price = res[j].price
//           id = res[j].id
//         }
//       }
//
//       if (quantity > 0) {
//         displayCart[name] = {'quantity': quantity, 'price': price}
//         total += quantity * price
//       }
//     }
//
//     console.log(displayCart)
//
//     for (var key in displayCart) {
//       if (displayCart.hasOwnProperty(key)) {
//         $('#checkout').append(`<tr><td>${displayCart[key].quantity}</td><td>${key}</td><td>${displayCart[key].quantity * displayCart[key].price}</td></td><td><button onClick="removeFromCart(${id})" type="submit" id="submit-btn" class="btn btn-danger">X</button></td></tr>`)
//       }
//     }
//     $('.total').text(`Total: ${total.toFixed(2)}`)
//   })
// }

// function showProducts(response) {
//   for (let i in response) {
//     let id = response[i].id
//     let name = response[i].name;
//     let price = response[i].price;
//     let description = response[i].description;
//     let image = response[i].img_url;
//     $('.products').append(
//       ` <div class="card">
//
//           <img src="${image}" alt="${name}" class="card-img">
//           <div class="card-title">${name}</div>
//           <div class="card-subtitle">${price}</div>
//           <div class="card-text"><p>${description}</p></div>
//           <button onClick="addToCart('${id}')" type="submit" id="submit-btn" class="btn btn-primary soap">Add to Cart</button>
//         </div>`
//     )
//   }
// }


// $.get('./products.json', showProducts);
