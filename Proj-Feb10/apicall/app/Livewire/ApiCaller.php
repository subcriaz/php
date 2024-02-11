<?php

namespace App\Livewire;

use Livewire\Component;
use Illuminate\Support\Facades\Http;

class ApiCaller extends Component
{
    public $users;
    public $user;
    public $name;
    public $email;
    public $password;
    public $selectedUserId;
    public $url ;
  
 public function updated()
    {
         $this->name =  strtoupper($this->name);
    }
    public function mount()
    {
         $url = 'http://127.0.0.1:8000/api/users';
        //$this->fetchUsers();
         $users = $this->fetchUsers();
    }

    public function fetchUsers()
    {
        $response = Http::get('http://127.0.0.1:8000/api/users');

        if ($response->successful()) {
            
            $this->users = $response->json();
            //dd(  $this->users);
        } else {
            //dd($response->successful());
            session()->flash('error', 'Failed to fetch users.');
        }

    }

    public function createUser()
    {
        $response = Http::post('http://127.0.0.1:8000/api/users', [
            'name' => $this->name,
            'email' => $this->email,
            'password'=> $this->password,
        ]);

        if ($response->successful()) {
            $users = $this->fetchUsers();
            $this->name = '';
            $this->email = '';
            $this->password = '';
            session()->flash('success', 'User created successfully!');
        } else {
            session()->flash('error', 'Failed to create user.');
        }
    //dd( $this->users);

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

    public function deleteUser()
    {
        //dd($this->selectedUserId);
        $response = Http::delete('http://127.0.0.1:8000/api/users/' . $this->selectedUserId);

        if ($response->successful()) {
            $this->fetchUsers();
            $this->selectedUserId = null;
            session()->flash('success', 'User deleted successfully!');
        } else {
            session()->flash('error', 'Failed to delete user.');
        }
    }

 public function getUserById()
    {
        $response = Http::get('http://127.0.0.1:8000/api/users/' . $this->selectedUserId);
        
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
        return view('livewire.api-caller');
    }
}