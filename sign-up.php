<?php
// Database connection parameters
$host = "localhost"; // Change if using a remote server
$username = "root"; // Default for XAMPP/WAMP
$password = ""; // Leave empty for local development
$database = "cake_ordering_system";

// Create a database connection
$conn = new mysqli($host, $username, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form data is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = $conn->real_escape_string($_POST['fullname']);
    $email = $conn->real_escape_string($_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash password for security
    $phone = $conn->real_escape_string($_POST['phone']);

    // SQL query to insert user data
    $sql = "INSERT INTO users (fullname, email, password, phone) VALUES ('$fullname', '$email', '$password', '$phone')";

    if ($conn->query($sql) === TRUE) {
        echo "Registration successful! <a href='login.html'>Login here</a>";
    } else {
        echo "Error: " . $conn->error;
    }
}

// Close the connection
$conn->close();
?>
