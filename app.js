var database = firebase.database();

var connectionsRef = database.ref("/connections");

$("#add-employee").on("click", function () {
    event.preventDefault();

    let name = $("#name-input").val().trim();
    let role = $("#role-input").val().trim();
    let startDate = $("#start-input").val().trim();
    let payRate = $("#rate-input").val().trim();
    
    
    database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        rate: payRate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

});

database.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().startDate);
    console.log(childSnapshot.val().rate);

    // full list of items to the well*******
    $("#employee-data").append(
        "<tr ><th scope='col' class='employee-name'> " +childSnapshot.val().name +
      " </th><th class='employee-role' scope='col'> " + childSnapshot.val().role +
      " </th><th class='employee-start' scope='col'> " + childSnapshot.val().startDate +
      " </th><th class='employee-rate' scope='col'> " + childSnapshot.val().rate +
      " </th></tr>");

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

//   dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
//     // Change the HTML to reflect
//     $("#name-display").text(snapshot.val().name);
//     $("#email-display").text(snapshot.val().email);
//     $("#age-display").text(snapshot.val().age);
//     $("#comment-display").text(snapshot.val().comment);
//   });