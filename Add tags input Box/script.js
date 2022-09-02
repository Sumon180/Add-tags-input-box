

const ul = document.querySelector("ul"),
    input = ul.querySelector("input"),
    countNumb = document.querySelector(".details span");

let maxTags = 10,
tags = [];

countTag(); // firsttime 10 stay save

function countTag(){
    input.focus()
    countNumb.innerText = maxTags - tags.length;    //subtracting max value with tags length
}

function createTag(){
    //removing all li tags before adding so there will be no dublicate tags
    ul.querySelectorAll("li").forEach(li => li.remove());
    
    tags.slice().reverse().forEach(tag =>{
        let liTag = `<li> ${tag} <i class="fa-sharp fa-solid fa-xmark" onclick="remove(this, '${tag}')"></i></li>`;
        ul.insertAdjacentHTML("afterbegin", liTag);  // inserting or adding li inside ul tag  //(afterbegin) is a position property
    });
    countTag();
}

function remove(element, tag){
    let index = tags.indexOf(tag); //getting removing tag index
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)]; //removing or excluding selected tag from an array
    element.parentElement.remove(); //removing li of removed tag
    countTag();
}

function addTag(e){
    if(e.key == "Enter"){
        let tag = e.target.value.replace(/\s+/g, ' '); //removing unwanted spaces from user tag
        if(tag.length > 1 && !tags.includes(tag)){   //if tag length is greater than 1 and the tag isn't exist already
            if(tags.length < 10){   //if tags length is less than 10 then only add tag
                tag.split(',').forEach(tag =>{     //spliting each tag from comma (,)
                    tags.push(tag);     //adding each tag inside array
                    createTag();
                });
            }
       }
       e.target.value = "";
    }
    
}

input.addEventListener("keyup",addTag);

const removeBtn = document.querySelector("button");
removeBtn.addEventListener("click", () =>{
    tags.length = 0; // making array empty
    ul.querySelectorAll("li").forEach(li => li.remove()); //removing all li tags
    countTag();
});

