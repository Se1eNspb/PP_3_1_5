$('document').ready(function () {
    viewAllUsers();
});

const url = "/rest/"
const usersTable = document.getElementById("allUsersTable");
const newUserForm = document.getElementById('newUserForm');
const userForm = document.getElementById('userForm');
const head = {"Content-Type": "application/json;charset=utf-8"};

function createTable(data, table) {
    if (data.length > 0) {
        let tempTable = "";

        data.forEach((user) => {
            tempTable += "<tr>";
            tempTable += "<td>" + user.id + "</td>";
            tempTable += "<td>" + user["firstName"] + "</td>";
            tempTable += "<td>" + user["lastName"] + "</td>";
            tempTable += "<td>" + user["age"] + "</td>";
            tempTable += "<td>" + user["email"] + "</td>";
            tempTable += "<td>" + user.roles.map(r=>r.roleName).join(", ").replaceAll("ROLE_", "") + "</td>";
            tempTable += '<td><button name="' + user.id + '" id="editButton" type="button" class="btn btn-info" data-toggle="modal" data-target="#btnModal">Edit</button></td>';
            tempTable += '<td><button name="' + user.id + '" id="deleteButton" type="button" class="btn btn-danger" data-toggle="modal" data-target="#btnModal">Delete</button></td></tr>';
        })
        table.insertAdjacentHTML("beforeend", tempTable);
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
    let response = await fetch(url, {method: "post", headers: head, body: JSON.stringify(newUser)});
    let user = response.json();
    return user;
}

async function updateUser(updatedUser) {
    let response = await fetch(url, {method: "put", headers: head, body: JSON.stringify(updatedUser)});
    let user = response.json();
    return user;
}

async function deleteUser(id) {
    await fetch(url + id, {method: "delete", headers: head});
}

// Fetch requests------------------------------------------------------

// Form New User --------------------------------------------------------------
{
    newUserForm.addEventListener('submit', newUserFormSubmit);

    async function newUserFormSubmit(event) {
        event.preventDefault();
        let data = serializeForm(event);
        let user = await sandNewUser(data);
        $('#users-tab').tab('show');
        createTable([user], usersTable);
        event.target.reset();
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
            editUserFormSubmit(event);
        }
    }

}
//---- Button Events Listeners--------------------------------
//----Edit user-------------------------------------------------------

function editUserModal(event) {
    let user = getUser(event.target.name).valueOf();
    let btnModal = $("#btnModal")
    btnModal.find(".modal-title").text("Edit user");
    btnModal.find("fieldset").removeAttr("disabled");
    btnModal.find("[type='submit']").attr("class", "btn btn-primary");
    btnModal.find("[type='submit']").text("Edit");
    user.then(u => btnModal.find("#idModal").val(u.id));
    user.then(u => btnModal.find("#firstNameModal").val(u.firstName));
    user.then(u => btnModal.find("#lastNameModal").val(u.lastName));
    user.then(u => btnModal.find("#ageModal").val(u.age));
    user.then(u => btnModal.find("#emailModal").val(u.email));
    user.then(u => btnModal.find("#passwordModal").val(u.password));
}

async function editUserFormSubmit(event) {
    let data = serializeForm(event);
    await updateUser(data);
    viewAllUsers();
    $("#btnModal").modal("hide");
}


//----Edit user-------------------------------------------------------
//----Delete-user-----------------------------------------------------

function deleteUserModal(event) {
    let btnModal = $("#btnModal");
    editUserModal(event);
    btnModal.find(".modal-title").text("Delete user");
    btnModal.find("[type='submit']").text("Delete");
    btnModal.find("[type='submit']").attr("class", "btn btn-danger");
    btnModal.find("fieldset").attr("disabled", "true")
}

async function deleteUserFormSubmit(event) {
    await deleteUser(event.target[1].value);
    viewAllUsers();
    $("#btnModal").modal("hide");
}

//----Delete-user----------------------------------------------------
