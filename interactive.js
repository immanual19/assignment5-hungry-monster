document.getElementById("search-button").addEventListener("click",()=>{
    const foodName= document.getElementById("input-food").value;
    document.getElementById("input-food").value="";
    document.getElementById("searched-result-section").innerHTML="";
    if(foodName.length==1){
        
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${foodName}`)
        .then(res=>res.json())
        .then(data=>displaySearchedFoods(data.meals))
    }
    else{
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
        .then(res=>res.json())
        .then(data=>displaySearchedFoods(data.meals))

    }
    
})


function displaySearchedFoods(foodList){
    foodList.forEach(food => {
        const searchedResultSection= document.getElementById("searched-result-section");
        const food_Div=document.createElement("div");
        food_Div.className="food-div";
        const divContent=`<img class="thumbnail-img" src='${food.strMealThumb}'>
                          <h3 class="foodTitle">${food.strMeal}</h3>`;
        food_Div.innerHTML=divContent;
        searchedResultSection.appendChild(food_Div);

        
    });
    showClickedFoodIngredients();
}


function showClickedFoodIngredients(){
    const foodList=document.getElementById("searched-result-section");
    foodList.addEventListener("click",function(){
        document.getElementById("searched-result-section").style.display="none";
        document.getElementById("search-box").style.display="none";
        document.getElementById("foodIngredients-section").style.display="block";
        if(event.target.tagName=="IMG"||event.target.tagName=="H3"){
            const clickedFoodDiv= event.target.parentNode;
            const clickedFoodName= clickedFoodDiv.querySelector("h3").innerText;
            
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${clickedFoodName}`)
            .then(res=>res.json())
            .then(data=>{
                data.meals.forEach(element => {
                    if(element.strMeal==clickedFoodName){
                        document.getElementById("selected-food-image").setAttribute("src",element.strMealThumb);
                        document.getElementById("selected-food-header").innerText=clickedFoodName;
                        
                        for (let i=0; i<100; i++) {
                            const list=document.createElement("li");
                            const measurement= element["strMeasure"+i];
                            const ingredients= element["strIngredient"+i];
                            if(ingredients==""){
                                break;
                            }
                            const listContents= `${measurement} ${ingredients}`;
                            list.innerText=listContents;
                            document.getElementById("ingredientsListItem").appendChild(list);
                        }
                    }
                });
            })
        }
    })
}