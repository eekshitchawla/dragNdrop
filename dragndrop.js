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

//If user drop File on DropArea
dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = event.dataTransfer.files[0];
  showFile(); //calling function
});
const CSVToJSON = csv => {
  const lines = csv.split('\n');
  const keys = lines[0].split(',');
  return lines.slice(1).map(line => {
      return line.split(',').reduce((acc, cur, i) => {
          const toAdd = {};
          toAdd[keys[i]] = cur;
          return { ...acc, ...toAdd };
      }, {});
  });
};

const exampleCSV = `
      date,positives,fatalities
      20210307,28756184,515148
      20210306,28714654,514309
      20210305,28654639,512629
      20210304,28585852,510408
      20210303,28520365,508665
      20210302,28453529,506216
      20210301,28399281,504488`;
      
      function showFile(){
        let fileType = file.type;
        let validExtensions = ["text/csv", "application/vnd.ms-excel"]; 
        
        Papa.parse(file, {
          download: true,
          header: true,
          complete: function(res) {
            var columnName = Object.values(res.data[2])
            // var jsonCSV = csvJSON(res.data)
            // console.log(jsonCSV)
            console.log(CSVToJSON(exampleCSV));
      }
    })

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
