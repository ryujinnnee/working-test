<?php

use App\Http\Controllers\AgendaController;
use App\Http\Controllers\AssignmentController;
use Illuminate\Http\Request;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TagihanMasterController;
use App\Http\Controllers\TagihanPeriodeController;
use App\Http\Controllers\PembayaranController;
use App\Http\Controllers\WargaController;
use App\Http\Controllers\UserTypesController;
use App\Http\Controllers\ProfileUserController;
use Illuminate\Support\Facades\Route;
use App\Exports\AssignmentsExport;
use App\Exports\AgendasExport;
use App\Exports\UsersProfileExport;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\AssignmentsImport;

    
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('regs')->as('regs.')->group(function () {
    Route::controller(UserController::class)->group(function () {
        Route::post('/registerStaff', 'registerStaff');
        Route::post('/registerUser', 'registerUser');
    });
});

Route::prefix('auth')->as('auth.')->group(function () {
    Route::controller(UserController::class)->group(function () {
        Route::post('/loginStaff', 'loginStaff');
        Route::post('/loginUser', 'loginUser');
    });
});

Route::prefix('acc')->as('acc.')->controller(UserController::class)->group(function () {
    Route::get('/me', [UserController::class, 'me'])->middleware('auth:api')->name('me');
    Route::get('/all', [UserController::class, 'getAllUsers'])->middleware('auth:api');
    Route::get('/alls', [UserController::class, 'getAU'])->middleware('auth:api');
    Route::post('/refresh', [UserController::class, 'refresh'])->middleware('auth:api');
    Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:api');

});

Route::prefix('roles')->middleware('auth:api')->group(function () {
    Route::post('dest/{id}', [UserTypesController::class, 'destroy'])->name('roles.dest');
    Route::get('trashed', [UserTypesController::class, 'trashed'])->name('roles.trashed');
    Route::patch('{id}/restore', [UserTypesController::class, 'restore'])->name('roles.restore');
    Route::delete('{id}/force-delete', [UserTypesController::class, 'forceDestroy'])->name('roles.forceDelete');
});

Route::apiResource('roles', UserTypesController::class)->middleware('auth:api');

Route::prefix('members')->middleware('auth:api')->group(function () {
    Route::get('trashed', [UserController::class, 'trashed'])->name('members.trashed');
    Route::patch('{id}/restore', [UserController::class, 'restore'])->name('members.restore');
    Route::delete('{id}/force-delete', [UserController::class, 'forceDestroy'])->name('members.forceDelete');
});

Route::apiResource('members', UserController::class)->middleware('auth:api');


Route::prefix('profile')->middleware('auth:api')->group(function () {
    Route::get('trashed', [ProfileUserController::class, 'trashed'])->name('profile.trashed');
    Route::patch('{id}/restore', [ProfileUserController::class, 'restore'])->name('profile.restore');
    Route::post('profile-users/{profile:uuid}', [ProfileUserController::class, 'update']);
    Route::put('acc/{id}', [ProfileUserController::class, 'AccAdmin'])->middleware('auth:api');
    Route::delete('{id}/force-delete', [ProfileUserController::class, 'forceDestroy'])->name('profile.forceDelete');

    Route::get('/export-profile', function () {
        return Excel::download(new UsersProfileExport, 'profile-user.xlsx');
    });
});

Route::apiResource('profile', ProfileUserController::class)->middleware('auth:api');

// ['auth:api', 'checkAdmin']

Route::prefix('schdl')->middleware('auth:api')->group(function () {
    Route::get('trashed', [AgendaController::class, 'trashed'])->name('schdl.trashed');
    Route::patch('{id}/restore', [AgendaController::class, 'restore'])->name('schdl.restore');
    Route::post('edit/{schdl:uuid}', [AgendaController::class, 'update']);
    Route::delete('{id}/force-delete', [AgendaController::class, 'forceDestroy'])->name('schdl.forceDelete');

    Route::get('/export-agenda', function () {
        return Excel::download(new AgendasExport, 'agenda.xlsx');
    });

});

Route::apiResource('schdl', AgendaController::class)->middleware('auth:api');

Route::prefix('task')->middleware('auth:api')->group(function () {
    Route::get('trashed', [AssignmentController::class, 'trashed'])->name('task.trashed');
    Route::patch('{id}/restore', [AssignmentController::class, 'restore'])->name('task.restore');
    Route::post('edit/{schdl:uuid}', [AssignmentController::class, 'update']);
    Route::delete('{id}/force-delete', [AssignmentController::class, 'forceDestroy'])->name('task.forceDelete');

    Route::get('/export-assignments', function () {
        return Excel::download(new AssignmentsExport, 'assignments.xlsx');
    });

    Route::post('/import-assignments', function (Request $request) {
        Excel::import(new AssignmentsImport, $request->file('file'));
        return response()->json(['message' => 'Import sukses']);
    });

});







// Route::post('agend', [AgendaController::class, 'store'])->middleware('auth:api');
// Route::post('agend-in', [AgendaController::class, 'index'])->middleware('auth:api');






// todo : 1. reset pw,(done)
// todo : 2. pembayaran,
// todo : 3. pemesanan,
// todo : 3. presensi,
// todo : 3. penugasan,
// todo : 3. agenda, (done)
// todo : 3. pemesanan,
