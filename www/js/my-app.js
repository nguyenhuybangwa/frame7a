// Initialize app
var isLogin = true;
var myApp = new Framework7({
    preloadPreviousPage: false,
    preroute: function (view,options) {
        // When use router.back() options is set to undefined
        var url = typeof options === 'undefined' ? '#' : options.url;
        
        // Neu chua login thi can redirect den trang login, nhung can phai tranh truong hop dang o trang login
        if(!isLogin && url != 'login.html'){
            console.log('chua login, se redirect den trang login');
            view.router.loadPage('login.html');
            return false;
        }else if(isLogin && url == 'login.html'){
            console.log('da login nhung lai muon vao trang login');
            return false;
        }
    }
});

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main',{
    domCache: true,
    swipeBackPage: false,
});

// myApp.onPageInit('login',function (page) {
//     console.log('onPageInit:::',page);
// })
//We can also add callback for all pages:
myApp.onPageInit('*', function (page) {
  console.log(page.name + ' initialized'); 
  console.log('page:::',page); 
  // alert('test');
});
