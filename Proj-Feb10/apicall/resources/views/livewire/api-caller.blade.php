<div>
    <input wire:model="name" type-"text"></br>
    <input wire:model="email" type-"text"></br>
    <input wire:model="password" type-"text"></br>
    <button wire:click="createUser()">Add</button>

    <ul>
    @foreach($users as $user)
    <li>{{$user->name}}</li>
    @endforeach

    </ul>
</div>
