<?php

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Auth
Route::post('/auth', 'App\Http\Controllers\UsuarioController@auth');
//Enpoints CRUD modelo Usuario
Route::get('/usuarios', 'App\Http\Controllers\UsuarioController@index');
Route::post('/usuarios', 'App\Http\Controllers\UsuarioController@store');
Route::get('/usuarios/{usuario}', 'App\Http\Controllers\UsuarioController@show');
Route::put('/usuarios/{usuario}', 'App\Http\Controllers\UsuarioController@update');
Route::delete('/usuarios/{usuario}', 'App\Http\Controllers\UsuarioController@destroy');
Route::post('/usuarios/find', 'App\Http\Controllers\UsuarioController@find');

//Endpoints CRUD modelo Role
Route::get('/roles', 'App\Http\Controllers\RoleController@index');
Route::post('/roles', 'App\Http\Controllers\RoleController@store');
Route::get('/roles/{role}', 'App\Http\Controllers\RoleController@show');
Route::put('/roles/{role}', 'App\Http\Controllers\RoleController@edit');
Route::delete('/roles/{role}', 'App\Http\Controllers\RoleController@delete');

//Endpoints Relacionales Usuario -> Roles
Route::post('/usuarios/roles', 'App\Http\Controllers\UsuarioController@attach');
Route::delete('/usuarios/roles', 'App\Http\Controllers\UsuarioController@detach');

Route::post('/roles/usuarios', 'App\Http\Controllers\RoleController@usuarios');