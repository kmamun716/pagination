function displayData(){
    fetch("https://jsonplaceholder.typicode.com/todos")
    .then(res=>res.json())
    .then(datas=>{
        const data=pagination(datas, state.page, state.rows); // this function to make specify data per page you want
        data.quarySet.map(data=>{
            const li = document.createElement("li");
            li.style.backgroundColor="#E5E5E5"
            li.innerHTML=`
                <h1>${data.title}</h1>
            `;
            document.getElementById("display").appendChild(li);
        })
        pageButtons(data.pages);
    })
}
displayData()//for show data

const state={
    "page": 1,
    "rows":10, //how many data want to show in every page
    "window":5 //how many point want to show in pagination
}


//calculate pagination
function pagination(quarySet, page, rows){
    const start = (page - 1) * rows;
    const end = start + rows;

    const data = quarySet.slice(start, end);
    const pages = Math.ceil(quarySet.length/rows);
    return{
        "quarySet": data,
        "pages": pages
    }
}

//show pagination
function pageButtons(pages){
    const wrapper = document.getElementById("pagination");
    wrapper.innerHTML = "";

    let maxLeft = (state.page - Math.floor(state.window/2));
    let maxRight = (state.page + Math.floor(state.window/2));

    if(maxLeft<1){
        maxLeft=1;
        maxRight = state.window;
    }
    if(maxRight>pages){
        maxLeft = pages-(state.window-1)
        maxRight = pages;
        if(maxLeft<1){
            maxLeft=1
        }
    }

    //create pagination button
    for(let i=maxLeft; i<=maxRight; i++){
        wrapper.innerHTML +=`<button value="${i}" class="page btn btn-sm btn-info">${i}</button>`
       
    }
    //make first button
    if(state.page!=1){
        wrapper.innerHTML =`<button value=1 class="page btn btn-sm btn-info">First</button>` + wrapper.innerHTML
    }
    //make last button
    if(state.page!=pages){
        wrapper.innerHTML +=`<button value=${pages} class="page btn btn-sm btn-info">last</button>`
    }
    const allPages = document.getElementsByClassName("page");
    for(let single of allPages){
        single.addEventListener("click",(e)=>{
            document.getElementById("display").textContent="";
            state.page = Number(e.target.value);
            displayData(); // for show data when paginate
        })
    }
}
