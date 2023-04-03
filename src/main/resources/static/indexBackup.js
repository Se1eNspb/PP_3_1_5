$('document').ready(function () {
    resource = "/rest"
    viewUsers(resource);

    sandNewUser(user); //test
    // updateUser(user2); test
    // deleteUser(4);test





    console.log($("#role").html())
    console.log($("#role").html())
    if($("#role").html().includes("ADMIN")) {

        $("#v-pills-admin-tab").replaceWith('<a class="nav-link active" id="v-pills-admin-tab" data-toggle="pill" href="#v-pills-admin" role="tab" aria-controls="v-pills-admin" aria-selected="true">Admin</a>');

        $("#v-pills-user-tab").replaceWith('<a class="nav-link" id="v-pills-user-tab" data-toggle="pill" href="#v-pills-user" role="tab" aria-controls="v-pills-user" aria-selected="false">User</a>');

        $("#v-pills-admin").attr("class", "tab-pane fade active show");
        $("#v-pills-user").attr("class", "tab-pane fade");
    }
});



async  function viewUsers(resource) {
   await fetch(resource).then(
            res => {
                res.json().then(
                    users => {
                        // console.log(users); TODO
                        if (users.length > 0) {
                            var table = "";

                            users.forEach((user) => {
                                table += "<tr>";
                                table += "<td>" + user.id + "</td>";
                                table += "<td>" + user["firstName"] + "</td>";
                                table += "<td>" + user["lastName"] + "</td>";
                                table += "<td>" + user["age"] + "</td>";
                                table += "<td>" + user["email"] + "</td>";
                                table += "<td>" + user.roles.join(", ").replaceAll("ROLE_","")  + "</td>";
                                table += '<td><button name="'+ user.id +'" id="editButton" type="button" class="btn btn-info">Edit</button></td>';
                                table += '<td><button name="'+ user.id +'" id="deleteButton" type="button" class="btn btn-danger">Delete</button></td></tr>';
                            })
                            document.getElementById("allUsersTable").innerHTML = table;
                            // console.log(table); TODO
                        }
                    }
                )
            }
        );
}
    const head = {"Content-Type": "application/json;charset=utf-8"};

    user = {
         "firstName": "userFirstName"
        , "lastName": "userLastName"
        , "age": 81
        , "email": "user@mail.ru"
        ,"password": "user"
        ,"roles":["ROLE_ADMIN"]
    }

   user2 = {
        "id":1
        ,"firstName": "LooserFirstName"
        , "lastName": "LooserLastName"
        , "age": 101
        , "email": "user@gmail.ru"
        ,"password": "looser"
        ,"roles":["ROLE_ADMIN"]
    }



    async function sandNewUser(newUser) {
        console.log(newUser);
        let user = await fetch("/rest", {method: "post", headers: head, body: JSON.stringify(newUser)})
            .then(res => {
                res.json()
            });
        return user;
    }
    async function updateUser(updatedUser) {
        let user = await fetch("/rest", {method: "put", headers: head, body: JSON.stringify(updatedUser)})
            .then(res => {
                res.json()
            });
        return user;
    }
    async function deleteUser(id) {
      const response =  await fetch("/rest/"+id , {method: "delete", headers: head});
        let text = await response.text();

        alert(text);
    }
// Form New User --------------------------------------------------------------
{
    const userForm = document.getElementById('newUserForm');
    userForm.addEventListener('submit', handleFormSubmit);
    function handleFormSubmit(event) {
        event.preventDefault();
        let data = serializeForm(event);
        let user = sandNewUser(data);
        $("#users-tab").attr("class","nav-link active");
        $("#users-tab").attr("aria-selected","true");
        $("#new-user-tab").attr("class","nav-link");
        $("#new-user-tab").attr("aria-selected","false");
        $("#users").attr("class", "tab-pane fade active show");
        $("#new-user").attr("class", "tab-pane fade");
        viewUsers(resource);
    }
    function serializeForm(event) {
       let form  =  new FormData(event.target);
       let data = Object.fromEntries(form.entries());
       data.roles = form.getAll("roles");
       return data;
    }
}
//--- Form New User-----------------------------------------------------------

//----Delete-user----------------------------------------------------
{


        //
        // console.log(event);
        // console.log(event.target);
        // console.log(event.target.id);
        // console.log(event.target.name);
        //
        // viewUsers(resource);

}
//----Delete-user----------------------------------------------------

//----Button Event Listener--------------------------------
{
    const butt = document.getElementById('allUsersTable');

    butt.addEventListener('click',handelButtonClick);
    function handelButtonClick(event) {
        event.preventDefault();
        // TODO delete under
        console.log(event);
        console.log(event.target);
        console.log(event.target.id);
        console.log(event.target.name);
        if(event.target.id == "deleteButton"){
            deleteUser(event.target.name);
        }else if(event.target.id == "editButton"){
            alert("edit button");
        }else{
            alert("is`nt work")
        }
        viewUsers(resource);
    }
}
//----Button Event Listener--------------------------------
// Test Listener--------------------------------------------
{   const butt = document.getElementById('v-pills-tab');
    butt.addEventListener('click',handelClick);
    function handelClick(event) {
        event.preventDefault();
        console.log(event);
        console.log(event.target);
        console.log(event.target.id);
        console.log(event.target.name);


    }
}

{   const butt = document.getElementById('v-pills-tabContent');
    butt.addEventListener('change',handelClick);
    function handelClick(event) {
        event.preventDefault();
        console.log(event);
        console.log(event.target);
        console.log(event.target.id);
        console.log(event.target.name);


    }
}
// Test listener---------------------------------------------------