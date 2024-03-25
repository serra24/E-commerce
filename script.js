  $(document).ready(function() {
            const loginLink = $('#loginLink');
            const registerLink = $('#registerLink');
            const logoutLink = $('#logoutLink');
            const profileItem = $('#profileItem');

            // Check user's authentication status
            let isAuthenticated = localStorage.getItem('loggedInUser') !== null;

            // Call toggleAuthLinks initially
            toggleAuthLinks();

            // Toggle visibility of login, register, and logout links based on authentication status
            function toggleAuthLinks() {
                if (isAuthenticated) {
                    loginLink.hide();
                    registerLink.hide();
                    const user = JSON.parse(localStorage.getItem('loggedInUser'));
                    profileItem.find('.dropdown-toggle').text(user.fullname).show();
                    profileItem.show();
                    logoutLink.show();
                } else {
                    loginLink.show();
                    registerLink.show();
                    profileItem.hide();
                    logoutLink.hide();
                }
            }

            // Handle logout
            $('#logoutDropdown').click(function() {
                // Remove the logged-in user from localStorage
                localStorage.removeItem('loggedInUser');
             location.reload();
            });

// Registration form submission logic
$('#registrationForm').submit(function(event) {
    event.preventDefault();

    // Retrieve form data
    const fullname = $('#fullname').val();
    const email = $('#email').val();
    const username = $('#username').val();
    const password = $('#password').val();
    const userType = $('#userType').val();

    // Create user object
    const newUser = {
        fullname: fullname,
        email: email,
        username: username,
        password: password,
        userType: userType
    };

    // Check if user already exists
    if (localStorage.getItem(username)) {
        console.log('Username already exists');
        return;
    }

    // Save user data to localStorage with a unique key based on username
    localStorage.setItem(username, JSON.stringify(newUser));
    console.log('User registered successfully')

    // Redirect user to the login page after registration
    window.location.href = 'login.html';
});


            // Handle login form submission
            $('#loginForm').submit(function(event) {
                event.preventDefault();

                // Retrieve username and password from the form
                const username = $('#username').val();
                const password = $('#password').val();

                // Check if the username and password are valid
                const storedUser = JSON.parse(localStorage.getItem(username));
                if (storedUser && storedUser.password === password) {
                    // Store the logged-in user's username and user type in localStorage
                    localStorage.setItem('loggedInUser', JSON.stringify(storedUser));

                    // Redirect the user to the appropriate page based on user type
                    if (storedUser.userType === 'admin') {
                        window.location.href = 'admin_dashboard.html'; // Redirect admin to admin dashboard
                    } else {
                        window.location.href = 'home.html'; // Redirect others to home page (assuming customer by default)
                    }
                } else {
                    // Show an error message if the credentials are invalid
                    alert('Invalid username or password');
                }
            });

            // Display Add Product Modal
            $('#addProductBtn').click(function() {
                $('#addProductModal').modal('show'); // Show the modal
            });

            // Display Edit Product Modal
            $('#editProductBtn').click(function() {
                $('#editProductModal').show();
            });

            // Display Delete Product Modal
            $('#deleteProductBtn').click(function() {
                $('#deleteProductModal').show();
            });

            // Close Modals
            $('.close').click(function() {
                $('.modal').hide();
            });
        });
