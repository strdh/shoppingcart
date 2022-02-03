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

let adds = document.querySelectorAll('.add')
for (let i = 0; i<menus.length; i++) {
    adds[i].addEventListener('click', () => {
         idx = (adds[i].id - 1)
         item = {
             'id' : menus[idx].id,
             'qty' : 1,
             'name' : menus[idx].name,
             'price' : menus[idx].price,
             'total' : menus[idx].price * this.qty
         }
         cart.push(item)
    })
}

//tampilkan dalam td