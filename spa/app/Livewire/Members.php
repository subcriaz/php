<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Member;

class Members extends Component
{


    public $members;
    //public $updateMode = false;

    public function render()
    {
        
        $this->members = Member::first()->get();
       //dd($this->members);

        return view('livewire.members');
    }

}
