<?php

namespace App\Livewire;

use Livewire\Component;
use Illuminate\Support\Facades\Http;

class ApiCaller extends Component
{
   public $users;
    public $name;
    public $email;
    public $selectedUserId;
    public $url ;
  

    public function mount()
    {
         //$ url = 'http://127.0.0.1:8000/api/users';
        //$this->fetchUsers();
    }

    public function fetchUsers()
    {
        $response = Http::get('http://127.0.0.1:8000/api/users');

        if ($response->successful()) {
              dd($response->successful());
            $this->users = $response->json();
        } else {
            dd($response->successful());
            session()->flash('error', 'Failed to fetch users.');
        }
    }

    public function createUser()
    {
        $response = Http::post('http://127.0.0.1:8000/api/users', [
            'name' => $this->name,
            'email' => $this->email,
        ]);

        if ($response->successful()) {
            $this->fetchUsers();
            $this->name = '';
            $this->email = '';
            session()->flash('success', 'User created successfully!');
        } else {
            session()->flash('error', 'Failed to create user.');
        }
    }

    public function selectUser($userId)
    {
        $this->selectedUserId = $userId;
    }

    public function updateUser()
    {
        $response = Http::put('http://127.0.0.1:8000/api/users/' . $this->selectedUserId, [
            'name' => $this->name,
            'email' => $this->email,
        ]);

        if ($response->successful()) {
            $this->fetchUsers();
            $this->name = '';
            $this->email = '';
            $this->selectedUserId = null;
            session()->flash('success', 'User updated successfully!');
        } else {
            session()->flash('error', 'Failed to update user.');
        }
    }

    public function deleteUser($userId)
    {
        $response = Http::delete('http://127.0.0.1:8000/api/users/' . $userId);

        if ($response->successful()) {
            $this->fetchUsers();
            session()->flash('success', 'User deleted successfully!');
        } else {
            session()->flash('error', 'Failed to delete user.');
        }
    }

    public function render()
    {
        return view('livewire.api-caller');
    }
}