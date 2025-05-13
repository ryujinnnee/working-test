<!DOCTYPE html>
<html>
<head>
    <title>Registrasi Pengguna</title>
</head>
<body>
    <h2>Registrasi Pengguna</h2>
    <form method="POST" action="{{ route('postRegister') }}">
        @csrf
        <label for="name">Nama:</label><br>
        <input type="text" id="name" name="name"><br>

        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email"><br>

        <label for="password">Password:</label><br>
        <input type="password" id="password" name="password"><br>

        <label for="password_confirmation">Konfirmasi Password:</label><br>
        <input type="password" id="password_confirmation" name="password_confirmation"><br>

        <label for="user_type">Tipe Pengguna:</label><br>
        <select id="user_type" name="user_type">
            <option value="magang">Magang</option>
            <option value="staff">Staff</option>
            
        </select><br>

        <button type="submit">Daftar</button>
    </form>
</body>
</html>
