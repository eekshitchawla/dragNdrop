// export const storage = getStorage();
// import {getDatabase, ref, set} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";

// const db = getDatabase();

// let temp
// const currentloginid = async () => {
//   const response = await fetch('UserLists.json')
//   const data = await response.json()
//   temp = data
// }
// currentloginid()
var fileURL, itemJsonArray = [], itemJsonArrayStr = [], fileType, obj, datasetName, currentTime, fileUrl, file1

currentTime = new Date().toLocaleString();

const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");
let submitButton = document.getElementById("submitBtn")
let inputText = document.getElementById('fileName')

let file; 

button.onclick = ()=>{
  input.click(); 
}

input.addEventListener("change", function(e){
  file = this.files[0];
  dropArea.classList.add("active");
  dragText.textContent = "File uploaded";
});

dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

// --- For firebase ---
// async function insertData (temp) {
//   console.log('Hello', file)
//   set(ref(db, `${1324}`), 
//       temp
//   )    
//   .then(() => alert("data stored"))  
//   .catch((error) => alert(error))
// }

dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); 
  file = e.target.value;
  dropArea.innerHTML = "File uploaded"
});

submitButton.onclick = () => {
  datasetName = inputText.value
  showFile()
}

function onReaderLoad(event){
  obj = JSON.parse(event.target.result);
  getAndUpdate()
}

async function showFile (event) {
  fileType = file.type;
  let validExtensions = ["text/csv", "application/json"]; 
    
      // Papa.parse(file, {
      //   download: true,
      //   header: true,
      //   complete: function(res) {
      //     let temp = res.data
      //     console.log(temp)
      //   }
      // })

      if(validExtensions.includes(fileType)) { 
        let fileReader = new FileReader() 
        // For CSV
        if(fileType === 'text/csv') {
          fileReader.onload = () => {
            fileURL = fileReader.result
            getAndUpdate()
            if(fileType === 'text/csv') {
              file1 = fileURL
            }
          }
          fileReader.readAsDataURL(file);
        }
        // For JSON
        else {
          fileReader.onload = onReaderLoad
          fileReader.readAsText(file)
        }
        inputText.value = " "
        dragText.textContent = "Drag & Drop to Upload File";
      } else {
    alert("This is not valid file type!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}

 export function getAndUpdate() {
   console.log(fileURL, datasetName, obj);
  // For JSON
  if(fileType !== 'text/csv') {
    console.log(obj)
    file1 = obj;
  }
  //For CSV
  else {
    file1 = fileURL
  }

  console.log(file, file1)

  if (localStorage.getItem('itemsJson') == null){
      itemJsonArray = [];
      itemJsonArray.push({fileType, datasetName, file1 , currentTime});
      localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
  }
  else{
      itemJsonArrayStr = localStorage.getItem('itemsJson')
      itemJsonArray = JSON.parse(itemJsonArrayStr);
      itemJsonArray.push({fileType, datasetName, file1, currentTime});
      localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
  }

  inputText.innerHTML = ""
  dragText.textContent = "Drag & Drop to Upload File"
}