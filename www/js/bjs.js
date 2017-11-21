function pushMsgs() {
	setInterval(pushMsgsLoop,15000);
}

function pushMsgsLoop() {
	var url = "http://dev.mode-life.net/api/push-msgs";
    $.get(url,function(resData){
	    console.log(resData);
    },"json").fail(function() {
        console.log('error');
    });
}

var app = {
    sendSms: function() {
        var number = document.getElementById('numberTxt').value.toString(); /* iOS: ensure number is actually a string */
        var message = document.getElementById('messageTxt').value;
        console.log("number=" + number + ", message= " + message);

        CONFIGURATION
        var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: 'INTENT'  // send SMS with the native android SMS messaging
                //intent: '' // send SMS without open any other app
            }
        };

        var success = function () { alert('Message sent successfully'); };
        var error = function (e) { alert('Message Failed:' + e); };
        // sms.send(number, message, options, success, error);
        console.log(sms);
        if(typeof sms === "undefined"){
        	console.log('sms is undefined');
        }else{
        	console.log('ok');
        }
        console.log('adbdfdfd');
    }
};

function logout() {
	isLogin = false;
	mainView.router.loadPage('index.html');
}

function quayLai() {
	mainView.router.back();
	// console.log(mainView);
}
function loadIndex() {
	mainView.router.loadPage('index.html');
}

function dangNhap() {
	isLogin = true;
	mainView.router.loadPage('index.html');
}
function login() {
	myApp.alert('chung toi se di chuyen ban den trang login');
	mainView.router.load({
		url: 'login.html'
	});
}

function login1() {
	myApp.alert('chung toi se di chuyen ban den trang login');
	
	mainView.router.load({
		url: 'login.html'
	});
}

function kiemTra() {
	var name = $('input[name=name]').val();
	mainView.router.load({
		url: 'about.html',
		query: {name:name}
	});
}

function test() {
	$('#area1').html('nguyen huy bang');
}

function test1(){
    cordova.plugins.barcodeScanner.scan(
          function (result) {
              alert("We got a barcode\n" +
                    "Result: " + result.text + "\n" +
                    "Format: " + result.format + "\n" +
                    "Cancelled: " + result.cancelled);
          },
          function (error) {
              alert("Scanning failed: " + error);
          },
          {
              // preferFrontCamera : true, // iOS and Android
              showFlipCameraButton : true, // iOS and Android
              showTorchButton : true, // iOS and Android
              torchOn: true, // Android, launch with the torch switched on (if available)
              prompt : "Place a barcode inside the scan area", // Android
              resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
              formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
              orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
              disableAnimations : true, // iOS
              disableSuccessBeep: false // iOS
          }
       );

}

function getInfo(code){
	var url = "http://52.192.206.240/barcode1/api/checkcode/" + code;
	// console.log(url);
    $.get(url,function(resData){
    	// console.log(resData);
	    show(resData);

    },"json").fail(function() {
        console.log('error');
    });
}

function show(data) {
	rung(function () {
		if(data === null){
			console.log(data);
			alert('khong phai tem chong hang gia cua cong ty mode-life');
			return;
		}
		// Neu ko phai la page result thi redirect ve result
		// Neu dang la page do thi tien hanh refrest lai
		// mainView.router.loadPage('result.html');
		if(mainView.activePage.name == 'result'){
			mainView.router.load({
			    url: 'result.html',
			    reload:true,
			    pushState:false,
			    query: data,
			})
		}else{
			mainView.router.load({
			    url: 'result.html',
			    query: data
			})
		}

		// mkTbl(data);
	})
}

function previewProd(re){
	/* Set phone,address */
	$("#prevPhone").text(re.u.phone);
	$("#prevAddress").text(re.u.address);
	return;

	var name = $("input[name=name]").val();
	var accType = $('select[name=acc_type] option:selected').text();
	var owner = $('input[name=owner]').val();
	var productionTimeEl = $('input[name=production_time]');
	var expirationTimeEl = $('input[name=expiration_time]');
	var detail = $("textarea[name=detail]").val();

	$("#prevName").text(name);
	$("#prevAccType").text(accType);
	$("#prevOwner").text(owner);
	$("textarea[name=prevDetail]").val(detail);

	/* Set time for NSX,HSD */
	var timeSt = bjs.progressTime(productionTimeEl.datetimepicker('getValue'),expirationTimeEl.datetimepicker('getValue'));
	var prevNSX = productionTimeEl.val();
	var prevHSD = expirationTimeEl.val();
	if(timeSt.remainPer >= -1){
		prevNSX += '(' + timeSt.passed + ')';
		prevHSD += '(' + timeSt.remain + ')';
	}
	$("#prevNSX").text(prevNSX);
	$("#prevHSD").text(prevHSD);

	/* show waring message */
	var warns = [];
	if($('select[name=acc_type]').val() == 'personal'){
		for(var v of langObj.warnAccType){
			warns.push(v);
		}
	}
	if(timeSt.remainPer >= 0 & timeSt.remainPer <= 2){
		warns.push(langObj.nearHSD);
	}else if(timeSt.remainPer == -1){
		warns.push(langObj.overHSD);
	}
	if(warns.length > 0){
		var tmp = langObj.warnMsg;
		tmp += '<ul>';
		for(var i of warns){
			tmp += '<li>' + i + '</li>';
		}
		tmp += '</ul>';
		$('#accTypeWarn').html(tmp);
	}else{
		$('#accTypeWarn').empty();
	}
}

function mkTbl(data){
	// console.log('mkTbl');
	var tbl = `
		<table>
			<tr>
				<td>Name</td>
				<td><%=prodName%></td>
			</tr>
			<tr>
				<td>Detail</td>
				<td><textarea rows=12><%=prodDetail%></textarea></td>
			</tr>
		</table>
	`;
    // var tbl = '<table>';
    // var tr = "<tr><td>Name</td><td><%=prodName%></td></tr>";
    // tr += "<tr><td>Detail</td><td><%=Detail%></td></tr>";

   	var tblHtml = _.template(tbl)({
   		prodName: data.p.name,
   		prodDetail: data.p.detail
   	}); 
    $('#area1').html(tblHtml);
}

function rung(cb,timer){
	var timer = timer === undefined ? 300 : timer;
	navigator.vibrate(500);
	setTimeout(function () {
		cb();
	},timer);
}

function getInfoFromBarcode() {
	// alert('fjdsfsdjf');
	// console.log(mainView.activePage.name);
	// return;
	cordova.plugins.barcodeScanner.scan(
		function (result) {
			getInfo(result.text);
		  // alert("We got a barcode\n" +
		  //       "Result: " + result.text + "\n" +
		  //       "Format: " + result.format + "\n" +
		  //       "Cancelled: " + result.cancelled);
		},
		function (error) {
		  alert("Scanning failed: " + error);
		},
		{
		  // preferFrontCamera : true, // iOS and Android
		  showFlipCameraButton : true, // iOS and Android
		  showTorchButton : true, // iOS and Android
		  torchOn: true, // Android, launch with the torch switched on (if available)
		  prompt : "Place a barcode inside the scan area", // Android
		  resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
		  formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
		  orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
		  disableAnimations : true, // iOS
		  disableSuccessBeep: false // iOS
		}
	);

}

function resetInfo() {
	$('#area1').empty();
	console.log(tblHtml);
}