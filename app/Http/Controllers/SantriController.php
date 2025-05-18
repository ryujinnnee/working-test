<?php

namespace App\Http\Controllers;

use App\Models\Santri;
use Illuminate\Http\Request;
use Validator;

class SantriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $santris = Santri::all();
            return response()->json(['success' => true, 'data' => $santris], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to fetch data'], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'NIS' => 'required|string|max:100|unique:santris,NIS',
                'nama_santri' => 'required|string|max:100',
                'alamat' => 'required|string|max:100',
                'id_asrama' => 'required|exists:asramas,id_asrama',
                'total_paket_diterima' => 'nullable|integer',
            ]);

            $santri = Santri::create([
                'NIS' => $request->NIS,
                'nama_santri' => $request->nama_santri,
                'alamat' => $request->alamat,
                'id_asrama' => $request->id_asrama,
                'total_paket_diterima' => $request->total_paket_diterima ?? 0,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Santri berhasil ditambahkan',
                'data' => $santri
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan santri',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $type = Santri::findOrFail($id);
            return response()->json([
                'success' => true,
                'data' => $type
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve data santri.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

   
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'NIS' => 'sometimes|required|string|max:100',
                'nama_santri' => 'sometimes|required|string|unique:santris|max:100',
                'alamat' => 'sometimes|required|string|max:100',
                'id_asrama' => 'sometimes|required|integer',
                'total_paket_diterima' => 'sometimes|required|integer',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $validatedData = $validator->validated();
            $santri = Santri::findOrFail($id);
            $santri->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Santri updated successfully.',
                'data' => $santri
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update santri.',
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
            $santri = Santri::findOrFail($id);
            $santri->delete();
            return response()->json(['success' => true, 'message' => 'Data deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to delete data'], 500);
        }
    }

    /**
     * Display a listing of the trashed resource.
     */
    public function trashed()
    {
        try {
            $santris = Santri::onlyTrashed()->get();
            return response()->json(['success' => true, 'data' => $santris], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to fetch trashed data'], 500);
        }
    }

    /**
     * Restore the specified resource from storage.
     */
    public function restore($id)
    {
        try {
            $santri = Santri::withTrashed()->find($id);
            $santri->restore();
            return response()->json(['success' => true, 'data' => $santri], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to restore data'], 500);
        }
    }

    /**
     * Force delete the specified resource from storage.
     */
    public function forceDestroy($id)
    {
        try {
            $santri = Santri::withTrashed()->find($id);
            $santri->forceDelete();
            return response()->json(['success' => true, 'message' => 'Data deleted permanently'], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Failed to force delete data'], 500);
        }
    }
}
