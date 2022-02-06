//---------------------------------------------------------------SECTION ITEM---------------------------------------------------------
//buat dua array, cart dan menus
let cart = []
let menus = [
    {
        'id' : 1,
        'name' : 'Caramel Machiato',
        'price' : 4.5,
        'stok' : 10,
        'image' : '/Images/17.png',
    },
    {
        'id': 2,
        'name': 'Espresso',
        'price': 3,
        'stok': 10,
        'image': '/Images/16.png',
    },
    {
        'id': 3,
        'name': 'Cappucino',
        'price': 5,
        'stok': 10,
        'image': '/Images/18.png',
    },
]

let row = document.querySelector('.row')
let allitem = ``
menus.forEach(val => {
    let item = `<div class="card col-md-4">
                    <img class="card-img-top" src="${val.image}" alt="Card image cap">
                    <div class="card-body">
                        <h4 class="card-title">${val.name}</h4>
                        <h3 class="card-title">$ ${val.price}</h3>
                        <small id=stok"${val.id}">Stok : ${val.stok}</small><br>
                        <button id="${val.id}" class="btn btn-success add">Pilih</button>
                    </div>
                </div>`
    allitem += item
})
row.innerHTML = allitem
//---------------------------------------------------------------END SECTION---------------------------------------------------------

//button add
let adds = document.querySelectorAll('.add')
//fucntion untuk mengecek apakah item yang dipilih sudah ada di dalam cart
let isFound = (param) => {
    return cart.findIndex(item => item.id == param)
}

//push item ke dalam cart ketika memilih item
for (let i = 0; i<menus.length; i++) {
    adds[i].addEventListener('click', () => {
        idx = (adds[i].id - 1)
        let qty = 1
        item = {
            'id': menus[idx].id,
            'qty': qty,
            'name': menus[idx].name,
            'price': menus[idx].price,
            'total': Number(menus[idx].price) * qty
        }

        if (cart.length === 0) {
            cart.push(item)
        } else {
            if (isFound(adds[i].id) === -1) {
                cart.push(item)
            } else {
                let foundIdx = isFound(adds[i].id)
                cart[foundIdx].qty += 1
                cart[foundIdx].total = cart[foundIdx].price * cart[foundIdx].qty
            }
        }

        alertify.success(menus[idx].name+" Berhasil ditambahkan");
    })
}

//tampilkan dalam td
let btnCart = document.getElementById('btnCart')
let cartTable = document.getElementById('cart')
let total = document.getElementById('total')

makeCart = () => {
    let temp = ``
    let sum = 0
    cart.forEach(item => {
        temp += `
            <tr>
                <td>${item.name}</td>
                <td>
                    <button class="increase btn btn-success btn-sm">+</button>
                    <input type="number" id="${item.id}" class="qty text-center" value="${item.qty}">
                    <button class="decrease btn btn-danger btn-sm">-</button>
                </td>
                <td class="price">$ ${item.price}</td>
                <td class="total">$ ${item.total}</td>
                <td>
                    <button class="del btn btn-danger" id="${item.id}">delete</button>
                </td>
            </tr>
        `
        sum += item.total
    })
    total.innerHTML = "$ " + sum
    cartTable.innerHTML = temp

    //counter qty pada table cart
    let inc = document.querySelectorAll('.increase')
    let dec = document.querySelectorAll('.decrease')
    let inQty = document.querySelectorAll('.qty')
    let prices = document.querySelectorAll('.price')
    let totals = document.querySelectorAll('.total')

    for (let i = 0; i < cart.length; i++) {
        let idx = isFound(inQty[i].id)
        let val = Number(inQty[i].value)
        let price = Number(prices[i].textContent.replace(/[$]/g, ''))
        let totalPrice = Number(total.innerText.replace(/[$]/g, ''))
        console.log(idx)
        inc[i].addEventListener('click', () => {
            totalPrice = (totalPrice - (val * price))
            val += 1
            inQty[i].setAttribute('value', val)
            totals[i].textContent ="$ " + (val * price)
            totalPrice = (totalPrice + (val * price))
            total.innerHTML ="$" + totalPrice
            cart[idx].qty = val
            cart[idx].total = (val * price) 
        })

        dec[i].addEventListener('click', () => {
            if (val > 1) {
                totalPrice = (totalPrice - (val * price))
                val -= 1
                inQty[i].setAttribute('value', val)
                totals[i].textContent = "$ " + (val * price)
                totalPrice = (totalPrice + (val * price))
                total.innerHTML = "$" + totalPrice
                cart[idx].qty = val
                cart[idx].total = (val * price) 
            }
        })
    }

    //fungsi button delete pada setiap baris table cart
    let del = document.querySelectorAll('.del');
    del.forEach(btn => {
        btn.addEventListener('click', () => {
            cart.splice(isFound(btn.id), 1)
            makeCart()
        })
    })
}

btnCart.addEventListener('click', () => {
    makeCart()
})

let btnReset = document.getElementById('btnReset')
btnReset.addEventListener('click', () => {
    cart = []
    alertify.warning(" Cart dikosongkan ");
})

