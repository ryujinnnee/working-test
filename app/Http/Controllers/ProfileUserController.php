<?php

namespace App\Http\Controllers;

use App\Models\ProfileUser;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Exception;

class ProfileUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $profileUsers = ProfileUser::all();
            return response()->json(['propil' => $profileUsers], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to retrieve profile users', 'error' => $e->getMessage()], 500);
        }
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            Auth::check();

            $userId = Auth::id();
    
            if (!$userId) {
                return response()->json(['message' => 'Unauthenticated'], 401);
            }

            if (ProfileUser::where('user_id', $userId)->exists()) {
                return response()->json(['message' => 'User already has a profile'], 409);
            }

            $validator = Validator::make($request->all(), [
                'full_name' => 'required|string|max:255',
                'address' => 'nullable|string',
                'birth_date' => 'nullable|date',
                'gender' => 'nullable|in:male,female',
                'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'doc' => 'nullable|mimes:pdf|min:100|max:500',
               
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $data = $request->all();
            $data['user_id'] = $userId;
            $data['uuid'] = Str::uuid();

            // Check if the user already has a profile
            if (ProfileUser::where('user_id', $data['user_id'])->exists()) {
                return response()->json(['message' => 'User already has a profile'], 409);
            }

            // Handle avatar upload
            if ($request->hasFile('avatar')) {
                $avatarPath = $request->file('avatar')->store('avatars', 'public');
                $data['avatar'] = $avatarPath;
            }

            // Handle doc_ktp upload
            if ($request->hasFile('doc')) {
                $ktpPath = $request->file('doc')->store('ktp', 'public');
                $data['doc'] = $ktpPath;
            }
            $profileUser = ProfileUser::create($data);

            return response()->json($profileUser, 201);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to create profile user', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ProfileUser $profileUser)
    {
        try {
            return response()->json($profileUser);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Profile user not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to retrieve profile user', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function AccAdmin(Request $request, string $id)
    {
        try {
            $profileUser = ProfileUser::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'is_valid' => 'required|boolean',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $profileUser->is_valid = $request->input('is_valid');
            $profileUser->save();

            return response()->json($profileUser, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Profile user not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to update profile user', 'error' => $e->getMessage()], 500);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $uuid)
    {
        try {
            $profileUser = ProfileUser::where('uuid', $uuid)->firstOrFail();
            $validator = Validator::make($request->all(), [
                'full_name' => 'sometimes|string|max:255',
                'address' => 'sometimes|string',
                'phone_number' => 'sometimes|string|max:20',
                'birth_date' => 'sometimes|date',
                'gender' => 'sometimes|in:male,female',
                // 'user_id' => 'required|exists:users,id|unique:profile_users,user_id',
                'avatar' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
                'doc_ktp' => 'sometimes|mimes:pdf|min:100|max:500',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $data = $request->all();

            // Handle avatar upload
            if ($request->hasFile('avatar')) {
                // Delete old avatar if exists
                if ($profileUser->avatar) {
                    Storage::delete('public/' . $profileUser->avatar);
                }

                $avatarPath = $request->file('avatar')->store('avatars', 'public');
                $data['avatar'] = $avatarPath;
            }

            // Handle doc_ktp upload
            if ($request->hasFile('doc')) {
                // Delete old doc_ktp if exists
                if ($profileUser->doc_ktp) {
                    Storage::delete('public/' . $profileUser->doc_ktp);
                }

                $ktpPath = $request->file('doc')->store('ktp', 'public');
                $data['doc'] = $ktpPath;
            }

            $profileUser->update($data);

            return response()->json($profileUser, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Profile user not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to update profile user', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage (Soft Delete).
     */
    public function destroy(ProfileUser $profileUser)
    {
        try {
            $profileUser->delete();
            return response()->json(['message' => 'Profile user deleted'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to delete profile user', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display a listing of the trashed resources.
     */
    public function trashed()
    {
        try {
            $profileUsers = ProfileUser::onlyTrashed()->get();
            return response()->json($profileUsers, 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to retrieve trashed profile users', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Restore the specified resource.
     */
    public function restore($id)
    {
        try {
            $profileUser = ProfileUser::withTrashed()->findOrFail($id);
            $profileUser->restore();
            return response()->json(['message' => 'Profile user restored'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Profile user not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to restore profile user', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Permanently delete the specified resource.
     */
    public function forceDelete($id)
    {
        try {
            $profileUser = ProfileUser::withTrashed()->findOrFail($id);
            $profileUser->forceDelete();
            return response()->json(['message' => 'Profile user permanently deleted'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Profile user not found'], 404);
        } catch (Exception $e) {
            return response()->json(['message' => 'Failed to permanently delete profile user', 'error' => $e->getMessage()], 500);
        }
    }
}
