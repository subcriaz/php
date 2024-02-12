<?php

use Illuminate\Support\Facades\Route;
use App\Livewire\ApiCaller;
use App\Livewire\SayHello;
use App\Livewire\ShowUser;

/*
use App\Livewire\HelloWorld;
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
Route::get('/hellowolrd',HelloWorld::class);
|
*/

Route::get('/', ApiCaller::class);
Route::get('/sayhello',SayHello::class);
Route::get('/show',ShowUser::class);


