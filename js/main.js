$(document).ready(() => {
  const container = $(".scrollaa");
  const buttonleft = $("#scroll-left");
  const buttonright = $("#scroll-right");
  const scrollcard = $(".scrollcard");
  const btnlaptop = $("#btnlaptop");
  const btnheadset = $("#btnheadset");
  const btnear = $("#btnear");
  const btnall = $("#btnall");

  let selectedItemId = [];
  let totalvalue;
  let Delivery = 0;
  let discount = 0;
  let couponInput = $(".coupon");

  $(".btncontinue").click(() => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: false,
    }).then((willDelete) => {
      if (willDelete) {
        if (totalvalue > 0) {
          swal({
            title: "Purchase!",
            text: "Purchase Successfully!",
            icon: "success",
            button: "Done",
          });
          $(".scrollcardview1").empty();
          for (let i = 0; i < items.length; i++) {
            items[i].count = 0;
          }
          total();
          couponInput.val("");
          $(".couponstatsuc").hide();
          $(".unsuc").hide();
          $(".scrollcardview1").removeClass("scroll");
        } else {
          swal({
            title: "Purchase!",
            text: "Purchase Unsuccessfully!",
            icon: "error",
            button: "Back",
          });
        }
      } else {
        swal({
          title: "Purchase!",
          text: "Purchase Unsuccessfully!",
          icon: "error",
          button: "Back",
        });
      }
    });
  });
  $("#navbar-button").click(function () {
    $("#navbar-links").toggle();
  });
  couponInput.on("input", () => {
    const couponValue = couponInput.val();
    if (couponValue.length > 0) {
      if (couponValue === "admin") {
        discount = 5;
        $(".unsuc").hide();
        $(".couponstatsuc").show();
      }
      else if (couponValue === "chanden") {
        discount = 100;
        $(".unsuc").hide();
        $(".couponstatsuc").show();
      }
      else if (couponValue === "sarah") {
        discount = 50;
        $(".unsuc").hide();
        $(".couponstatsuc").show();
      }
      else {
        discount = 0;
        $(".couponstatsuc").hide();
        $(".unsuc").show();
      }
    } else {
      $(".couponstatsuc").hide();
      $(".unsuc").hide();
    }

    total();
  });
  function total() {
    totalvalue = 0;
    for (let i = 0; i < selectedItemId.length; i++) {
      const itemId = selectedItemId[i];
      const item = items.find((item) => item.id === itemId);
      let value = item.price * item.count;
      totalvalue += value;
    }
    adddiscount = (totalvalue * discount) / 100;
    $(".subtotal").text(totalvalue + "$");
    $(".Delivery").text("0$");
    $(".Discount").text(discount + "%");
    $(".totalaa").text(totalvalue + Delivery - adddiscount + "$");
  }
  const items = [
    {
      id: 1,
      title: "Asus",
      image: "img/Surface.jpg",
      price: 1500,
      description: "title-text",
      view: false,
      favorite: false,
      count: 0,
      producttype: "Laptop",
      ram: 8,
      cpu: "Core I5"
    },
    {
      id: 2,
      title: "MacBook AirPro",
      image: "img/Macbook3.jpg",
      price: 1200,
      description: "title-text",
      view: false,
      favorite: false,
      count: 0,
      producttype: "Laptop",
      ram: 16,
      cpu: "Core M1"
    },
    {
      id: 3,
      title: "Asus vision Pro",
      image: "img/vivo.jpg",
      price: 1500,
      description: "title-text",
      view: false,
      favorite: false,
      count: 0,
      producttype: "Laptop",
      ram: 8,
      cpu: "Core I9"
    },
    {
      id: 4,
      title: "Huawei Laptop",
      image: "img/Huawei.jpg",
      price: 1500,
      description: "title-text",
      view: false,
      favorite: false,
      count: 0,
      producttype: "Laptop",
      ram: 32,
      cpu: "Core I2000"
    },
    {
      id: 5,
      title: "Headphone Pro 1",
      image: "img/head1.jpg",
      price: 500,
      description: "title-text",
      view: false,
      favorite: false,
      count: 0,
      producttype: "Headphone",
    },
    {
      id: 6,
      title: "Headphone",
      image: "img/head2.png",
      price: 300,
      description: "title-text",
      view: false,
      favorite: false,
      count: 0,
      producttype: "Headphone",
    },
    {
      id: 7,
      title: "Headphone ver 1",
      image: "img/head3.jpg",
      price: 700,
      description: "title-text",
      view: false,
      favorite: false,
      count: 0,
      producttype: "Headphone",
    },
    {
      id: 8,
      title: "Earphone pro v2",
      image: "img/ear2.png",
      price: 10,
      description: "title-text",
      view: false,
      favorite: false,
      count: 0,
      producttype: "Earphone",
    },
    {
      id: 9,
      title: "Earphone pro v1",
      image: "img/ear1.png",
      price: 20,
      description: "title-text",
      view: false,
      favorite: false,
      count: 0,
      producttype: "Earphone",
    },
  ];
  function additem() {
    for (let i = 0; i < items.length; i++) {
      const scrollitem = $("<div>").addClass("scrollitem");
      scrollcard.append(scrollitem);

      const card = $("<div>").addClass("card");
      scrollitem.append(card);

      const cardimage = $("<img>")
        .addClass("card-img-top")
        .attr("src", items[i].image);
      card.append(cardimage);

      const cardimageoverlay = $("<div>").addClass("");
      card.append(cardimageoverlay);

      const cardimageoverlaybtn = $("<button>")
        .addClass("btn btn-black")
        .text("Free Shipping");
      cardimageoverlay.append(cardimageoverlaybtn);
      cardimageoverlaybtn.on("click", function () {
        const index = $(this).parents(".scrollitem").index();
        items[i].view = false;
        items[i].view = true;
        items[i].count = items[i].count + 1;
        const itemId = items[i].id;

        const itemIndex = selectedItemId.indexOf(itemId);
        if (itemIndex !== -1) {
          selectedItemId.splice(itemIndex, 1);
        }
        selectedItemId.push(itemId);
        additemview();
        addtocart();
        total();
      });

      const bottomcard = $("<div>").addClass("bottom-card");
      scrollitem.append(bottomcard);

      const titleprice = $("<div>").addClass("titleprice");
      bottomcard.append(titleprice);

      const row = $("<div>").addClass("row");
      titleprice.append(row);

      const colsm61 = $("<div>").addClass("col-sm-8");
      row.append(colsm61);

      const titletext = $("<h1>").addClass("title-text").text(items[i].title);
      colsm61.append(titletext);

      const colsm62 = $("<div>").addClass("col-sm-4");
      row.append(colsm62);

      const price = $("<h1>")
        .addClass("price")
        .text(items[i].price + "$");
      colsm62.append(price);

      const bttext = $("<p>")
        .addClass("bottom-text")
        .text(items[i].description);
      bottomcard.append(bttext);
      if (items[i].producttype == "Laptop") {
        const hovercard = $("<div>")
          .addClass("hover-card")
          .append(
            $("<div>")
              .addClass("items-detail")
              .append($("<p>").text(`Ram: ${items[i].ram}GB`))
              .append($("<p>").text(`CPU: ${items[i].cpu}`))
          );
        scrollitem.append(hovercard);

        // Bind events to the card-img-top element inside the current card
        cardimage.on("click", () => {
          hovercard.show(300);
          cardimage.css("opacity", "0.5");
        });

        hovercard.on("click", () => {
          hovercard.hide(300);
          cardimage.css("opacity", "1");
        });
      }

    }
  }
  additem();
  function additemwithtype(producttype) {
    for (let i = 0; i < items.length; i++) {
      if (producttype === items[i].producttype) {
        const scrollitem = $("<div>").addClass("scrollitem");
        scrollcard.append(scrollitem);

        const card = $("<div>").addClass("card");
        scrollitem.append(card);

        const cardimage = $("<img>")
          .addClass("card-img-top")
          .attr("src", items[i].image);
        card.append(cardimage);

        const cardimageoverlay = $("<div>").addClass("");
        card.append(cardimageoverlay);

        const cardimageoverlaybtn = $("<button>")
          .addClass("btn btn-black")
          .text("Free Shipping");
        cardimageoverlay.append(cardimageoverlaybtn);
        cardimageoverlaybtn.on("click", function () {
          const index = $(this).parents(".scrollitem").index();
          items[i].view = false;
          items[i].view = true;
          items[i].count = items[i].count + 1;
          const itemId = items[i].id;

          const itemIndex = selectedItemId.indexOf(itemId);
          if (itemIndex !== -1) {
            selectedItemId.splice(itemIndex, 1);
          }
          selectedItemId.push(itemId);
          additemview();
          addtocart();
          total();
        });

        const bottomcard = $("<div>").addClass("bottom-card");
        scrollitem.append(bottomcard);

        const titleprice = $("<div>").addClass("titleprice");
        bottomcard.append(titleprice);

        const row = $("<div>").addClass("row");
        titleprice.append(row);

        const colsm61 = $("<div>").addClass("col-sm-8");
        row.append(colsm61);

        const titletext = $("<h1>").addClass("title-text").text(items[i].title);
        colsm61.append(titletext);

        const colsm62 = $("<div>").addClass("col-sm-4");
        row.append(colsm62);

        const price = $("<h1>")
          .addClass("price")
          .text(items[i].price + "$");
        colsm62.append(price);

        const bttext = $("<p>")
          .addClass("bottom-text")
          .text(items[i].description);
        bottomcard.append(bttext);
        if (items[i].producttype == "Laptop") {
          const hovercard = $("<div>")
            .addClass("hover-card")
            .append(
              $("<div>")
                .addClass("items-detail")
                .append($("<p>").text(`Ram: ${items[i].ram}GB`))
                .append($("<p>").text(`CPU: ${items[i].cpu}`))
            );
          scrollitem.append(hovercard);

          // Bind events to the card-img-top element inside the current card
          cardimage.on("click", () => {
            hovercard.show(300);
            cardimage.css("opacity", "0.5");
          });

          hovercard.on("click", () => {
            hovercard.hide(300);
            cardimage.css("opacity", "1");
          });
        }
      }
    }
  }

  btnlaptop.on("click", () => {
    scrollcard.empty();
    additemwithtype("Laptop");
  });
  btnheadset.on("click", () => {
    scrollcard.empty();
    additemwithtype("Headphone");
  });
  btnear.on("click", () => {
    scrollcard.empty();
    additemwithtype("Earphone");
  });
  btnall.on("click", () => {
    scrollcard.empty();
    additem();
  });

  function addtocart() {
    $(".scrollcardview1").empty();
    if ($(".scrollcardview1").length < 1) {
      $(".scrollcardview1").height(10);
    }
    for (let i = 0; i < selectedItemId.length; i++) {
      const itemId = selectedItemId[i];
      const item = items.find((item) => item.id === itemId);
      if (item.count >= 1) {
        const row = $("<div>").addClass("row");
        $(".scrollcardview1").append(row);
        const col4 = $("<div>").addClass("col-sm-4");
        row.append(col4);
        const image = $("<img>").addClass("cart-img").attr("src", item.image);
        col4.append(image);
        const col8 = $("<div>").addClass("col-sm-8");
        row.append(col8);
        const carttitleprice = $("<div>").addClass("carttitleprice");
        col8.append(carttitleprice);
        const titletext = $("<div>").addClass("title-text").text(item.title);
        carttitleprice.append(titletext);
        const cardtext = $("<div>")
          .addClass("card-text")
          .text(item.description);
        carttitleprice.append(cardtext);
        const row1 = $("<div>").addClass("row");
        carttitleprice.append(row1);
        const cartprice = $("<div>")
          .addClass("col-sm-5 cart-price")
          .text(item.price + "$");
        row1.append(cartprice);
        const col21 = $("<div>").addClass("col-sm-2");
        row1.append(col21);
        const btnminus = $("<button>")
          .addClass("cart-btn-minus")
          .html('<i class="fa fa-minus"></i>');
        col21.append(btnminus);
        btnminus.on("click", () => {
          item.count = item.count - 1;
          cartcount.text(item.count);
          if (item.count < 1) {
            row.remove();
          }
          if (item.count < 0) {
            item.count = 0;
          }
          total();
        });
        const col23 = $("<div>").addClass("col-sm-2");
        row1.append(col23);
        const cartcount = $("<div>").addClass("cart-count").text(item.count);
        col23.append(cartcount);
        col21.append(btnminus);
        const col22 = $("<div>").addClass("col-sm-2");
        row1.append(col22);
        const btnplus = $("<button>")
          .addClass("cart-btn-add")
          .html('<i class="fa fa-plus"></i>');
        col22.append(btnplus);
        btnplus.on("click", () => {
          item.count = item.count + 1;
          cartcount.text(item.count);
          total();
        });
        const hr = $("<hr>").css("margin-left", "4%");
        row.append(hr);
      }
    }
    if ($(".scrollcardview1").find($(".row")).length > 4) {
      $(".scrollcardview1").addClass("scroll");
    } else {
      $(".scrollcardview1").removeClass("scroll");
    }
  }
  function additemview() {
    $(".scrollcardview").empty();
    for (let i = selectedItemId.length - 1; i >= 0; i--) {
      const itemId = selectedItemId[i];
      const item = items.find((item) => item.id === itemId);
      if (item.view) {
        const scrollitem = $("<div>").addClass("scrollitem");
        $(".scrollcardview").append(scrollitem);

        const card = $("<div>").addClass("card");
        scrollitem.append(card);

        const cardimage = $("<img>")
          .addClass("card-img-top")
          .attr("src", item.image);
        card.append(cardimage);

        const cardimageoverlay = $("<div>").addClass("");
        card.append(cardimageoverlay);

        const bottomcard = $("<div>").addClass("bottom-card");
        scrollitem.append(bottomcard);

        const titleprice = $("<div>").addClass("titleprice");
        bottomcard.append(titleprice);

        const row = $("<div>").addClass("row");
        titleprice.append(row);

        const colsm61 = $("<div>").addClass("col-sm-8");
        row.append(colsm61);

        const titletext = $("<h1>").addClass("title-text").text(item.title);
        colsm61.append(titletext);

        const colsm62 = $("<div>").addClass("col-sm-4");
        row.append(colsm62);

        const icon = $("<i>").addClass("far fa-heart");
        colsm62.append(icon);

        icon.on("click", () => {
          if (!item.favorite) {
            item.favorite = true;
            icon.removeClass("far fa-heart");
            icon.addClass("fa-solid fa-heart");
          } else {
            item.favorite = false;
            icon.removeClass("fa-solid fa-heart");
            icon.addClass("far fa-heart");
          }
        });

        const bttext = $("<p>").addClass("bottom-text").text(item.description);
        bottomcard.append(bttext);

        const row1 = $("<div>").addClass("row");
        bottomcard.append(row1);

        const colsm622 = $("<div>").addClass("col-sm-8");
        row1.append(colsm622);

        const price = $("<h1>")
          .addClass("title-text")
          .text(item.price + "$");
        colsm622.append(price);

        const colsm611 = $("<div>").addClass("col-sm-4");
        row1.append(colsm611);

        const btnadd = $("<button>")
          .addClass("btn-add")
          .html('<i class="fa fa-plus"></i>');
        colsm611.append(btnadd);
        btnadd.on("click", () => {
          item.count = item.count + 1;
          addtocart();
          total();
        });
        if (items[i].producttype == "Laptop") {
          const hovercard = $("<div>")
            .addClass("hover-card")
            .append(
              $("<div>")
                .addClass("items-detail")
                .append($("<p>").text(`Ram: ${items[i].ram}GB`))
                .append($("<p>").text(`CPU: ${items[i].cpu}`))
            );
          scrollitem.append(hovercard);

          // Bind events to the card-img-top element inside the current card
          cardimage.on("click", () => {
            hovercard.show(300);
            cardimage.css("opacity", "0.5");
          });

          hovercard.on("click", () => {
            hovercard.hide(300);
            cardimage.css("opacity", "1");
          });
        }
      }

    }
  }

  buttonleft.on("click", () => {
    container.animate({ scrollLeft: "-=300px" }, "fast");
  });

  buttonright.on("click", () => {
    container.animate({ scrollLeft: "+=300px" }, "fast");
  });
  $(".fa-heart").click(function () {
    $(this).toggleClass("background-heart");
  });
  function searchItems() {
    const searchInput = $("#search-input").val().toLowerCase();
    $(".scrollitem").each(function () {
      const title = $(this).find(".title-text").text().toLowerCase();
      if (title.indexOf(searchInput) > -1) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }

  $("#search-input").on("keydown", function () {
    setTimeout(function () {
      searchItems();
    }, 0);
  });
});
