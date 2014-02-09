App.formatAmount = function(amount) {
    amount = String(amount).replace(/,/g, '');
    var comparsion = ''; 
    while(amount != comparsion){ 
      comparsion = amount; 
      amount  = amount.replace(/^(-?\d+)(\d{3})/, '$1,$2'); 
    };
    return '¥' + amount;
  }