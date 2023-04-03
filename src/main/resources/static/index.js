$('document').ready(function () {

    startLikeAdmin();

    sandNewUser(user1); //test
    // createTable([user1,user2],usersTable);
    viewAllUsers();
    // updateUser(user2); test
    // deleteUser(4);test


});
const url = "/rest/"
const usersTable = document.getElementById("allUsersTable");
const newUserForm = document.getElementById('newUserForm');
const userForm = document.getElementById('userForm');
const head = {"Content-Type": "application/json;charset=utf-8"};

// tempered Users
user1 = {
    "firstName": "userFirstName"
    , "lastName": "userLastName"
    , "age": 81
    , "email": "user@mail.ru"
    , "password": "user"
    , "roles": ["ROLE_ADMIN"]
};
user2 = {
    "id": 1
    , "firstName": "LooserFirstName"
    , "lastName": "LooserLastName"
    , "age": 101
    , "email": "user@gmail.ru"
    , "password": "looser"
    , "roles": ["ROLE_ADMIN"]
};
// tempered Users


function startLikeAdmin() {
    console.log($("#role").html())
    if ($("#role").html().includes("ADMIN")) {

        $("#v-pills-admin-tab").replaceWith('<a class="nav-link active" id="v-pills-admin-tab" data-toggle="pill" href="#v-pills-admin" role="tab" aria-controls="v-pills-admin" aria-selected="true">Admin</a>');

        $("#v-pills-user-tab").replaceWith('<a class="nav-link" id="v-pills-user-tab" data-toggle="pill" href="#v-pills-user" role="tab" aria-controls="v-pills-user" aria-selected="false">User</a>');

        $("#v-pills-admin").attr("class", "tab-pane fade active show");
        $("#v-pills-user").attr("class", "tab-pane fade");
    }
}


function createTable(data, table) {
    // console.log(data); TODO
    if (data.length > 0) {
        let tempTable = "";

        data.forEach((user) => {
            tempTable += "<tr>";
            tempTable += "<td>" + user.id + "</td>";
            tempTable += "<td>" + user["firstName"] + "</td>";
            tempTable += "<td>" + user["lastName"] + "</td>";
            tempTable += "<td>" + user["age"] + "</td>";
            tempTable += "<td>" + user["email"] + "</td>";
            tempTable += "<td>" + user.roles.join(", ").replaceAll("ROLE_", "") + "</td>";
            tempTable += '<td><button name="' + user.id + '" id="editButton" type="button" class="btn btn-info" data-toggle="modal" data-target="#btnModal">Edit</button></td>';
            tempTable += '<td><button name="' + user.id + '" id="deleteButton" type="button" class="btn btn-danger" data-toggle="modal" data-target="#btnModal">Delete</button></td></tr>';
        })
        table.insertAdjacentHTML("beforeend", tempTable);
        // console.log(table); TODO
    }
}
// Fetch requests----------------------------------------------------------
    async function viewAllUsers() {
    usersTable.innerHTML = "";

        await fetch(url)
            .then(res => res.json())
            .then(users => createTable(users, usersTable))
    }
    async function getUser(id) {
        let response = await fetch(url + id);
        let user = response.json();
        return user;
    }
    async function sandNewUser(newUser) {
        console.log(newUser);
        let response = await fetch(url, {method: "post", headers: head, body: JSON.stringify(newUser)});
        let user = response.json();
        console.log(user);
        return user;
    }
    async function updateUser(updatedUser) {
        console.log(updatedUser);
        let response = await fetch(url, {method: "put", headers: head, body: JSON.stringify(updatedUser)});
        let user = response.json();
        console.log(user);
        return user;
    }
    async function deleteUser(id) {
        const response = await fetch(url + id, {method: "delete", headers: head});
        let text = await response.text();
        // TODO
        alert(text);
    }
// Fetch requests------------------------------------------------------

