<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <title>Register Form</title>
    @vite('resources/css/app.css')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/theme-change@2.0.2/index.js"></script>
</head>

<body class=" min-h-screen flex justify-center items-center">

    <div class="max-w-md p-8 rounded-lg shadow-md">

        <h2 class="text-2xl font-bold mb-4">Register Form</h2>

        <form method="POST" class="sign-up-form" action="">

            @csrf
            @method('POST')
            <div class="flex flex-col space-y-2">

                <label class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                        class="w-4 h-4 opacity-70">
                        <!-- Icon -->
                    </svg>
                    <input type="text" class="input-field" placeholder="Name" name="name" required />
                </label>

                <label class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                        class="w-4 h-4 opacity-70">
                        <!-- Icon -->
                    </svg>
                    <input type="email" class="input-field" placeholder="Email" name="email" required />
                </label>

                <label class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                        class="w-4 h-4 opacity-70">
                        <!-- Icon -->
                    </svg>
                    <input type="password" class="input-field" placeholder="Password" name="password" required />
                </label>

                <label class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                        class="w-4 h-4 opacity-70">
                        <!-- Icon -->
                    </svg>
                    <input type="password" class="input-field" placeholder="Confirm Password"
                        name="password_confirmation" required />
                </label>

                <label class="flex items-center gap-2">
                    <select name="role" class="input-field">
                        <option value="staff">Staff</option>
                        <option value="magang">Magang</option>
                    </select>
                </label>

            </div>

            <button type="submit"
                class="bg-pink-500 text-white py-2 px-4 rounded-lg font-semibold shadow-md hover:bg-pink-600 transition-colors">
                Register
            </button>

        </form>

    </div>

    <!-- Dropdown untuk mengubah tema -->
    <div class="relative inline-flex ml-4">
        <!-- Icon dropdown -->
        <svg class="w-4 h-4 absolute top-0 right-0 m-4 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232">
            <!-- Path -->
        </svg>

        <!-- Dropdown tema -->
        <select id="theme-selector"
            class="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 hover:border-gray-400 focus:outline-none appearance-none">
            <option value="dark"><i class="fas fa-moon"></i> Dark</option>
            <option value="corporate"><i class="fas fa-briefcase"></i> Corporate</option>
            <option value="valentine"><i class="fas fa-heart"></i> Valentine</option>
            <option value="pastel"><i class="fas fa-paint-brush"></i> Pastel</option>
            <option value="night"><i class="fas fa-paint-brush"></i> Night</option>
        </select>
    </div>

    <script src="{{ asset('js/localthemes.js') }}"></script>
</body>

</html>
