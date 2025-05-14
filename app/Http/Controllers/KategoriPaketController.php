<?php

namespace App\Http\Controllers;

use App\Models\Kategori_Paket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class KategoriPaketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $types = Kategori_Paket::all();
            return response()->json(['success' => true, 'Kategori' => $types], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve kategori.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'nama_kategori' => 'required|string|max:100|unique:kategori__pakets,nama_kategori',
            ]); 
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $validatedData = $validator->validated();
            $type = Kategori_Paket::create($validatedData);
            
            return response()->json([
                'success' => true,
                'message' => 'Data kategori berhasil dibuat',
                'data' => $type
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'terjadi kesalahan saat membuat data kategori',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $type = Kategori_Paket::findOrFail($id);
            return response()->json([
                'success' => true,
                'data' => $type
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve data category.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    
    public function update(Request $request, string $id)
    {
        try {
            $type = Kategori_Paket::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'nama_kategori' => 'sometimes|required|string',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $type->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Category updated successfully.',
                'data' => $type
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update Category.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $type = Kategori_Paket::findOrFail($id);
            $type->delete();

            return response()->json([
                'success' => true,
                'message' => 'Item Category soft deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to soft Category.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function trashed()
    {
        try {
            $trashedTypes = Kategori_Paket::onlyTrashed()->get();
            
            if ($trashedTypes->isEmpty()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Tidak ada data Category yang dihapus.',
                    'data' => []
                ], 200);
            }

            return response()->json([
                'success' => true,
                'message' => 'Data category yang dihapus berhasil diambil.',
                'data' => $trashedTypes
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data category yang dihapus.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function restore(string $id)
    {
        try {
            $type = Kategori_Paket::onlyTrashed()->findOrFail($id);
            $type->restore();

            return response()->json([
                'success' => true,
                'message' => 'Category restored successfully.',
                'data' => $type
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to restore Category.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function forceDestroy(string $id)
    {
        try {
            $type = Kategori_Paket::onlyTrashed()->findOrFail($id);
            $type->forceDelete();

            return response()->json([
                'success' => true,
                'message' => 'Category permanently deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to permanently delete Category.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
