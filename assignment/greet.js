function greet(name){
    const time = new Date();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const fullTime = `${hour}:${minute < 10 ? '0' + minute : minute}`;

    let greeting;
    if(hour < 12){
        greeting ="Good Morning";
    } else if(hour < 18){
        greeting ="Good Afternoon";
    } else {
        greeting ="Good Evening";
    } 

    return `${greeting}, ${name}! It's currently ${fullTime}.`;
}

console.log(greet("Kennedy Kamande"));