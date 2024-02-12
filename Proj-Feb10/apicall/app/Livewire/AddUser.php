<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\User;
use Illuminate\Support\Facades\Http;

class AddUser extends Component
{
     public $users;
    public $user;
    public $name;
    public $email;
    public $password;
    public $selectedUserId;
    public $url ;

    public function render()
    {
        return view('livewire.add-user');
    }



    public function createUser()
    {
        $response = Http::post('http://127.0.0.1:8000/api/users', [
            'name' => $this->name,
            'email' => $this->email,
            'password'=> $this->password,
        ]);

        if ($response->successful()) {
            //$users = $this->fetchUsers();
            $this->name = '';
            $this->email = '';
            $this->password = '';
            session()->flash('success', 'User created successfully!');
        } else {
            session()->flash('error', 'Failed to create user.');
        }
    return redirect()->to('/show');

    }
}


