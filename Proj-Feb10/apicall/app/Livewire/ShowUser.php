<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\User;
use Illuminate\Support\Facades\Http;

class ShowUser extends Component
{
    public $users;
    public function render()
    {
      
        $response = Http::get('http://127.0.0.1:8000/api/users');

        if ($response->successful()) {
            
            $this->users = $response->json();
            //dd(  $this->users);
        } else {
            //dd($response->successful());
            session()->flash('error', 'Failed to fetch users.');
        }

        return view('livewire.show-user');


        //return view('livewire.show-user', [
          //  'users' => Product::all(),
        //]);


    }
}


use Illuminate\Contracts\View\View;
 
class ProductList extends Component
{
    public function render(): View
    {
        return view('livewire.product-list', [
            'products' => Product::all(),
        ]);
    }
}