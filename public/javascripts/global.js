// Userlist data array for filling in info box
var userListData = [];


// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

    // Username link click
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

    // Add User button click
    $('#btnAddUser').on('click', addUser);

    // Delete User link click
    $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/users/userlist', function( data ) {

        // Stick our user data array into a userlist variable in the global object
        userListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.TRANSID + '" title="Show Details">' + this.TRANSID + '</a></td>';
            tableContent += '<td>' + this.EMAIL + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });


        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
    });
};

// Show User Info
function showUserInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.TRANSID; }).indexOf(thisUserName);

    // Get our User Object
    var thisUserObject = userListData[arrayPosition];

    //Populate Info Box
    $('#userInfoTRANSID').text(thisUserObject.TRANSID);
    $('#userInfoRCPTID').text(thisUserObject.RCPTID);
    $('#userInfoEMAIL').text(thisUserObject.EMAIL);
    $('#userInfoEVENT').text(thisUserObject.EVENT);
    $('#userInfoTIMESTAMP').text(thisUserObject.TIMESTAMP);
    $('#userInfoRESPONSE').text(thisUserObject.RESPONSE);
    $('#userInfoUrl').text(thisUserObject.url);
    $('#userInfoSUBJECT').text(thisUserObject.SUBJECT);
    $('#userInfoFROMADDRESS').text(thisUserObject.FROMADDRESS);
    $('#userInfoSIZE').text(thisUserObject.SIZE);
    $('#userInfoTAGS').text(thisUserObject.TAGS);
    $('#userInfoBOUNCE_TYPE').text(thisUserObject.BOUNCE_TYPE);

};

// Add User
function addUser(event) {
    

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newUser = {
            'TRANSID': $('#addUser fieldset input#inputUserTRANSID').val(),
            'RCPTID': $('#addUser fieldset input#inputUserRCPTID').val(),
            'EMAIL': $('#addUser fieldset input#inputUserEMAIL').val(),
            'EVENT': $('#addUser fieldset input#inputUserEVENT').val(),
            'TIMESTAMP': $('#addUser fieldset input#inputUserTIMESTAMP').val(),
            'RESPONSE': $('#addUser fieldset input#inputUserRESPONSE').val(),
            'url': $('#addUser fieldset input#inputUserurl').val(),
            'SUBJECT': $('#addUser fieldset input#inputUserSUBJECT').val(),
            'FROMADDRESS': $('#addUser fieldset input#inputUserFROMADDRESS').val(),
            'SIZE': $('#addUser fieldset input#inputUserSIZE').val(),              
            'TAGS': $('#addUser fieldset input#inputUserTAGS').val(),
            'BOUNCE_TYPE': $('#addUser fieldset input#inputUserBOUNCE_TYPE').val()
            
        }


console.log(newUser);

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addUser fieldset input').val('');

                // Update the table
                populateTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};


// Delete User
function deleteUser(event) {
console.log(hello);
    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/users/deleteuser/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};




