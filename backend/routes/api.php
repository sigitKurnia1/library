<?php

use App\Http\Controllers\Api\BookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/create-account', App\Http\Controllers\Api\RegisterController::class)->name('create-account');
Route::post('/login-account', App\Http\Controllers\Api\LoginController::class)->name('login-accoutn');

Route::middleware('auth:api')->group(function () {
    Route::get('/book-list', [BookController::class, 'index'])->name('book-list');
    Route::post('/add-book', [BookController::class, 'store'])->name('add-book');
    Route::get('/delete-book/{id}', [BookController::class, 'delete'])->name('delete-book');
    Route::get('/detail-book/{id}', [BookController::class, 'detail'])->name('detail-book');
    Route::get('/update/{id}', [BookController::class, 'update'])->name('update');
    Route::post('/update-book/{id}', [BookController::class, 'post_update'])->name('update-book');
    Route::get('/search-book', [BookController::class, 'search_book'])->name('search-book');
    Route::post('/account-logout', App\Http\Controllers\Api\LogoutController::class)->name('account-logout');
});