<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RoleController extends Controller
{
    public function index()
    {
        try {
            $types = Role::all();
            return response()->json(['Role' => $types], 200);
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
                'nama_role' => 'required|string|max:100',
            ]); 
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $validatedData = $validator->validated();
            $type = Role::create($validatedData);
            
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
            $type = Role::findOrFail($id);
            return response()->json([
                'success' => true,
                'data' => $type
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve user role.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    public function update(Request $request, string $id)
    {
        try {
            $type = Role::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'nama_role' => 'sometimes|required|string',
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
            $type = Role::findOrFail($id);
            $type->delete();

            return response()->json([
                'success' => true,
                'message' => 'User type soft deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to soft delete user role.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function trashed()
    {
        try {
            $trashedTypes = Role::onlyTrashed()->get();
            
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
            $type = Role::onlyTrashed()->findOrFail($id);
            $type->restore();

            return response()->json([
                'success' => true,
                'message' => 'User Role restored successfully.',
                'data' => $type
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to restore user Role.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function forceDestroy(string $id)
    {
        try {
            $type = Role::onlyTrashed()->findOrFail($id);
            $type->forceDelete();

            return response()->json([
                'success' => true,
                'message' => 'User Role permanently deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to permanently delete user Role.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
