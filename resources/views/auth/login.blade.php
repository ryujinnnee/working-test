<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <title>Login Form</title>
        @vite('resources/css/app.css')
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <script src="https://cdn.jsdelivr.net/npm/theme-change@2.0.2/index.js"></script>
    </head>
    <body>
        <h2>Login Form</h2>

        <form action="" method="POST">
            @csrf
            <div class="utama w-full px-20">
                <label class="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        class="w-4 h-4 opacity-70"
                    >
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
                        />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
                        />
                    </svg>
                    <input type="text" class="grow" placeholder="Email" />
                </label>
                <label class="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        class="w-4 h-4 opacity-70"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    <input type="password" class="grow" value="password" />
                </label>
                <button
                    class="middle none center rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    data-ripple-light="true"
                >
                    Button
                </button>
            </div>
        </form>
        <div class="relative inline-flex">
            <svg
                class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 412 232"
            >
                <path
                    d="M206 171.144L42.678 9.824a10 10 0 00-14.142 0L-1.63 37.642a10 10 0 000 14.144L193.908 232l211.37-211.37a10 10 0 000-14.143l-37.908-37.908a10 10 0 00-14.142 0L206 171.144z"
                    fill="#648299"
                    fill-rule="nonzero"
                />
            </svg>
            <select
                id="theme-selector"
                class="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 hover:border-gray-400 focus:outline-none appearance-none"
            >
                <option value="dark"><i class="fas fa-moon"></i> Dark</option>
                <option value="corporate">
                    <i class="fas fa-briefcase"></i> Corporate
                </option>
                <option value="valentine">
                    <i class="fas fa-heart"></i> Valentine
                </option>
                <option value="pastel">
                    <i class="fas fa-paint-brush"></i> Pastel
                </option>
                <option value="night">
                    <i class="fas fa-paint-brush"></i> Night
                </option>
            </select>
        </div>

        <script src="{{ asset('js/localthemes.js') }}"></script>
    </body>
</html>
