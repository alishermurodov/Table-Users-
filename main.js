let box = document.querySelector(".tbody")
const api = "http://localhost:3000/users"
let light_btn = document.querySelector(".light_btn")
let dark_btn = document.querySelector(".dark_btn")
let body = document.querySelector("body")
let add_btn = document.querySelector(".add_user_btn")
let dialogAdd = document.querySelector(".dialogAdd")
let closeDAdd = document.querySelector(".closeDAdd")
let form1 = document.querySelector(".form1")
let modalDeletEdit = document.querySelector(".modalDeletEdit")
let exit = document.querySelector(".exit")
let deletemod = document.querySelector(".deletemod")
let editmod = document.querySelector(".editmod")
let dialogEdit = document.querySelector(".dialogEdit")
let form2 = document.querySelector(".form2")
let closeDAEdit = document.querySelector(".closeDAEdit")
let cansel = document.querySelector(".cansel")
let formSearch = document.querySelector(".formSearch")



// light
dark_btn.onclick = () =>{
    body.classList.toggle("light")
    body.classList.add("dark")
}

//dark
light_btn.onclick = () =>{
    body.classList.toggle("dark")
    body.classList.add("light")
}

// open modal 
add_btn.onclick =()=>{
    dialogAdd.showModal()
}

// close modal ADD
closeDAdd.onclick=()=>{
    dialogAdd.close()
}

//close modal edit
exit.onclick=()=>{
    modalDeletEdit.close()
}

cansel.onclick=()=>{
    modalDeletEdit.close()
    // dialogAdd.showModal()
}

closeDAEdit.onclick=()=>{
    dialogEdit.close()
}

// SEARCH 
formSearch.onsubmit = async (event) =>{
    event.preventDefault()
    let word = formSearch["search"].value
    try {
        let {data} = await axios.get(`${api}/?q=${word}`)
        get(data)
    } catch (error) {
        console.log(error);
    }
}


// get 
async function getData() {
    try {
        let use = await axios.get(api)
        let users = use.data 
        get(users)
        console.log(users);
    } catch (error) {
        console.log(error);
    }
}

getData()

// add new user 

form1.onsubmit = (event) =>{
    
    event.preventDefault()

    let st=null
    if(form1["ac"][0].checked){
        st=true
        form1["ac"][1].checked=false
    }
    else {
        st=false
        form1["ac"][0].checked=false
    }
   


    let newUser={
        Img: form1["imgInp"].value,
        fullname: form1["nameInp"].value,
        email: form1["emailInp"].value,
        city: form1["city"].value,
        status: st,
        phone: form1["phoneInp"].value
    }
    addUser(newUser)
    dialogAdd.close()
    console.log("broo")
}

async function addUser(newUser){
    try {
        let {data} = await axios.post( api,newUser)
        console.log(data);
        getData()
    } catch (error) {
        
    }
}

//delete user
async function deleteUser(id){
    console.log(id);
    try {
        let {data}=await axios.delete(`${api}/${id}`)
        getData()
        modalDeletEdit.close()
    } catch (error) {
        console.error(error)
    }
}

let idx = null
// edit user 
 form2.onsubmit=(event)=>{
    event.preventDefault()
    let newuser = {
        Img: form2["imgInp"].value,
        fullname: form2["nameInp"].value,
        email: form2["emailInp"].value,
        city: form2["city"].value,
        phone: form2["phoneInp"].value
    }
    editUser(idx, newuser)
    dialogEdit.close()
 }

 async function editUser(id,NewUser){
    try {
        let {data}= await axios.put(`${api}/${id}`, NewUser)
        getData()
    } catch (error) {
        
    }
 }

//  filter 
let al_city = document.querySelector(".al_city")

al_city.onclick = async () =>{
    let word = al_city.value
    try {
        let {data} = await axios.get(`${api}?q=${word}`)
        get(data)
    } catch (error) {
        console.log(error);
    }
}

function get(users) {
    box.innerHTML = ""
    users.forEach(e => {
        let tr1 = document.createElement("tr")
        tr1.classList.add("tr")

        // td1 
        let td1 = document.createElement("td")
        td1.classList.add("td1")
        let td1div = document.createElement("div")
        let img = document.createElement("img")
        img.src = e.Img
        let ful = document.createElement("h3")
        ful.innerHTML = e.fullname
        let email = document.createElement("p")
        email.innerHTML = e.email

        // td2 
        let td2 = document.createElement("td")
        td2.innerHTML = e.city

        // td3 
        let td3 = document.createElement("td")
        let td3Btn = document.createElement("button")
        td3Btn.innerHTML = e.status==true?"Active":"InActive"
        td3Btn.classList.add("td3Btn")

        // td4
        let td4 = document.createElement("td")
        td4.innerHTML = e.phone

        // td5
        let td5 = document.createElement("td")
        let td5Img = document.createElement("img")
        td5Img.src = e.infoImg
        td5Img.onclick=()=>{
            modalDeletEdit.showModal()

            //delet
            deletemod.onclick=()=>{
                deleteUser(e.id)
            }

            // edit 
            editmod.onclick=()=>{
               
                if(e.status){
            
                    form2["ac"][0].checked=true
                }
                else {
                   
                    form2["ac"][1].checked=true
                }
                
                form2["imgInp"].value = e.Img
                form2["nameInp"].value = e.fullname
                form2["emailInp"].value = e.email
                form2["city"].value = e.city
                form2["phoneInp"].value = e.phone

                dialogEdit.showModal()
                idx = e.id
                
            }
        }
        

        tr1.appendChild(td1)
        td1.appendChild(img)
        td1div.appendChild(ful)
        td1div.appendChild(email)
        td1.appendChild(td1div)
        tr1.appendChild(td2)
        tr1.appendChild(td3)
        td3.appendChild(td3Btn)
        tr1.appendChild(td4)
        td5.appendChild(td5Img)
        tr1.appendChild(td5)
        box.appendChild(tr1)
        
        
    });
}
getData()