import {settings, select} from './settings.js';
import Product from './components/Product.js';
import Cart from './components/Cart.js';
import CartProduct from './components/CartProduct.js';
import AmountWidget from './components/AmountWidget.js';


const app = {
  initMenu: function(){
    const thisApp = this;

    for(let productData in thisApp.data.products){
      new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
    }
    // Zastąpione powyższym 
    /*const testProduct = new Product();
      console.log('testProduct:', testProduct);*/
  },
  initData: function(){
    const thisApp = this;
    thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.products;

    fetch(url) //Połącz się z adresem url przy użyciu metody fetch
      .then(function(rawResponse){ 
        return rawResponse.json(); // Jeśli połączenie się zakończy, to wtedy (pierwsze .then) skonwertuj dane do obiektu JS-owego.
      })
      .then(function(parsedResponse){ // Kiedy i ta operacja się zakończy, to wtedy (drugie .then) pokaż w konsoli te skonwertowane dane.
        console.log('parsedResponse',parsedResponse);

        //save parsedResponse as thisApp.data.products
        thisApp.data.products=parsedResponse;
        //execute initMenu method
        thisApp.initMenu();
      });
    console.log('thisApp.data',JSON.stringify(thisApp.data));
  },

  init: function(){
    const thisApp = this;
    console.log('*** App starting ***');
    console.log('thisApp:', thisApp);
    console.log('classNames:', classNames);
    console.log('settings:', settings);
    console.log('templates:', templates);

    thisApp.initData();
    thisApp.initMenu();
  },

  initCart: function(){
    const thisApp = this;

    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);

    thisApp.productList = document.querySelector(select.containerOf.menu);
    thisApp.productList.addEventListener('add-to-cart', function(event){
      app.cart.add(event.detail.product);
    });
  },
};

//app.initMenu();
app.init();
app.initCart();
