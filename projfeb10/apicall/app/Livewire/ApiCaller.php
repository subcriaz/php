<?php

namespace App\Livewire;

use Livewire\Component;
use Illuminate\Support\Facades\Http;

class ApiCaller extends Component
{
   public $userData;

    public function mount()
    {
        // Perform GET request to fetch user data from API
        $response = Http::get('http://127.0.0.1:8000/api/users');

        if ($response->successful()) {
            // If the request is successful, store the fetched data
            $this->userData = $response->json();
            //dd($userData);

        } else {
            // Handle failed response
            session()->flash('error', 'Failed to fetch user data.');
        }
    }
        public function render()
        {
        return view('livewire.api-caller');
        }
    
}