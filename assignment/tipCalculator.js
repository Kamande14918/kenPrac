function CalculateTip(billAmount, serviceRating){
    let tipPercentage;
    switch(serviceRating.toLowerCase()){
        case 'excellent':
            tipPercentage = 0.20;
            break;
        case 'good':
            tipPercentage = 0.15;
            break;
            case 'average':
                tipPercentage = 0.10;
                break;
            case 'poor':
                tipPercentage = 0.05;
                break;
            default:
                tipPercentage = 0;
    }
    if(billAmount < 0){
        return 'Bill amount cannot be negative';
    } 
    const tipAmount = billAmount * tipPercentage;
    return tipAmount;
}
console.log(CalculateTip(1000, 'excellent'));