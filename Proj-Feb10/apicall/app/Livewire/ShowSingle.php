<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\User;
use Illuminate\Support\Facades\Http;

class ShowSingle extends Component
{
    public $users;

    public function getUserById($Id)
    {
        $response = Http::get('http://127.0.0.1:8000/api/users/' . $Id);
        
        if ($response->successful()) {
            $this->user = $response->json();
            dd(  $this->user);
            session()->flash('success', 'User got successfully!');
        } else {
            session()->flash('error', 'Failed to update user.');
        }
    }

    public function render()
    {
        return view('livewire.show-single');
    }

   
}
