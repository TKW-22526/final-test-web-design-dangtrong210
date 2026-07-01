function printBCC(num) {
    let result = "";
    let i = 1;
    while (i <= 10) {
        result += `${num} x ${i} = ${num * i} <br>`;
        i++;
    }
    document.getElementById("result").innerHTML = result;
}

function tinhtien() {
    const soluong = document.getElementsByClassName("soluong");
    const dongia = document.getElementsByClassName("dongia");
    const thanhtien = document.getElementsByClassName("thanhtien");
    let i = 0, thanhtoan = 0;
    while (i < soluong.length) {
        thanhtien[i].innerHTML = Number(dongia[i].innerHTML) * Number(soluong[i].innerHTML);
        thanhtoan += Number(thanhtien[i].innerHTML);
        i++;
    }
    document.getElementById("thanhtoan").innerHTML = thanhtoan;
}

const products = [
    {
        name: "Phở Bò Hà Nội",
        price: "45.000đ",
        image: "../assets/images/pho-bo.jpg",
        info: "Nước dùng đậm đà, bánh phở mềm, thịt bò tươi ngon",
        link: "../html/pho-bo.html"
    },
    {
        name: "Bún Chả Hà Nội",
        price: "50.000đ",
        image: "../assets/images/bun-cha.jfif",
        info: "Chả nướng thơm lừng, ăn kèm bún và rau sống",
        link: "../html/pho-bo.html"
    },
    {
        name: "Cơm Tấm Sườn",
        price: "55.000đ",
        image: "../assets/images/com-tam.jpg",
        info: "Sườn nướng đậm vị, trứng ốp la và bì heo",
        link: "../html/pho-bo.html"
    },
    {
        name: "Bánh Mì Thịt Nướng",
        price: "25.000đ",
        image: "../assets/images/banh-mi.jpg",
        info: "Bánh mì giòn rụm, nhân thịt nướng và rau củ",
        link: "#"
    },
    {
        name: "Bún Bò Huế",
        price: "50.000đ",
        image: "../assets/images/bun-bo-hue.jpg",
        info: "Hương vị cay nồng đặc trưng, thịt bò mềm",
        link: "#"
    },
    {
        name: "Mì Quảng",
        price: "45.000đ",
        image: "../assets/images/mi-quang.jpg",
        info: "Sợi mì vàng, nước dùng đậm đà, topping đa dạng",
        link: "#"
    },
    {
        name: "Gỏi Cuốn Tôm Thịt",
        price: "30.000đ",
        image: "../assets/images/goi-cuon.jpg",
        info: "Cuốn tươi với tôm, thịt và rau sống",
        link: "#"
    },
    {
        name: "Chả Cá Lã Vọng",
        price: "80.000đ",
        image: "../assets/images/cha-ca.jpg",
        info: "Cá tẩm ướp nghệ, ăn cùng bún và thì là",
        link: "#"
    },
    {
        name: "Hủ Tiếu Nam Vang",
        price: "50.000đ",
        image: "../assets/images/hu-tieu.jpg",
        info: "Nước dùng ngọt thanh, topping phong phú",
        link: "#"
    },
    {
        name: "Bánh Xèo Miền Tây",
        price: "40.000đ",
        image: "../assets/images/banh-xeo.jpg",
        info: "Vỏ bánh giòn, nhân tôm thịt, ăn kèm rau sống",
        link: "#"
    }
];

function createItem(obj) {
    const productList = document.getElementById("product-list");
    productList.innerHTML += `
        <div class="card product-item">
        <div class ="ratio ratio-1x1 product-img" >
            <img class="image" src="${obj.image}" alt="${obj.name}" style="object-fit:cover;" >
        </div>
        <div class ="card-body product-info">
            <h4 class="name">${obj.name}</h4>
            <h5 class="price">${obj.price}</h5>
            <p class="description">${obj.info}</p>
            <a class="link"  href="${obj.link}">Xem chi tiet san pham</a>
        </div>
    </div>
    `;
}

function AllItem(objArray) {
    let i = 0;
    while (i < objArray.length) {
        createItem(objArray[i]);
        i++;
    }
}

function timkiem() {
  const tukhoa = document.getElementById("tukhoa").value.trim().toLowerCase();
  document.getElementById("product-list").innerHTML = "";
  const ketquatimduoc = [];
  let i = 0;
  while (i < products.length) {
    if (products[i].name.toLowerCase().includes(tukhoa)){
      ketquatimduoc.push(products[i]);
    }
    i++;
  }

  let j = 0;
  while(j<ketquatimduoc.length){
    createItem(ketquatimduoc[j]);
    j++;
  }
}


/* 
<div class ="row row-cols-1 row-cols-md-4 g-4 product-list">
    <div class="card product-item">
        <div class ="ratio ratio-1x1 product-img" >
            <img class="image" src="../assets/images/banhmi.jfif" alt="Banh mi" style="object-fit:cover;" >
        </div>
        <div class ="card-body product-info">
            <h4 class="name">Banh mi</h4>
            <h5 class="price">Gia: 15000</h5>
            <p class="description">Gom: thit, rau, ...</p>
            <a class="link"  href="#">Xem chi tiet san pham</a>
        </div>
    </div>
</div>
*/