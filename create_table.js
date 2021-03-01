class Deal{
    constructor(dealId, client_name, project_name, project_manager, project_cost){
        this.dealId = dealId;
        this.client_name = client_name;
        this.project_name = project_name;
        this.project_manager = project_manager;
        this.project_cost = project_cost;
    }
}
var currentDealId =0;
var myData = null;
// myData = [new Deal(0,"Microsoft","Apollo Project","Mary",1000),
//         new Deal(1,"Intel","Hermes Project","Bob",10000),
//         new Deal(2,"Apple","Zeus Project","Jane",100000)
//         ]

//         currentDealId = myData.length;
//         localStorage.setItem("myData", JSON.stringify(myData));
function initialize(){
    if (localStorage.getItem("myData") ===null){
        //alert("inside if")
        myData = [new Deal(0,"Microsoft","Apollo Project","Mary",1000),
        new Deal(1,"Intel","Hermes Project","Bob",10000),
        new Deal(2,"Apple","Zeus Project","Jane",100000)
        ]

        currentDealId = myData.length;
        localStorage.setItem("myData", JSON.stringify(myData));
    }else{
        myData = JSON.parse(localStorage.getItem("myData"));
        currentDealId = myData.length;
    }
}

 






// localstorage allows us to persist key value pairs in a way that would survive page refreshes, navigation, and user closing/reopening browser.
// localstorage has limits to the size of each object stored.   

// localStorage.setItem("myData", "test")

// var myDataTest = localStorage.getItem("myData")



function CreateTableFromJSON() {    
    initialize();
    $('tbody').empty()

    var myDataTest = JSON.parse(localStorage.getItem("myData"))

    //var myDataTest = JSON.parse(localStorage.getItem("myData"))

    $.each(myDataTest, function (key, value) {
        $('tbody').append(`<tr>
    <td>${value.dealId}</td>
    <td>${value.client_name}</td>
    <td>${value.project_name}</td>
    <td>${value.project_manager}</td>
    <td>${value.project_cost}</td>
    <td><button onclick="DeleteRow(${value.dealId})"> <img src="trashcan.png" width="50""> </button></td>
  </tr>`);
    })
}

//     // EXTRACT VALUE FOR HTML HEADER. 
//     // ('Deal ID', 'Deal Name', 'Category' and 'Price')
//     var col = [];
//     for (var i = 0; i < myData.length; i++) {
//         for (var key in myData[i]) {
//             if (col.indexOf(key) === -1) {
//                 col.push(key);
//             }
//         }
//     }

//     // CREATE DYNAMIC TABLE.
//     var table = document.createElement("table");

//     // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

//     var tr = table.insertRow(-1);                   // TABLE ROW.

//     for (var i = 0; i < col.length; i++) {
//         var th = document.createElement("th");      // TABLE HEADER.
//         th.innerHTML = col[i];
//         tr.appendChild(th);
//     }

//     // ADD JSON DATA TO THE TABLE AS ROWS.
//     for (var i = 0; i < myData.length; i++) {

//         tr = table.insertRow(-1);

//         for (var j = 0; j < col.length; j++) {
//             var tabCell = tr.insertCell(-1);
//             tabCell.innerHTML = myData[i][col[j]];
//         }
//         // Insert Extra Cell for the Delete Icon
//         //TODO: Complete this
//         //var tabCell = tr.insertCell(-1);
//         //tabCell.innerHTML = '<button onclick="DeleteRow(' + myData[i].dealId + ')"> <img src="trashcan.png"> </button>'

//     }

//     // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
//     var divContainer = document.getElementById("showData");
//     divContainer.innerHTML = "";
//     divContainer.appendChild(table);
// }

function AddNewDeal() {
    var clientName = document.getElementById("clientNameInput").value;
    var projectName = document.getElementById("projectNameInput").value;
    var projectManager = document.getElementById("projectManagerInput").value;
    var projectCost = document.getElementById("projectCostInput").value;


    document.getElementById("clientNameInput").value = "";
    document.getElementById("projectNameInput").value = "";
    document.getElementById("projectManagerInput").value = "";
    document.getElementById("projectCostInput").value = "";


    InsertRow(currentDealId, clientName, projectName, projectManager, projectCost);
    

}

function InsertRow(dealId, clientName, projectName, projectManager, projectCost) {
   // myData.push({"dealId": dealId, "client_name" : clientName, "project_name" : projectName, "project_manager" : projectManager, "project_cost" : projectCost})
    var a= new Deal(dealId, clientName, projectName, projectManager, projectCost);
    myData.push(a);
    currentDealId++;
    localStorage.clear();
    localStorage.setItem("myData", JSON.stringify(myData))
   
    CreateTableFromJSON();

}

function DeleteRow(dealId) {
     
    for( var i = 0; i < myData.length; i++){ 
    
        if (parseInt(myData[i].dealId) === parseInt(dealId)) { 
            if(confirm("Confirm deletion" + JSON.stringify(myData[i]))){
                myData.splice(i,1);
                localStorage.removeItem("myData");
                localStorage.setItem("myData", JSON.stringify(myData))
            }else{
                break;
            }
    
         
        }
    
    }
    CreateTableFromJSON();
}

