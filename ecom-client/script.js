console.log("Hi");
try {  
    fetch("http://localhost:7000/").then((jsonData)=>{
        return jsonData.json()
    }).then((data)=>{
        console.log(data);
        return data;
    }).then((dataToShow)=>{
        const myData = document.createElement('div')
        myData.innerText = dataToShow
        document.body.appendChild(myData)
    }).catch((error)=>{
        console.log(error);
    })
} 
catch (error) {
    console.log(error);
}