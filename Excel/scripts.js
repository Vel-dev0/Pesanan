let cart = [];
let total = 0;

function addToCart(item, price) {
    cart.push({ item, price });
    total += price;
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById("cart");
    const totalElement = document.getElementById("total");
    cartList.innerHTML = ""; // Hapus semua item sebelumnya
    cart.forEach((entry) => {
        const li = document.createElement("li");
        li.textContent = `${entry.item} - Rp${entry.price}`;
        cartList.appendChild(li);
    });
    totalElement.textContent = total;
}
function checkout() {
    if (cart.length === 0) {
        alert("Keranjang masih kosong! Tambahkan makanan terlebih dahulu.");
        return;
    }

    let confirmation = confirm("Apakah Anda yakin ingin melanjutkan pesanan?");
    if (confirmation) {
        // Menyimpan pesanan yang sudah dikirim ke localStorage (jika diperlukan)
        let savedOrders = JSON.parse(localStorage.getItem("savedOrders")) || [];
        savedOrders.push({ date: new Date().toLocaleString(), items: [...cart], total });
        localStorage.setItem("savedOrders", JSON.stringify(savedOrders));

        alert("Pesanan berhasil dikirim! Terima kasih.");

        // Mengosongkan keranjang dan total
        cart = [];
        total = 0;

        // Menghapus keranjang yang ada di localStorage
        localStorage.removeItem("cart");

        updateCart();  // Memperbarui tampilan keranjang (akan kosong)
    }
}