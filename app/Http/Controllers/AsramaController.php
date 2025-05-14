<?php

namespace App\Http\Controllers;

use App\Models\Asrama;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AsramaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $asramas = Asrama::all();
            return response()->json(['success' => true, 'asramas' => $asramas], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve asramas.',
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
                'nama_asrama' => 'required|string|max:100|unique:asramas,nama_asrama',
                'gedung' => 'required|string|max:100|unique:asramas,gedung',
            ]);
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $validatedData = $validator->validated();
            $asrama = Asrama::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Asrama created successfully.',
                'data' => $asrama
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Error occurred while creating asrama.',
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
            return response()->json([
                'success' => true,
                'data' => $asrama
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve asrama.',
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
                'nama_asrama' => 'sometimes|required|string',
                'gedung' => 'sometimes|required|string',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $asrama->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Asrama updated successfully.',
                'data' => $asrama
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update asrama.',
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
            $asrama->delete();

            return response()->json([
                'success' => true,
                'message' => 'Asrama soft deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to soft delete asrama.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function trashed()
    {
        try {
            $trashedAsramas = Asrama::onlyTrashed()->get();

            if ($trashedAsramas->isEmpty()) {
                return response()->json([
                    'success' => true,
                    'message' => 'No trashed asramas found.',
                    'data' => []
                ], 200);
            }

            return response()->json([
                'success' => true,
                'message' => 'Trashed asramas retrieved successfully.',
                'data' => $trashedAsramas
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve trashed asramas.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function restore(string $id)
    {
        try {
            $asrama = Asrama::onlyTrashed()->findOrFail($id);
            $asrama->restore();

            return response()->json([
                'success' => true,
                'message' => 'Asrama restored successfully.',
                'data' => $asrama
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to restore asrama.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function forceDestroy(string $id)
    {
        try {
            $asrama = Asrama::onlyTrashed()->findOrFail($id);
            $asrama->forceDelete();

            return response()->json([
                'success' => true,
                'message' => 'Asrama permanently deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to permanently delete asrama.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
