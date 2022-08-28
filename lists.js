
var itemJsonArray, itemJsonArrayStr, eleindex

let datasetList = document.getElementById('parentlist')

datasetList.addEventListener("click", function(e){
    eleindex = e.target.innerHTML[0]
    console.log(eleindex)
    window.location.href = '/dataset.html'
    localStorage.setItem('index', JSON.stringify(eleindex))
  });

function deleted(itemIndex){
    console.log("Delete", itemIndex);
    itemJsonArrayStr = localStorage.getItem('itemsJson')
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // Delete itemIndex element from the array
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();

}

// if (localStorage.getItem('itemsJson')==null){
//     itemJsonArray = []; 
//     localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
// } 
// else{
    itemJsonArrayStr = localStorage.getItem('itemsJson')
    itemJsonArray = JSON.parse(itemJsonArrayStr); 
// }
// Populate the table
console.log(JSON.parse(itemJsonArrayStr))
let str = "";
itemJsonArray?.forEach((element, index) => {
    str += `
    <li class="list-group-item d-flex justify-content-between" id="dataset-list">
                <h5 class="flex-grow-1">${index+1}   ${element.datasetName}       ${element?.currentTime}</h5>
                <img class="editIcon" src="https://t4.ftcdn.net/jpg/01/97/22/97/240_F_197229786_vWEFpeQEOtIcjvtKVRAyPPP91ANs43uq.jpg" onclick="editChapter(this)" alt="">
                <img class="removeIcon" src="https://cdn-icons-png.flaticon.com/512/2782/2782988.png" alt="" onclick="removeChapter(this)">
    </li>
    `
});

datasetList.innerHTML = str