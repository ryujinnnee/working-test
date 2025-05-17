<?php


use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PaketController;
use Illuminate\Http\Request;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserTypesController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\KategoriPaketController;
use App\Http\Controllers\ProfileUserController;
use App\Http\Controllers\AsramaController;
use App\Http\Controllers\SantriController;
use Illuminate\Support\Facades\Route;
use App\Exports\AssignmentsExport;
use App\Exports\AgendasExport;
use App\Exports\UsersProfileExport;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\AssignmentsImport;
use App\Http\Controllers\DatabaseController;

    
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('regs')->as('regs.')->group(function () {
    Route::controller(UserController::class)->group(function () {
        Route::post('/registerStaff', 'registerStaff');
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
    Route::post('dest/{id_role}', [RoleController::class, 'destroy'])->name('roles.dest');
    Route::get('trashed', [RoleController::class, 'trashed'])->name('roles.trashed');
    Route::patch('{id}/restore', [RoleController::class, 'restore'])->name('roles.restore');
    Route::delete('{id}/force-delete', [RoleController::class, 'forceDestroy'])->name('roles.forceDelete');
});

Route::apiResource('roles', RoleController::class)->middleware('auth:api');

// endpoint for kategori paket
Route::prefix('categories')->middleware('auth:api')->group(function () {
    // Route::post('dest/{id}', [KategoriPaketController::class, 'destroy'])->name('categories.dest');
    Route::get('trashed', [KategoriPaketController::class, 'trashed'])->name('categories.trashed');
    Route::patch('{id}/restore', [KategoriPaketController::class, 'restore'])->name('categories.restore');
    Route::delete('{id}/force-delete', [KategoriPaketController::class, 'forceDestroy'])->name('categories.forceDelete');
});

Route::apiResource('categories', KategoriPaketController::class)->middleware('auth:api');

// endpoint ASRAMA
Route::prefix('dormitories')->middleware('auth:api')->group(function () {
    Route::get('trashed', [AsramaController::class, 'trashed'])->name('dormitories.trashed');
    Route::patch('{id}/restore', [AsramaController::class, 'restore'])->name('dormitories.restore');
    Route::delete('{id}/force-delete', [AsramaController::class, 'forceDestroy'])->name('dormitories.forceDelete');
});

Route::apiResource('dormitories', AsramaController::class)->middleware('auth:api');

// endpoint PAKET
Route::prefix('pakets')->middleware('auth:api')->group(function () {
    Route::get('trashed', [PaketController::class, 'trashed'])->name('pakets.trashed');
    Route::patch('{id}/restore', [PaketController::class, 'restore'])->name('pakets.restore');
    Route::delete('{id}/force-delete', [PaketController::class, 'forceDestroy'])->name('pakets.forceDelete');
});

Route::apiResource('pakets', PaketController::class)->middleware('auth:api');

// endpoint STUDENT
Route::prefix('students')->middleware('auth:api')->group(function () {
    Route::post('deletes/{nis}', [SantriController::class, 'destroy'])->name('students.deletes');
    Route::get('trashed', [SantriController::class, 'trashed'])->name('students.trashed');
    Route::patch('{id}/restore', [SantriController::class, 'restore'])->name('students.restore');
    Route::delete('{id}/force-delete', [SantriController::class, 'forceDestroy'])->name('students.forceDelete');
});

Route::apiResource('students', SantriController::class)->middleware('auth:api');

// endpoint member
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





// endpoint backup DATABASE


Route::get('/analytic', [DashboardController::class, 'index'])->middleware('auth:api');

Route::get('/backup-database', [DatabaseController::class, 'backup']);
Route::post('/restore-database', [DatabaseController::class, 'restore']);

