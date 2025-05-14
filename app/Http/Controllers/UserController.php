<?php

namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function showRegistrationForm()
    {
        return view('register');
    }

    public function getAllUsers()
    {
        try {
            $users = User::select('id', 'name')->get();
            return response()->json(['users' => $users], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve users: ' . $e->getMessage()], 500);
        }
    }

    public function getAU()
    {
        try {

            $currentUser = Auth::user();

            $users = User::all();

            return response()->json(['users' => $users]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve users: ' . $e->getMessage()], 500);
        }
    }


    public function registerStaff(Request $request)
    {
        try {
            $request->validate([
                'nama_user' => 'required|max:100',
                'username' => 'required|unique:users',
                'role' => 'required|exists:roles,id_role',
                'password' => 'required|min:8|confirmed'
            ]);

            $user = User::create([
                'nama_user' => $request->nama_user,
                'username' => $request->username,
                'role' => $request->role,
                'password' => Hash::make($request->password),
                
            ]);

            return response()->json(['message' => 'Staff registered successfully', 'user' => $user], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to register staff: ' . $e->getMessage()], 500);
        }
    }

    

    public function loginStaff(Request $request)
    {
        try {
            $credentials = $request->only('username', 'password');

            if (!$token = Auth::attempt($credentials)) {
                return response()->json(['error' => 'Username atau password salah'], 401);
            }

            return response()->json([
                'success' => true,
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => Auth::factory()->getTTL() * 60,
                'user' => Auth::user()
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Login Failed: ' . $e->getMessage()], 500);
        }
    }



    

    public function update_profile(Request $request, $id)
    {
        try {
            $updateAbout = User::find($id);

            $credentials = $request->validate([
                'name' => 'nullable|max:255',
                'email' => 'nullable|email|unique:users',
                // 'password' => 'nullable|min:8|confirmed',
            ]);

            $updateAbout->update($credentials);
            $response = [
                "status" => "success",
                "name" => $updateAbout->name
            ];

            return response()->json($response);


        } catch (ValidationException $err) {
            $errors = $err->errors();
            $response = [
                'message' => 'Failed',
                'error' => $errors
            ];
            // Alert::toast('Failed to update profile', 'error');

            return back()->withErrors($errors)->withInput();
        }
    }
    
    public function update_proff(Request $request, $id)
    {
        try {
            $updateAbout = User::find($id);

            $credentials = $request->validate([
                'name' => 'nullable|max:255',
                'email' => 'nullable|email|unique:users',
                'status' => 'nullable',
                'user_type_id' => 'nullable',
                // 'password' => 'nullable|min:8|confirmed',
            ]);

            $updateAbout->update($credentials);
            $response = [
                "status" => "success",
                "name" => $updateAbout->name
            ];

            return response()->json($response);


        } catch (ValidationException $err) {
            $errors = $err->errors();
            $response = [
                'message' => 'Failed',
                'error' => $errors
            ];
            // Alert::toast('Failed to update profile', 'error');

            return back()->withErrors($errors)->withInput();
        }
    }

    public function changePassword(Request $request, $id)
    {
        try {
            // Mendapatkan user berdasarkan id
            $user = User::find($id);

            // Validasi input
            $credentials = $request->validate([
                'old_password' => 'required',
                'new_password' => 'required|min:8|confirmed',
            ]);

            // Memeriksa apakah password lama benar
            if (!Hash::check($credentials['old_password'], $user->password)) {
                return response()->json(['message' => 'Password lama tidak benar.'], 400);
            }

            // Mengubah password user
            $user->password = Hash::make($credentials['new_password']);
            $user->save();

            $response = [
                "status" => "success",
                "message" => "Password berhasil diubah."
            ];

            return response()->json($response);

        } catch (ValidationException $err) {
            $errors = $err->errors();
            $response = [
                'message' => 'Failed',
                'error' => $errors
            ];

            return back()->withErrors($errors)->withInput();
        }
    }



    public function showLoginForm()
    {
        return view('login');
    }


    public function me()
    {
        $user = auth()->user();

        if ($user) {
            return response()->json($user);
        } else {
            return response()->json(['error' => 'Anda harus login terlebih dahulu'], 401);
        }
    }



    public function logout()
    {
        auth()->logout();


        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'success' => true
        ]);
    }

    public function destroy(string $id)
    {
        try {
            $type = User::findOrFail($id);
            $type->delete();

            return response()->json([
                'success' => true,
                'message' => 'User type soft deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to soft delete user type.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function trashed()
    {
        try {
            $trashedTypes = User::onlyTrashed()->get();
            
            if ($trashedTypes->isEmpty()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Tidak ada data role yang dihapus.',
                    'data' => []
                ], 200);
            }

            return response()->json([
                'success' => true,
                'message' => 'Data role yang dihapus berhasil diambil.',
                'data' => $trashedTypes
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data role yang dihapus.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function restore(string $id)
    {
        try {
            $type = User::onlyTrashed()->findOrFail($id);
            $type->restore();

            return response()->json([
                'success' => true,
                'message' => 'User type restored successfully.',
                'data' => $type
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to restore user type.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function forceDestroy(string $id)
    {
        try {
            $type = User::onlyTrashed()->findOrFail($id);
            $type->forceDelete();

            return response()->json([
                'success' => true,
                'message' => 'User type permanently deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to permanently delete user type.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function index()
    {
        try {
            $types = UserTypes::all();
            return response()->json([
                'success' => true,
                'data' => $types
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve user types.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request){
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|max:255',
            ]); 
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $validatedData = $validator->validated();
            $validatedData['password'] = Hash::make('UserStaf321');

            $type = User::create($validatedData);
            
            return response()->json([
                'success' => true,
                'message' => 'Akun Baru berhasil dibuat',
                'data' => $type
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'terjadi kesalahan saat membuat data akun',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function show(string $id)
    {
        try {
            $type = User::findOrFail($id);
            return response()->json([
                'success' => true,
                'data' => $type
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve user account',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function update(Request $request, string $id)
    {
        try {
            $type = User::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'type' => 'sometimes|required|string',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $type->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Data akun di perbarui',
                'data' => $type
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update user type.',
                'error' => $e->getMessage()
            ], 500);
        }
    }


}