// Form New User --------------------------------------------------------------
{
    newUserForm.addEventListener('submit', newUserFormSubmit);
 async   function newUserFormSubmit(event) {
        event.preventDefault();
        let data = serializeForm(event);
        let user = await sandNewUser(data);
        $('#users-tab').tab('show');
        // $("#users-tab").attr("class", "nav-link active");
        // $("#users-tab").attr("aria-selected", "true");
        // $("#new-user-tab").attr("class", "nav-link");
        // $("#new-user-tab").attr("aria-selected", "false");
        // $("#users").attr("class", "tab-pane fade active show");
        // $("#new-user").attr("class", "tab-pane fade");
        createTable([user],usersTable);
        event.target.reset();
        // viewAllUsers(url); //TODO
    }
}
function serializeForm(event) {
    let form = new FormData(event.target);
    let data = Object.fromEntries(form.entries());
    data.roles = form.getAll("roles");
    return data;

}

//--- Form New User-----------------------------------------------------------
//---- Button Events Listeners--------------------------------
{
    usersTable.addEventListener('click', tableButtonClick);
    userForm.addEventListener("submit", modalSubmit);

    function tableButtonClick(event) {
        event.preventDefault();
        // TODO delete under
        console.log(event);
        console.log(event.target);
        console.log(event.target.id);
        console.log(event.target.name);
        if (event.target.id == "deleteButton") {
            deleteUserModal(event);
        } else if (event.target.id == "editButton") {
            editUserModal(event);
        } else {
            viewAllUsers();
        }
    }
    function modalSubmit(event) {
        event.preventDefault()

        if (event.submitter.innerText == "Delete") {
            deleteUserFormSubmit(event);
        } else if (event.submitter.innerText == "Edit") {
            UserFormSubmit(event);
        }
    }

}
//---- Button Events Listeners--------------------------------
//----Edit user-------------------------------------------------------

    function editUserModal(event) {
        let user = getUser(event.target.name).valueOf();
        user.then(u=> console.log(u.id));//TODO
        let btnModal = $("#btnModal")
        btnModal.find(".modal-title").text("Edit user");
        btnModal.find("fieldset").removeAttr("disabled");
        btnModal.find("[type='submit']").attr("class","btn btn-primary");
        console.log(user.valueOf().id);//TODO
        user.then(u=> btnModal.find("#idModal").val(u.id));
        user.then(u=> btnModal.find("#firstNameModal").val(u.firstName));
        user.then(u=> btnModal.find("#lastNameModal").val(u.lastName));
        user.then(u=> btnModal.find("#ageModal").val(u.age));
        user.then(u=> btnModal.find("#emailModal").val(u.email));
        user.then(u=> btnModal.find("#passwordModal").val(u.password));
        btnModal.find("[type='submit']").text("Edit");
    }

    async   function UserFormSubmit(event) {
        console.log(event); //TODO
        let data = serializeForm(event);
        await updateUser(data);
        viewAllUsers();
        $("#btnModal").modal("hide");
    }


//----Edit user-------------------------------------------------------
//----Delete-user----------------------------------------------------

    function deleteUserModal(event) {
        let btnModal = $("#btnModal");
        editUserModal(event);
        btnModal.find(".modal-title").text("Delete user");
        btnModal.find("[type='submit']").text("Delete");
        btnModal.find("[type='submit']").attr("class","btn btn-danger");
        btnModal.find("fieldset").attr("disabled","true")
    }
    async   function deleteUserFormSubmit(event) {
        //TODO delete under
        console.log(event);

        console.log(event.target[1].value);

        await deleteUser(event.target[1].value);// TODO
        viewAllUsers();
        $("#btnModal").modal("hide");
    }

//----Delete-user----------------------------------------------------


// Test Listener--------------------------------------------

{
    const butt = document.getElementById('v-pills-tabContent');
    butt.addEventListener('change', handelClick);

    function handelClick(event) {
        event.preventDefault();
        console.log(event);
        console.log(event.target);
        console.log(event.target.id);
        console.log(event.target.name);
    }
}
// Test listener---------------------------------------------------