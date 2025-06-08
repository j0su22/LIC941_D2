angular.module("storeApp", []).controller("StoreController", function ($scope) {
  $scope.products = [
    {
      id: 1,
      name: "Harry Potter 1 – Piedra Filosofal",
      category: "Libros",
      price: 16.95,
      image: "resources/covers/1.jpg",
    },
    {
      id: 2,
      name: "Harry Potter 2 – Cámara Secreta",
      category: "Libros",
      price: 16.95,
      image: "resources/covers/2.jpg",
    },
    {
      id: 3,
      name: "Harry Potter 3 – Prisionero de Azkaban",
      category: "Libros",
      price: 16.95,
      image: "resources/covers/3.jpg",
    },
    {
      id: 4,
      name: "Harry Potter 4 – Cáliz de Fuego",
      category: "Libros",
      price: 18.95,
      image: "resources/covers/4.jpg",
    },
    {
      id: 5,
      name: "Harry Potter 5 – Orden del Fénix",
      category: "Libros",
      price: 22.95,
      image: "resources/covers/5.jpg",
    },
    {
      id: 6,
      name: "Harry Potter 6 – Misterio del Príncipe",
      category: "Libros",
      price: 18.95,
      image: "resources/covers/6.jpg",
    },
    {
      id: 7,
      name: "Harry Potter 7 – Reliquias de la Muerte",
      category: "Libros",
      price: 22.95,
      image: "resources/covers/7.jpg",
    },
  ];

  $scope.cart = [];

  // Guardar el carrito en localStorage
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify($scope.cart));
  }

  // Cargar el carrito desde localStorage
  function loadCart() {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      $scope.cart = JSON.parse(storedCart);
    }
  }

  // Agregar producto al carrito con alerta
  $scope.addToCart = function (product) {
    $scope.cart.push(product);
    saveCart();

    if (window.Swal) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `"${product.name}" agregado al carrito`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      alert(`${product.name} agregado al carrito`);
    }
  };

  // Eliminar producto del carrito
  $scope.removeFromCart = function (index) {
    $scope.cart.splice(index, 1);
    saveCart();
  };

  // Vaciar todo el carrito
  $scope.clearCart = function () {
    $scope.cart = [];
    localStorage.removeItem("cart");
  };

  // Obtener total del carrito
  $scope.getTotal = function () {
    return $scope.cart.reduce(function (total, product) {
      return total + product.price;
    }, 0);
  };

  // Generar ticket en PDF
  $scope.generateTicket = function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 20;
    doc.setFontSize(14);
    doc.text("Ticket de Compra", 20, y);
    y += 10;

    $scope.cart.forEach((item, index) => {
      doc.setFontSize(12);
      doc.text(`${index + 1}. ${item.name} - $${item.price.toFixed(2)}`, 20, y);
      y += 8;
    });

    y += 5;
    doc.setFontSize(14);
    doc.text(`Total: $${$scope.getTotal().toFixed(2)}`, 20, y);

    doc.save("ticket.pdf");
  };

  // Inicializar cargando el carrito guardado
  loadCart();
});
