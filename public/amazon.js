
function callData(callback){
    $('#left').empty()
    $.ajax({
        type: "GET",
        url: "http://localhost:4200/all-items",
        success: function (response) {
            console.log(response)
            arrayOfNames = response.map(item=>(item.product_name))
            console.log(arrayOfNames)
            arrayOfPrice = response.map(item => item.price)
            arrayOfQty = response.map(item => item.quantity)
            for (i = 0; i < arrayOfNames.length; i++){
                let item = $('<div class="item">');
                item.append(`<p >Item: <span class = "${arrayOfNames[i]} oi">${arrayOfNames[i]}</span></p>`)
                item.append(`<p style="color: green;">Price: ${arrayOfPrice[i]}</p>`)
                item.append(`<p id = "quantation" style="color: blue;">Quantity: ${arrayOfQty[i]}</p>`)
                $('#left').append(item);
            }
            if(callback){
                callback(arrayOfQty,arrayOfPrice, arrayOfNames)
            }
        }
    });

}
callData()

$('#left').on('click','.oi',function(){
console.log(this.innerText)
$('#selectedProd').text(this.innerText)
})

function getDate() {
    let date = new Date();
    let dateCat = `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()}`;
    let timeCat = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    let whenArr = [dateCat, timeCat];
    return whenArr;
  }


  function saleFormat(quantity, price, name){
      let item = $('#selectedProd').text();
      let index = name.indexOf(item)
      let actualName = name[index];
      let actualPrice = price[index];
      let actualQuant = quantity[index];
      console.log(actualPrice)
    let amount = $('#amount').val();
    let totalPrice = actualPrice * parseInt(amount)
    let updateStock = actualQuant - amount
    let d_tArray = getDate();
    let date1 = d_tArray[0]
    let time1 = d_tArray[1]
    let obj = {
        name: actualName,
        price : totalPrice,
        date: date1,
        time: time1,
        stock: actualQuant,
        stockPurchased: amount,
        newStock : updateStock

    }
    
    $.post("/purchase", obj ).done(function(data) {
        console.log(data);
      });
}
$('.buy').on('click', function(event){
    if($('#selectedProd').text() === ''){
        console.log('SelectItem')
    }
    else{
        callData(saleFormat);
       
    }
    
    })