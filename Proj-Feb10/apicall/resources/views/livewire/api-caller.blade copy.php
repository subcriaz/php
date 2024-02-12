<div>


    @if (session()->has('flash'))
    <div class="alert alert-success">
        {{ session('flash') }}
    </div>
    @endif
    
    <input wire:model="selectedUserId" type="text"></br>
    <input wire:model="name" type="text"></br>
    <input wire:model="email" type="text"></br>
    <button wire:click="getUserById()">Call getUsersbyid Method</button>
</div>


<div>
    <input wire:model="selectedUserId" type="text"></br>
    <input wire:model="name" type="text"></br>
    <input wire:model="email" type="text"></br>
    <button wire:click="fetchUsers()">Call fetchUsers Method</button>
</div>

<div>
    <input wire:model="selectedUserId" type="text"></br>
    <input wire:model="name" type="text"></br>
    <input wire:model="email" type="text"></br>
    <button wire:click="deleteUser()">Call del Method</button>
</div>

<div>
    <input wire:model="name" type-"text"></br>
    <input wire:model="email" type-"text"></br>
    <input wire:model="password" type-"text"></br>
    <button wire:click="createUser()">Call createUser Method</button>
</div>

<div>
    <input wire:model="selectedUserId" type-"text"></br>
    <input wire:model="name" type-"text"></br>
    <input wire:model="email" type-"text"></br>
    <button wire:click="updateUser()">Call update Method</button>
</div>

<div>
    <input wire:model="selectedUserId" type="text"></br>
    <input wire:model="name" type="text"></br>
    <input wire:model="email" type="text"></br>
    <button wire:click="deleteUser()">Call del Method</button>
</div>
