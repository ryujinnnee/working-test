// Mengambil tema dari local storage
var theme = localStorage.getItem("theme");
if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.getElementById("theme-selector").value = theme;
}

document
    .getElementById("theme-selector")
    .addEventListener("change", function () {
        // Mengubah tema saat pengguna memilih opsi baru dari dropdown
        document.documentElement.setAttribute(
            "data-theme",
            this.value
        );

        // Menyimpan tema di local storage
        localStorage.setItem("theme", this.value);
    });