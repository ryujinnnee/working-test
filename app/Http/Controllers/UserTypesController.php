<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserTypes;
use Illuminate\Support\Facades\Validator;

class UserTypesController extends Controller
{

    public function index()
    {
        try {
            $types = UserTypes::all();
            return response()->json(['tipe_user' => $types], 200);
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
                'type' => 'required|string|max:255',
            ]); 
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $validatedData = $validator->validated();
            $type = UserTypes::create($validatedData);
            
            return response()->json([
                'success' => true,
                'message' => 'Data Role berhasil dibuat',
                'data' => $type
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'terjadi kesalahan saat membuat data role',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function show(string $id)
    {
        try {
            $type = UserTypes::findOrFail($id);
            return response()->json([
                'success' => true,
                'data' => $type
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve user type.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function update(Request $request, string $id)
    {
        try {
            $type = UserTypes::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'type' => 'sometimes|required|string',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $type->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'User type updated successfully.',
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

    public function destroy(string $id)
    {
        try {
            $type = UserTypes::findOrFail($id);
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
            $trashedTypes = UserTypes::onlyTrashed()->get();
            
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
            $type = UserTypes::onlyTrashed()->findOrFail($id);
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
            $type = UserTypes::onlyTrashed()->findOrFail($id);
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
}
