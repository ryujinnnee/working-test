<?php

namespace App\Http\Controllers;

use App\Models\Paket;
use App\Models\Santri;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PaketController extends Controller
{
    /**
     * Display a listing of the pakets.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $pakets = Paket::with('santri', 'kategori', 'asrama')->get();
            return response()->json([
                'success' => true,
                'data' => $pakets,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil daftar paket.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created paket in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nama_paket' => 'required|string|max:100',
            'tanggal_diterima' => 'required|date',
            'kategori' => 'required|exists:kategori__pakets,id_kategori',
            'penerima_paket' => 'required|exists:santris,NIS',
            'pengirim_paket' => 'nullable|string|max:100',
            'isi_paket_yang_disita' => 'nullable|string|max:200',
            'status' => 'required|in:diambil,Belum Diambil',
        ]);

        $santri = Santri::where('NIS', $validatedData['penerima_paket'])->first();

        if (!$santri) {
            return response()->json([
                'success' => false,
                'message' => 'Penerima paket tidak ditemukan.',
            ], 404);
        }

        $validatedData['asrama'] = $santri->id_asrama;
        
        try {
            $paket = Paket::create($validatedData);
            return response()->json([
                'success' => true,
                'message' => 'Paket berhasil ditambahkan.',
                'data' => $paket,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan paket.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified paket.
     *
     * @param  string  $id_paket
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(string $id_paket)
    {
        try {
            $paket = Paket::findOrFail($id_paket);
            return response()->json([
                'success' => true,
                'data' => $paket,
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Paket tidak ditemukan.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil detail paket.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified paket in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id_paket
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, string $id_paket)
{
    $rules = [
        'nama_paket' => 'nullable|string|max:100',
        'tanggal_diterima' => 'nullable|date',
        'kategori' => 'nullable|exists:kategori__pakets,id_kategori',
        'penerima_paket' => 'nullable|exists:santris,NIS',
        'pengirim_paket' => 'nullable|string|max:100',
        'isi_paket_yang_disita' => 'nullable|string|max:200',
        'status' => 'nullable|in:diambil,Belum Diambil',
    ];

    $validator = Validator::make($request->all(), $rules);

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'message' => 'Validasi gagal.',
            'errors' => $validator->errors(),
        ], 422);
    }

    try {
        $paket = Paket::findOrFail($id_paket);
        $dataToUpdate = $validator->validated();

        // Ambil id_asrama dari santri jika penerima_paket ada dan valid
        if (isset($dataToUpdate['penerima_paket'])) {
            $santri = Santri::where('NIS', $dataToUpdate['penerima_paket'])->first();
            if ($santri) {
                $dataToUpdate['asrama'] = $santri->id_asrama;
            } else {
                \Log::warning("Santri dengan NIS {$dataToUpdate['penerima_paket']} tidak ditemukan saat update paket {$id_paket}.");
                // Anda mungkin ingin menangani kasus ini secara berbeda,
                // tergantung logika aplikasi Anda.
            }
        }

        \Log::info("Data paket yang akan diupdate untuk ID {$id_paket}: " . json_encode($dataToUpdate));

        $paket->update($dataToUpdate);
        return response()->json([
            'success' => true,
            'message' => 'Paket berhasil diperbarui.',
            'data' => $paket,
        ], 200);
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return response()->json([
            'success' => false,
            'message' => 'Paket tidak ditemukan.',
        ], 404);
    } catch (\Exception $e) {
        \Log::error("Error saat memperbarui paket ID {$id_paket}: " . $e->getMessage());
        return response()->json([
            'success' => false,
            'message' => 'Gagal memperbarui paket.',
            'error' => $e->getMessage(),
        ], 500);
    }
}

    /**
     * Soft delete the specified paket from storage.
     *
     * @param  string  $id_paket
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(string $id_paket)
    {
        try {
            $paket = Paket::findOrFail($id_paket);
            $paket->delete();

            return response()->json([
                'success' => true,
                'message' => 'Paket berhasil dihapus (soft delete).',
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Paket tidak ditemukan.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal melakukan soft delete paket.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display a listing of the soft deleted pakets.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function trashed()
    {
        try {
            $pakets = Paket::onlyTrashed()->get();
            return response()->json([
                'success' => true,
                'data' => $pakets,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil daftar paket yang dihapus.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Restore the specified soft deleted paket.
     *
     * @param  string  $id_paket
     * @return \Illuminate\Http\JsonResponse
     */
    public function restore(string $id_paket)
    {
        try {
            $paket = Paket::withTrashed()->findOrFail($id_paket);
            $paket->restore();

            return response()->json([
                'success' => true,
                'message' => 'Paket berhasil dipulihkan.',
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Paket tidak ditemukan.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memulihkan paket.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Permanently delete the specified paket from storage.
     *
     * @param  string  $id_paket
     * @return \Illuminate\Http\JsonResponse
     */
    public function forceDestroy(string $id_paket)
    {
        try {
            $paket = Paket::withTrashed()->findOrFail($id_paket);
            $paket->forceDelete();

            return response()->json([
                'success' => true,
                'message' => 'Paket berhasil dihapus permanen.',
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Paket tidak ditemukan.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus permanen paket.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}