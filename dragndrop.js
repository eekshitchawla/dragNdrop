// export const storage = getStorage();
import {getDatabase, ref, set} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";

const db = getDatabase();

// Import JSON data
let temp
const currentloginid = async () => {
  const response = await fetch('UserLists.json')
  const data = await response.json()
  temp = data
}
currentloginid()

//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");
let file; //this is a global variable and we'll use it inside multiple functions

button.onclick = ()=>{
  input.click(); //if user click on the button then the input also clicked
}

input.addEventListener("change", function(){
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  dropArea.classList.add("active");
  showFile(); //calling function
});


//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

function insertData (temp) {
  console.log(temp)
  set(ref(db, `${1}`), 
    temp
  )    
  .then(() => alert("data stored"))  
  .catch((error) => alert(error))
}

//If user drop File on DropArea
dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = e.target.value;
  showFile(); //calling function
});

async function showFile () {
  let fileType = file.type;
  let validExtensions = ["text/csv", "application/vnd.ms-excel"]; 
    
      // Papa.parse(file, {
      //   download: true,
      //   header: true,
      //   complete: function(res) {
      //     temp = res.data
      //   }
      // })
      

    if(validExtensions.includes(fileType)){ 
      let fileReader = new FileReader() 
      fileReader.onload = ()=>{
        let fileURL = fileReader.result

        let data = temp.map(i => 
          `
          <p>${i.name}</p>
          <p>${i.description}</p>
          `
          )
          dropArea.innerHTML = data
        }

        fileReader.readAsDataURL(file);
        console.log(file);
        
      }else{
    alert("This is not valid file type!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}
