<!DOCTYPE html>
<html>
<head>
    <title>Login Pengguna</title>
</head>
<body>
    <h2>Login Pengguna</h2>
    <form method="POST" action="{{ route('postLogin') }}">
        @csrf
        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email"><br>

        <label for="password">Password:</label><br>
        <input type="password" id="password" name="password"><br>

        <button type="submit">Login</button>
    </form>
</body>
</html>
