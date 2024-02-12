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

 public function deleteUser($Id)
    {
       
        $response = Http::delete('http://127.0.0.1:8000/api/users/' . $Id);

        if ($response->successful()) {
           // $this->fetchUsers();
            //$this->selectedUserId = null;
            session()->flash('success', 'User deleted successfully!');
        } else {
            session()->flash('error', 'Failed to delete user.');
        }
        //dd($Id);
        //return view('livewire.del-user');
    }

 public function getUserById($Id)
    {
        $response = Http::get('http://127.0.0.1:8000/api/users/' . $Id);
        
        if ($response->successful()) {
            $this->user = $response->json();
            //dd(  $this->user);
            session()->flash('success', 'User got successfully!');
        } else {
            session()->flash('error', 'Failed to get user.');
        }
        
        //return view('livewire.show-single');

          return redirect()->to('/showone');

    }


    public function editUserById($Id)
    {
        $response = Http::get('http://127.0.0.1:8000/api/users/' . $Id);
        
        if ($response->successful()) {
            $this->user = $response->json();
            //dd(  $this->user);
            session()->flash('success', 'User got successfully!');
        } else {
            session()->flash('error', 'Failed to update user.');
        }
        
        //return view('livewire.show-single');

          return redirect()->to('/editone');

    }
 
}


